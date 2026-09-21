export type TransactionType = "despesa" | "receita";

export type TransactionStatus =
  | "pendente"
  | "pago"
  | "recebido"
  | "vencida"
  | "atrasada"
  | "registrado";

export type TransactionModule =
  | "contas-a-pagar"
  | "contas-a-receber"
  | "contas-pagas"
  | "contas-recebidas";

export interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  type: TransactionType;
  status: TransactionStatus;
  module: TransactionModule;
  account?: string;
  notes?: string;
}

export const transactionTypeLabels: Record<TransactionType, string> = {
  despesa: "Despesa",
  receita: "Receita",
};

export const transactionStatusLabels: Record<TransactionStatus, string> = {
  pendente: "Pendente",
  pago: "Pago",
  recebido: "Recebido",
  vencida: "Vencida",
  atrasada: "Atrasada",
  registrado: "Registrado",
};

export const transactionModuleLabels: Record<TransactionModule, string> = {
  "contas-a-pagar": "Contas a pagar",
  "contas-a-receber": "Contas a receber",
  "contas-pagas": "Contas pagas",
  "contas-recebidas": "Contas recebidas",
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
