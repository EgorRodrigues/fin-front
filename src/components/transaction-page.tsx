"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  type LucideIcon,
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
  account?: string;
  value?: number;
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
  storageKey: string;
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

const filterStatusOptions = [
  "Todos",
  "Pendente",
  "Vencida",
  "Atrasada",
  "Pago",
  "Recebido",
  "Registrado",
];

const parseTransactionAmount = (amount: string) => {
  if (!amount) {
    return 0;
  }

  const normalized = amount.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
  const numericValue = Number(normalized);

  return Number.isFinite(numericValue) ? numericValue : 0;
};

const buildSummaryFromTransactions = (items: TransactionItem[]) => {
  const total = items.reduce((sum, transaction) => sum + (transaction.value ?? parseTransactionAmount(transaction.amount)), 0);

  return Object.entries(
    items.reduce<Record<string, number>>((accumulator, transaction) => {
      const amount = transaction.value ?? parseTransactionAmount(transaction.amount);
      accumulator[transaction.category] = (accumulator[transaction.category] ?? 0) + amount;
      return accumulator;
    }, {}),
  )
    .sort(([, left], [, right]) => right - left)
    .slice(0, 4)
    .map(([label, value]) => ({
      label,
      value: total > 0 ? Math.min(100, Math.max(10, Math.round((value / total) * 100 || 10))) : 0,
      color: "bg-cyan-400",
    }));
};

