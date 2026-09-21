"use client";

import { CircleDollarSign, HandCoins, TrendingUp } from "lucide-react";

import { TransactionPage } from "@/components/transaction-page";
import { getTransactionsByModule } from "@/data/transactions";
import { formatCurrency, TransactionModule } from "@/types/transaction";

const receitas = getTransactionsByModule(TransactionModule.CONTAS_A_RECEBER);
const recebidas = getTransactionsByModule(TransactionModule.CONTAS_RECEBIDAS);

const metrics = [
  {
    label: "Receita total",
    value: formatCurrency(receitas.reduce((sum, item) => sum + item.amount, 0)),
    change: "+8,7% vs mês anterior",
    icon: HandCoins,
  },
  {
    label: "Recorrentes",
    value: formatCurrency(recebidas.reduce((sum, item) => sum + item.amount, 0)),
    change: "+5,2%",
    icon: TrendingUp,
  },
  {
    label: "Pendentes",
    value: formatCurrency(receitas.filter((item) => item.status !== "recebido").reduce((sum, item) => sum + item.amount, 0)),
    change: "+12,4%",
    icon: CircleDollarSign,
  },
];

const transactions = receitas.map((transaction) => ({
  name: transaction.description,
  category: transaction.category,
  amount: `+${formatCurrency(transaction.amount)}`,
  date: transaction.date,
  status: transaction.status,
  account: transaction.account,
}));

const summary = [
  { label: "Serviços", value: 36, color: "bg-emerald-400" },
  { label: "Investimentos", value: 28, color: "bg-cyan-400" },
  { label: "Educação", value: 21, color: "bg-violet-400" },
  { label: "Receitas fixas", value: 15, color: "bg-amber-400" },
];

export default function OutrasReceitasPage() {
  return (
    <TransactionPage
      eyebrow="Outras receitas"
      title="Fluxo de receitas complementares"
      buttonLabel="Nova receita"
      accent="emerald"
      metrics={metrics}
      transactions={transactions}
      summary={summary}
      storageKey="financy:outras-receitas"
    />
  );
}
