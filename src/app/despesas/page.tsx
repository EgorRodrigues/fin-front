import { TransactionModulePage } from "@/components/transaction-module-page";
import { TransactionModule } from "@/types/transaction";

export default function DespesasPage() {
  return (
    <TransactionModulePage
      module={TransactionModule.CONTAS_A_PAGAR}
      eyebrow="Contas a pagar"
      title="Gestão das despesas do mês"
      buttonLabel="Nova despesa"
      accent="rose"
      storageKey="financy:despesas"
    />
  );
}