export function TransactionPage({
  eyebrow,
  title,
  buttonLabel,
  accent,
  metrics,
  transactions,
  summary,
  storageKey,
}: TransactionPageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<{
    transaction: TransactionItem;
    index: number;
  } | null>(null);
  const [formData, setFormData] = useState(initialForm);
  const [filters, setFilters] = useState({
    period: "todos",
    category: "todos",
    status: "todos",
    min: "",
    max: "",
  });
  const [persistedTransactions, setPersistedTransactions] = useState<TransactionItem[]>(() => {
    if (typeof window === "undefined") {
      return transactions;
    }

    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      return transactions;
    }

    try {
      const parsed = JSON.parse(saved) as TransactionItem[];
      return Array.isArray(parsed) ? parsed : transactions;
    } catch {
      return transactions;
    }
  });

  const currentAccent = accentMap[accent];

  const categoryOptions = Array.from(
    new Set([...persistedTransactions.map((transaction) => transaction.category), ...transactions.map((transaction) => transaction.category)]),
  ).filter(Boolean);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const filteredTransactions = persistedTransactions.filter((transaction) => {
    const numericValue = transaction.value ?? parseTransactionAmount(transaction.amount);
    const matchesCategory = filters.category === "todos" || transaction.category === filters.category;
    const matchesStatus = filters.status === "todos" || transaction.status === filters.status;
    const matchesMin = filters.min === "" || numericValue >= Number(filters.min);
    const matchesMax = filters.max === "" || numericValue <= Number(filters.max);

    if (!matchesCategory || !matchesStatus || !matchesMin || !matchesMax) {
      return false;
    }

    if (filters.period === "todos") {
      return true;
    }

    const currentDate = new Date();
    const transactionDate = new Date(`${transaction.date}T00:00:00`);
    const dayDifference = (transactionDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

    switch (filters.period) {
      case "mes_atual":
        return (
          transactionDate.getMonth() === currentDate.getMonth() &&
          transactionDate.getFullYear() === currentDate.getFullYear()
        );
      case "30_dias":
        return Math.abs(dayDifference) <= 30;
      case "proximos_30":
        return dayDifference >= 0 && dayDifference <= 30;
      default:
        return true;
    }
  });

  const summaryData = filteredTransactions.length > 0 ? buildSummaryFromTransactions(filteredTransactions) : summary;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, JSON.stringify(persistedTransactions));
    }
  }, [persistedTransactions, storageKey]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleDeleteTransaction = (index: number) => {
    setPersistedTransactions((previous) => previous.filter((_, currentIndex) => currentIndex !== index));

    setSelectedTransaction((current) => {
      if (!current || current.index !== index) {
        return current;
      }

      return null;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedAmount = Number(formData.amount || 0);
    const amountLabel =
      accent === "rose"
        ? `-R$ ${Math.abs(normalizedAmount).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : `+R$ ${Math.abs(normalizedAmount).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;

    const transactionToSave: TransactionItem = {
      name: formData.name,
      category: formData.category,
      amount: amountLabel,
      date: formData.date,
      status: "Registrado",
      account: formData.account,
      value: normalizedAmount,
    };

    setPersistedTransactions((previous) => [transactionToSave, ...previous]);
    console.log("Nova transação cadastrada:", transactionToSave);
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

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-400">Filtros</p>
              <h2 className="text-xl font-semibold text-white">Refinar movimentações</h2>
            </div>
            <button
              type="button"
              onClick={() => setFilters({ period: "todos", category: "todos", status: "todos", min: "", max: "" })}
              className="rounded-full border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-slate-500"
            >
              Limpar filtros
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <label className="space-y-2 text-sm text-slate-300">
              <span>Período</span>
              <select
                name="period"
                value={filters.period}
                onChange={handleFilterChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-cyan-400"
              >
                <option value="todos">Todos</option>
                <option value="mes_atual">Este mês</option>
                <option value="30_dias">Últimos 30 dias</option>
                <option value="proximos_30">Próximos 30 dias</option>
              </select>
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>Categoria</span>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-cyan-400"
              >
                <option value="todos">Todas</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>Status</span>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-cyan-400"
              >
                {filterStatusOptions.map((status) => (
                  <option key={status} value={status === "Todos" ? "todos" : status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>Valor mínimo</span>
              <input
                name="min"
                type="number"
                value={filters.min}
                onChange={handleFilterChange}
                placeholder="0"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-cyan-400"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              <span>Valor máximo</span>
              <input
                name="max"
                type="number"
                value={filters.max}
                onChange={handleFilterChange}
                placeholder="9999"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-cyan-400"
              />
            </label>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Movimentações</p>
                <h2 className="text-xl font-semibold text-white">Últimas transações</h2>
              </div>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                {filteredTransactions.length} itens
              </span>
            </div>

            <div className="space-y-3">
              {filteredTransactions.map((transaction, index) => (
                <div
                  key={`${transaction.name}-${transaction.date}-${transaction.amount}-${index}`}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-medium text-white">{transaction.name}</p>
                    <p className="text-sm text-slate-400">{transaction.category}</p>
                  </div>

                  <div className="flex items-center gap-3">
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

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedTransaction({ transaction, index })}
                        className={`rounded-full border px-2.5 py-1.5 text-[11px] font-medium transition ${currentAccent.button} shadow-sm`}
                      >
                        Visualizar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTransaction(index)}
                        className="rounded-full border border-rose-500/40 bg-rose-500/10 px-2.5 py-1.5 text-[11px] font-medium text-rose-200 transition hover:bg-rose-500/20"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Resumo</p>
            <h2 className="mt-1 text-xl font-semibold text-white">Distribuição</h2>

            <div className="mt-6 space-y-5">
              {summaryData.map((item) => (
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

      {selectedTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="transaction-viewer-modal w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/40"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="transaction-detail-eyebrow text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Detalhes</p>
                <h2 className="transaction-modal-title mt-2 text-2xl font-semibold text-white">{selectedTransaction.transaction.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                className="transaction-modal-close-btn rounded-full border border-slate-700 p-2 text-slate-300 transition hover:border-slate-500 hover:text-white"
                aria-label="Fechar detalhes"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="transaction-modal-surface rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                <p className="transaction-modal-muted text-sm text-slate-400">Valor</p>
                <p className={`transaction-detail-value mt-2 text-2xl font-semibold ${
                  accent === "cyan"
                    ? "transaction-detail-value-cyan"
                    : accent === "rose"
                      ? "transaction-detail-value-rose"
                      : "transaction-detail-value-emerald"
                }`}>
                  {selectedTransaction.transaction.amount}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="transaction-modal-surface rounded-2xl border border-slate-800 bg-slate-950/35 p-4">
                  <p className="transaction-modal-muted text-sm text-slate-400">Categoria</p>
                  <p className="transaction-modal-title mt-2 text-base font-medium text-white">{selectedTransaction.transaction.category}</p>
                </div>
                <div className="transaction-modal-surface rounded-2xl border border-slate-800 bg-slate-950/35 p-4">
                  <p className="transaction-modal-muted text-sm text-slate-400">Conta</p>
                  <p className="transaction-modal-title mt-2 text-base font-medium text-white">
                    {selectedTransaction.transaction.account || "Não informada"}
                  </p>
                </div>
                <div className="transaction-modal-surface rounded-2xl border border-slate-800 bg-slate-950/35 p-4">
                  <p className="transaction-modal-muted text-sm text-slate-400">Data</p>
                  <p className="transaction-modal-title mt-2 text-base font-medium text-white">{selectedTransaction.transaction.date}</p>
                </div>
                <div className="transaction-modal-surface rounded-2xl border border-slate-800 bg-slate-950/35 p-4">
                  <p className="transaction-modal-muted text-sm text-slate-400">Status</p>
                  <span className="transaction-modal-status mt-2 inline-flex rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200">
                    {selectedTransaction.transaction.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => handleDeleteTransaction(selectedTransaction.index)}
                className="transaction-danger-btn rounded-full border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-500/20"
              >
                Excluir transação
              </button>
              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${currentAccent.button}`}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

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
