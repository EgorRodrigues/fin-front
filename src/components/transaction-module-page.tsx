"use client";

import type { LucideIcon } from "lucide-react";
import {
  CircleDollarSign,
  HandCoins,
  Landmark,
  ReceiptText,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { TransactionPage } from "@/components/transaction-page";
import { getTransactionsByModule } from "@/data/transactions";
import {
  formatCurrency,
  transactionModuleConfig,
  transactionStatusLabels,
  TransactionModule,
  TransactionType,
} from "@/types/transaction";

interface TransactionModulePageProps {
  module: TransactionModule;
  eyebrow: string;
  title: string;
  buttonLabel: string;
  accent?: "cyan" | "rose" | "emerald";
  storageKey: string;
}

export function TransactionModulePage({
  module,
  eyebrow,
  title,
  buttonLabel,
  accent,
  storageKey,
}: TransactionModulePageProps) {
  const records = getTransactionsByModule(module);
  const moduleConfig = transactionModuleConfig[module];
  const resolvedAccent = accent ?? moduleConfig.accent;
  const isExpenseModule = moduleConfig.isExpense;

  const total = records.reduce((sum, transaction) => sum + transaction.amount, 0);
  const pending = records
    .filter(
      (transaction) =>
        transaction.status !== moduleConfig.completedStatus &&
        transaction.status !== (isExpenseModule ? "recebido" : "pago"),
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const completedTotal = records
    .filter((transaction) => transaction.status === moduleConfig.completedStatus)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const metrics: Array<{ label: string; value: string; change: string; icon: LucideIcon }> = [
    {
      label: isExpenseModule ? "Total em contas" : "Total em recebimento",
      value: formatCurrency(total),
      change: "+4,2% vs mês anterior",
      icon: isExpenseModule ? ReceiptText : HandCoins,
    },
    {
      label: isExpenseModule ? "Pendentes" : "A receber",
      value: formatCurrency(pending),
      change: "+1,8%",
      icon: isExpenseModule ? Landmark : TrendingUp,
    },
    {
      label: isExpenseModule ? "Pagas" : "Recebidas",
      value: formatCurrency(completedTotal),
      change: "-2,1%",
      icon: isExpenseModule ? TrendingDown : CircleDollarSign,
    },
  ];

  const summary = Object.entries(
    records.reduce<Record<string, number>>((accumulator, transaction) => {
      accumulator[transaction.category] = (accumulator[transaction.category] ?? 0) + transaction.amount;
      return accumulator;
    }, {}),
  )
    .sort(([, left], [, right]) => right - left)
    .slice(0, 4)
    .map(([category, value]) => ({
      label: category,
      value: total > 0 ? Math.min(100, Math.max(10, Math.round((value / total) * 100 || 10))) : 0,
      color:
        resolvedAccent === "rose"
          ? "bg-rose-400"
          : resolvedAccent === "emerald"
            ? "bg-emerald-400"
            : "bg-cyan-400",
    }));

  const transactions = records.map((transaction) => ({
    name: transaction.description,
    category: transaction.category,
    amount: `${transaction.type === TransactionType.DESPESA ? "-" : "+"}${formatCurrency(transaction.amount)}`,
    date: transaction.date,
    status: transactionStatusLabels[transaction.status],
    account: transaction.account ?? "Não informada",
  }));

  return (
    <TransactionPage
      eyebrow={eyebrow}
      title={title}
      buttonLabel={buttonLabel}
      accent={resolvedAccent}
      metrics={metrics}
      transactions={transactions}
      summary={summary}
      storageKey={storageKey}
    />
  );
}
