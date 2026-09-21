"use client";

import { Landmark, ReceiptText, TrendingDown } from "lucide-react";

import { TransactionPage } from "@/components/transaction-page";
import { getTransactionsByModule } from "@/data/transactions";
import { formatCurrency, TransactionModule } from "@/types/transaction";

const despesas = getTransactionsByModule(TransactionModule.CONTAS_A_PAGAR);
const pagas = getTransactionsByModule(TransactionModule.CONTAS_PAGAS);

const metrics = [
  {
    label: "Total de despesas",
    value: formatCurrency(despesas.reduce((sum, item) => sum + item.amount, 0)),
    change: "+4,2% vs mês anterior",
    icon: ReceiptText,
  },
  {
    label: "Fixas",
    value: formatCurrency(pagas.reduce((sum, item) => sum + item.amount, 0)),
    change: "+1,8%",
    icon: Landmark,
  },
  {
    label: "Pendentes",
    value: formatCurrency(despesas.filter((item) => item.status !== "pago").reduce((sum, item) => sum + item.amount, 0)),
    change: "-2,1%",
    icon: TrendingDown,
  },
];

const transactions = despesas.map((transaction) => ({
  name: transaction.description,
  category: transaction.category,
  amount: `-${formatCurrency(transaction.amount)}`,
  date: transaction.date,
  status: transaction.status,
  account: transaction.account,
}));

const summary = [
  { label: "Moradia", value: 38, color: "bg-rose-400" },
  { label: "Alimentação", value: 29, color: "bg-orange-400" },
  { label: "Contas", value: 19, color: "bg-cyan-400" },
  { label: "Saúde", value: 14, color: "bg-violet-400" },
];

export default function DespesasPage() {
  return (
    <TransactionPage
      eyebrow="Despesas"
      title="Gestão de custos e despesas operacionais"
      buttonLabel="Nova despesa"
      accent="rose"
      metrics={metrics}
      transactions={transactions}
      summary={summary}
      storageKey="financy:despesas"
    />
  );
}
