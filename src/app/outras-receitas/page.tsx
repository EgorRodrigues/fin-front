import { TransactionModulePage } from "@/components/transaction-module-page";
import { TransactionModule } from "@/types/transaction";

export default function OutrasReceitasPage() {
  return (
    <TransactionModulePage
      module={TransactionModule.CONTAS_A_RECEBER}
      eyebrow="Contas a receber"
      title="Fluxo de receitas complementares"
      buttonLabel="Nova receita"
      accent="emerald"
      storageKey="financy:outras-receitas"
    />
  );
}
