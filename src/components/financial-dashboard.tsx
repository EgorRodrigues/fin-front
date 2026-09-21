"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  BanknoteArrowUp,
  BriefcaseBusiness,
  CircleDollarSign,
  TrendingUp,
} from "lucide-react";

import { TransactionType, type Transaction } from "@/types/transaction";

const cashFlowData = [
  { month: "Jan", receitas: 3200, despesas: 2100 },
  { month: "Fev", receitas: 3800, despesas: 2400 },
  { month: "Mar", receitas: 3600, despesas: 2200 },
  { month: "Abr", receitas: 4200, despesas: 2500 },
  { month: "Mai", receitas: 4700, despesas: 2700 },
  { month: "Jun", receitas: 5100, despesas: 2900 },
];

const portfolioData = [
  { name: "Liquidez", value: 38 },
  { name: "Renda fixa", value: 26 },
  { name: "Equity", value: 21 },
  { name: "Imóveis", value: 15 },
];

type MovementItem = {
  id: string;
  setor: string;
  categoria: string;
  valor: string;
  status: string;
};

interface FinancialDashboardProps {
  transactions: Transaction[];
}

function getStatusClasses(status: string) {
  switch (status) {
    case "Positivo":
      return "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30";
    case "Atenção":
      return "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30";
    default:
      return "bg-slate-500/15 text-slate-200 ring-1 ring-slate-500/30";
  }
}

export function FinancialDashboard({ transactions }: FinancialDashboardProps) {
  const totalReceitas = transactions
    .filter((transaction) => transaction.type === TransactionType.RECEITA)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalDespesas = transactions
    .filter((transaction) => transaction.type === TransactionType.DESPESA)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const saldoTotal = totalReceitas - totalDespesas;

  const movementData: MovementItem[] = transactions.map((transaction) => ({
    id: transaction.id,
    setor: transaction.account ?? "Conta pessoal",
    categoria: transaction.category,
    valor: `R$ ${transaction.amount.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    status: transaction.type === TransactionType.RECEITA ? "Positivo" : "Atenção",
  }));

  const metrics = [
    {
      label: "Saldo total",
      value: `R$ ${saldoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      delta: "+12,4%",
      icon: CircleDollarSign,
      accent: "text-emerald-300",
    },
    {
      label: "Receitas",
      value: `R$ ${totalReceitas.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      delta: "+8,1%",
      icon: TrendingUp,
      accent: "text-cyan-300",
    },
    {
      label: "Despesas",
      value: `R$ ${totalDespesas.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      delta: "+5,6%",
      icon: BriefcaseBusiness,
      accent: "text-violet-300",
    },
    {
      label: "Fluxo do mês",
      value: `R$ ${(totalReceitas - totalDespesas).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      delta: "+3,2%",
      icon: BanknoteArrowUp,
      accent: "text-amber-300",
    },
  ];

  const formatTooltipValue = (
    value: string | number | readonly (string | number)[] | undefined,
  ) => {
    const numericValue = Array.isArray(value)
      ? Number(value[0] ?? 0)
      : Number(value ?? 0);

    return numericValue;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Finanças pessoais
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Visão geral do mês
            </h1>
          </div>

          <button className="inline-flex items-center justify-center rounded-full border border-cyan-400/60 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20">
            Ver relatório
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ label, value, delta, icon: Icon, accent }) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-950/20"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{label}</span>
                <div className={`rounded-xl bg-slate-800 p-2 ${accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <p className="text-3xl font-semibold text-white">{value}</p>
                <span className="text-sm font-medium text-emerald-300">{delta}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Fluxo de caixa</p>
                <h2 className="text-xl font-semibold text-white">Receitas e despesas do mês</h2>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                +18,2% no semestre
              </span>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashFlowData}>
                  <defs>
                    <linearGradient id="receitas" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="despesas" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12 }}
                    formatter={(value) => {
                      const numericValue = formatTooltipValue(value);
                      return [`R$ ${numericValue.toLocaleString("pt-BR")}`, "valor"];
                    }}
                  />
                  <Area type="monotone" dataKey="receitas" stroke="#22d3ee" strokeWidth={3} fill="url(#receitas)" />
                  <Area type="monotone" dataKey="despesas" stroke="#34d399" strokeWidth={3} fill="url(#despesas)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-4">
              <p className="text-sm text-slate-400">Composição</p>
              <h2 className="text-xl font-semibold text-white">Distribuição da sua carteira</h2>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={portfolioData} layout="vertical" margin={{ left: 12, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis type="number" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="name" stroke="#cbd5e1" tickLine={false} axisLine={false} />
                  <Tooltip
                    formatter={(value) => {
                      const numericValue = formatTooltipValue(value);
                      return [`${numericValue}%`, "participação"];
                    }}
                    contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12 }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Movimentações recentes</p>
              <h2 className="text-xl font-semibold text-white">Últimas entradas e saídas</h2>
            </div>
            <span className="text-sm text-slate-300">Atualizado hoje</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="px-4 py-3 font-medium">Setor</th>
                  <th className="px-4 py-3 font-medium">Categoria</th>
                  <th className="px-4 py-3 font-medium">Valor</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {movementData.map((row) => (
                  <tr key={row.id} className="border-b border-slate-800/80 text-slate-200">
                    <td className="px-4 py-3">{row.setor}</td>
                    <td className="px-4 py-3">{row.categoria}</td>
                    <td className="px-4 py-3">{row.valor}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(row.status)}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
