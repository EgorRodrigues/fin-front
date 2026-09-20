"use client";

import { Landmark, ReceiptText, TrendingDown } from "lucide-react";

import { TransactionPage } from "@/components/transaction-page";

const metrics = [
  { label: "Total de despesas", value: "R$ 640K", change: "+4,2% vs mês anterior", icon: ReceiptText },
  { label: "Fixas", value: "R$ 320K", change: "+1,8%", icon: Landmark },
  { label: "Variáveis", value: "R$ 280K", change: "-2,1%", icon: TrendingDown },
];

const transactions = [
  { name: "Aluguel da sede", category: "Operações", amount: "-R$ 42K", date: "12/09", status: "Pago" },
  { name: "Folha de pagamento", category: "Pessoal", amount: "-R$ 86K", date: "10/09", status: "Em execução" },
  { name: "Marketing digital", category: "Vendas", amount: "-R$ 18K", date: "09/09", status: "Aprovado" },
  { name: "Serviços de TI", category: "Tecnologia", amount: "-R$ 24K", date: "07/09", status: "Pago" },
];

const summary = [
  { label: "Operações", value: 38, color: "bg-rose-400" },
  { label: "Pessoal", value: 29, color: "bg-orange-400" },
  { label: "Marketing", value: 19, color: "bg-cyan-400" },
  { label: "Tecnologia", value: 14, color: "bg-violet-400" },
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
    />
  );
}
