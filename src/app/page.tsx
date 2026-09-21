import { FinancialDashboard } from "@/components/financial-dashboard";
import { transactionsSeed } from "@/data/transactions";

export default function Home() {
  return <FinancialDashboard transactions={transactionsSeed} />;
}
