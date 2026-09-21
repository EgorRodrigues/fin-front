import { TransactionModulePage } from "@/components/transaction-module-page";
import { TransactionModule } from "@/types/transaction";

export default function ContasAReceberPage() {
  return (
    <TransactionModulePage
      module={TransactionModule.CONTAS_A_RECEBER}
      eyebrow="Contas a receber"
      title="Acompanhamento das receitas pendentes"
      buttonLabel="Nova receita"
      accent="emerald"
      storageKey="financy:contas-a-receber"
    />
  );
}
