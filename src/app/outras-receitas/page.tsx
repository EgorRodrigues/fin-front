"use client";

import { CircleDollarSign, HandCoins, TrendingUp } from "lucide-react";

import { TransactionPage } from "@/components/transaction-page";

const metrics = [
  { label: "Receita total", value: "R$ 780K", change: "+8,7% vs mês anterior", icon: HandCoins },
  { label: "Recorrentes", value: "R$ 510K", change: "+5,2%", icon: TrendingUp },
  { label: "Eventuais", value: "R$ 270K", change: "+12,4%", icon: CircleDollarSign },
];

const transactions = [
  { name: "Consultoria corporativa", category: "Serviços", amount: "+R$ 86K", date: "12/09", status: "Recebido" },
  { name: "Venda de ativo", category: "Investimentos", amount: "+R$ 120K", date: "10/09", status: "Liquidado" },
  { name: "Dividendos", category: "Renda", amount: "+R$ 34K", date: "09/09", status: "Confirmado" },
  { name: "Ajuste de mensalidade", category: "Recorrentes", amount: "+R$ 22K", date: "08/09", status: "Programado" },
];

const summary = [
  { label: "Serviços", value: 36, color: "bg-emerald-400" },
  { label: "Investimentos", value: 28, color: "bg-cyan-400" },
  { label: "Renda", value: 21, color: "bg-violet-400" },
  { label: "Recorrentes", value: 15, color: "bg-amber-400" },
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
    />
  );
}
