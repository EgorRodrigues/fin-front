import { TransactionModulePage } from "@/components/transaction-module-page";
import { TransactionModule } from "@/types/transaction";

export default function ContasRecebidasPage() {
  return (
    <TransactionModulePage
      module={TransactionModule.CONTAS_RECEBIDAS}
      eyebrow="Contas recebidas"
      title="Resumo dos recebimentos concluídos"
      buttonLabel="Registrar recebimento"
      accent="emerald"
      storageKey="financy:contas-recebidas"
    />
  );
}
