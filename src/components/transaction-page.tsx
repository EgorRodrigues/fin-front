"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CircleDollarSign,
  CreditCard,
  type LucideIcon,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";

interface Metric {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

interface TransactionItem {
  name: string;
  category: string;
  amount: string;
  date: string;
  status: string;
}

interface SummaryItem {
  label: string;
  value: number;
  color: string;
}

interface TransactionPageProps {
  eyebrow: string;
  title: string;
  buttonLabel: string;
  accent: "cyan" | "rose" | "emerald";
  metrics: Metric[];
  transactions: TransactionItem[];
  summary: SummaryItem[];
}

const accentMap = {
  cyan: {
    button: "border-cyan-400/60 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20",
    glow: "bg-cyan-500/10 text-cyan-300",
    badge: "bg-cyan-500/10 text-cyan-200",
    bar: "from-cyan-400 to-violet-400",
  },
  rose: {
    button: "border-rose-400/60 bg-rose-400/10 text-rose-200 hover:bg-rose-400/20",
    glow: "bg-rose-500/10 text-rose-300",
    badge: "bg-rose-500/10 text-rose-200",
    bar: "from-rose-400 to-orange-400",
  },
  emerald: {
    button: "border-emerald-400/60 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/20",
    glow: "bg-emerald-500/10 text-emerald-300",
    badge: "bg-emerald-500/10 text-emerald-200",
    bar: "from-emerald-400 to-cyan-400",
  },
} as const;

const initialForm = {
  name: "",
  category: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  account: "",
};

export function TransactionPage({
  eyebrow,
  title,
  buttonLabel,
  accent,
  metrics,
  transactions,
  summary,
}: TransactionPageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const currentAccent = accentMap[accent];

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Nova transação cadastrada:", formData);
    setFormData(initialForm);
    setIsOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${accent === "cyan" ? "text-cyan-300" : accent === "rose" ? "text-rose-300" : "text-emerald-300"}`}>
              {eyebrow}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white">{title}</h1>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition ${currentAccent.button}`}
          >
            {buttonLabel}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {metrics.map(({ label, value, change, icon: Icon }) => (
            <article key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{label}</span>
                <div className={`rounded-xl p-2 ${currentAccent.glow}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-6 text-3xl font-semibold text-white">{value}</p>
              <p className="mt-2 text-sm text-emerald-300">{change}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Movimentações</p>
                <h2 className="text-xl font-semibold text-white">Últimas transações</h2>
              </div>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                {transactions.length} itens
              </span>
            </div>

            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={`${transaction.name}-${transaction.date}`}
                  className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-4"
                >
                  <div>
                    <p className="text-base font-medium text-white">{transaction.name}</p>
                    <p className="text-sm text-slate-400">{transaction.category}</p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-base font-semibold ${
                        accent === "cyan"
                          ? "text-cyan-200"
                          : accent === "rose"
                            ? "text-rose-200"
                            : "text-emerald-200"
                      }`}
                    >
                      {transaction.amount}
                    </p>
                    <span className="mt-1 inline-flex rounded-full bg-slate-800 px-2 py-1 text-[11px] text-slate-300">
                      {transaction.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Resumo</p>
            <h2 className="mt-1 text-xl font-semibold text-white">Distribuição</h2>

            <div className="mt-6 space-y-5">
              {summary.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800">
                    <div
                      className={`h-2.5 rounded-full bg-gradient-to-r ${currentAccent.bar}`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/40"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Cadastro</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Nova transação</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-slate-700 p-2 text-slate-300 transition hover:border-slate-500 hover:text-white"
                aria-label="Fechar modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300 sm:col-span-2">
                  <span>Descrição</span>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex.: Aluguel da sede"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-cyan-400"
                    required
                  />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Categoria</span>
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Ex.: Operações"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-cyan-400"
                    required
                  />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Valor</span>
                  <input
                    name="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0,00"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-cyan-400"
                    required
                  />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Data</span>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2.5 pl-10 text-white outline-none transition focus:border-cyan-400"
                      required
                    />
                  </div>
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Conta</span>
                  <div className="relative">
                    <CreditCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      name="account"
                      value={formData.account}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2.5 pl-10 text-white outline-none transition focus:border-cyan-400"
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="Conta Corrente">Conta Corrente</option>
                      <option value="Carteira">Carteira</option>
                      <option value="Reserva">Reserva</option>
                    </select>
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${currentAccent.button}`}
                >
                  Salvar transação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
