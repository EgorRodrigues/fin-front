export enum TransactionType {
  DESPESA = "despesa",
  RECEITA = "receita",
}

export enum TransactionStatus {
  PENDENTE = "pendente",
  PAGO = "pago",
  RECEBIDO = "recebido",
  VENCIDA = "vencida",
  ATRASADA = "atrasada",
  REGISTRADO = "registrado",
}

export enum TransactionModule {
  CONTAS_A_PAGAR = "contas-a-pagar",
  CONTAS_A_RECEBER = "contas-a-receber",
  CONTAS_PAGAS = "contas-pagas",
  CONTAS_RECEBIDAS = "contas-recebidas",
}

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

export const transactionTypeOptions = Object.values(TransactionType) as TransactionType[];
export const transactionStatusOptions = Object.values(TransactionStatus) as TransactionStatus[];
export const transactionModuleOptions = Object.values(TransactionModule) as TransactionModule[];

export const transactionTypeLabels: Record<TransactionType, string> = {
  [TransactionType.DESPESA]: "Despesa",
  [TransactionType.RECEITA]: "Receita",
};

export const transactionStatusLabels: Record<TransactionStatus, string> = {
  [TransactionStatus.PENDENTE]: "Pendente",
  [TransactionStatus.PAGO]: "Pago",
  [TransactionStatus.RECEBIDO]: "Recebido",
  [TransactionStatus.VENCIDA]: "Vencida",
  [TransactionStatus.ATRASADA]: "Atrasada",
  [TransactionStatus.REGISTRADO]: "Registrado",
};

export const transactionModuleLabels: Record<TransactionModule, string> = {
  [TransactionModule.CONTAS_A_PAGAR]: "Contas a pagar",
  [TransactionModule.CONTAS_A_RECEBER]: "Contas a receber",
  [TransactionModule.CONTAS_PAGAS]: "Contas pagas",
  [TransactionModule.CONTAS_RECEBIDAS]: "Contas recebidas",
};

export const transactionModuleConfig: Record<
  TransactionModule,
  {
    label: string;
    type: TransactionType;
    accent: "cyan" | "rose" | "emerald";
    isExpense: boolean;
    completedStatus: TransactionStatus;
  }
> = {
  [TransactionModule.CONTAS_A_PAGAR]: {
    label: transactionModuleLabels[TransactionModule.CONTAS_A_PAGAR],
    type: TransactionType.DESPESA,
    accent: "rose",
    isExpense: true,
    completedStatus: TransactionStatus.PAGO,
  },
  [TransactionModule.CONTAS_A_RECEBER]: {
    label: transactionModuleLabels[TransactionModule.CONTAS_A_RECEBER],
    type: TransactionType.RECEITA,
    accent: "emerald",
    isExpense: false,
    completedStatus: TransactionStatus.RECEBIDO,
  },
  [TransactionModule.CONTAS_PAGAS]: {
    label: transactionModuleLabels[TransactionModule.CONTAS_PAGAS],
    type: TransactionType.DESPESA,
    accent: "rose",
    isExpense: true,
    completedStatus: TransactionStatus.PAGO,
  },
  [TransactionModule.CONTAS_RECEBIDAS]: {
    label: transactionModuleLabels[TransactionModule.CONTAS_RECEBIDAS],
    type: TransactionType.RECEITA,
    accent: "emerald",
    isExpense: false,
    completedStatus: TransactionStatus.RECEBIDO,
  },
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
