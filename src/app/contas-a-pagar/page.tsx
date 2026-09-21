import { TransactionModulePage } from "@/components/transaction-module-page";
import { TransactionModule } from "@/types/transaction";

export default function ContasAPagarPage() {
  return (
    <TransactionModulePage
      module={TransactionModule.CONTAS_A_PAGAR}
      eyebrow="Contas a pagar"
      title="Gestão das despesas pendentes"
      buttonLabel="Nova despesa"
      accent="rose"
      storageKey="financy:contas-a-pagar"
    />
  );
}
