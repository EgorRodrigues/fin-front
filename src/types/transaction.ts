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
  settledAt?: string;
  statusHistory?: TransactionStatus[];
  originalModule?: TransactionModule;
}

export const transactionTypeOptions = Object.values(TransactionType) as TransactionType[];
export const transactionStatusOptions = Object.values(TransactionStatus) as TransactionStatus[];
export const transactionModuleOptions = Object.values(TransactionModule) as TransactionModule[];

export function getCompletedStatusByModule(module: TransactionModule): TransactionStatus {
  return transactionModuleConfig[module].completedStatus;
}

export function isCompletedStatusForModule(
  module: TransactionModule,
  status: TransactionStatus,
): boolean {
  return getCompletedStatusByModule(module) === status;
}

export function isTransactionCompleted(transaction: Pick<Transaction, "status" | "module">): boolean {
  return isCompletedStatusForModule(transaction.module, transaction.status);
}

export function getTransactionLiquidityDate(transaction: Pick<Transaction, "settledAt" | "date">): string {
  return transaction.settledAt ?? transaction.date;
}

export function appendStatusHistory(
  transaction: Pick<Transaction, "statusHistory" | "status">,
  nextStatus: TransactionStatus,
): TransactionStatus[] {
  const history = transaction.statusHistory ?? [transaction.status];

  return [...new Set([...history, nextStatus])];
}

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

export function isCompletedModule(module: TransactionModule): boolean {
  return module === TransactionModule.CONTAS_PAGAS || module === TransactionModule.CONTAS_RECEBIDAS;
}

export const getModuleStatusOptions = (module: TransactionModule) => {
  if (isCompletedModule(module)) {
    return module === TransactionModule.CONTAS_PAGAS
      ? [TransactionStatus.PAGO]
      : [TransactionStatus.RECEBIDO];
  }

  const isExpenseModule = module === TransactionModule.CONTAS_A_PAGAR || module === TransactionModule.CONTAS_PAGAS;

  return isExpenseModule
    ? [
        TransactionStatus.PENDENTE,
        TransactionStatus.VENCIDA,
        TransactionStatus.ATRASADA,
        TransactionStatus.PAGO,
      ]
    : [
        TransactionStatus.PENDENTE,
        TransactionStatus.ATRASADA,
        TransactionStatus.RECEBIDO,
      ];
};
