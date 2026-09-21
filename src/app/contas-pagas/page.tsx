import { TransactionModulePage } from "@/components/transaction-module-page";
import { TransactionModule } from "@/types/transaction";

export default function ContasPagasPage() {
  return (
    <TransactionModulePage
      module={TransactionModule.CONTAS_PAGAS}
      eyebrow="Contas pagas"
      title="Resumo das despesas quitadas"
      buttonLabel="Registrar pagamento"
      accent="rose"
      storageKey="financy:contas-pagas"
    />
  );
}
