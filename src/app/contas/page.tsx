import { ArrowUpRight, Landmark, PiggyBank, Wallet } from "lucide-react";

const metrics = [
  { label: "Saldo consolidado", value: "R$ 2,84M", change: "+12,4%", icon: Wallet },
  { label: "Disponível", value: "R$ 1,43M", change: "+4,8%", icon: PiggyBank },
  { label: "Contas a pagar", value: "R$ 640K", change: "-2,1%", icon: Landmark },
];

const accounts = [
  { name: "Conta Corrente", bank: "Banco do Brasil", balance: "R$ 840.000", status: "Ativa" },
  { name: "Fundo de caixa", bank: "BTG Pactual", balance: "R$ 1.210.000", status: "Fluxo estável" },
  { name: "Cofre de reserva", bank: "Santander", balance: "R$ 620.000", status: "Monitorado" },
  { name: "Empréstimos", bank: "XP Investimentos", balance: "R$ 180.000", status: "Aguardando", },
];

export default function ContasPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Contas</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Gestão de saldos e disponibilidade</h1>
        </div>
        <button className="inline-flex items-center justify-center rounded-full border border-cyan-400/60 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20">
          Nova conta
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map(({ label, value, change, icon: Icon }) => (
          <article key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{label}</span>
              <div className="rounded-xl bg-slate-800 p-2 text-cyan-300">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-6 text-3xl font-semibold text-white">{value}</p>
            <p className="mt-2 text-sm text-emerald-300">{change}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Estrutura</p>
              <h2 className="text-xl font-semibold text-white">Contas ativas</h2>
            </div>
            <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300">4 contas</span>
          </div>

          <div className="space-y-3">
            {accounts.map((account) => (
              <div key={account.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                <div>
                  <p className="text-base font-medium text-white">{account.name}</p>
                  <p className="text-sm text-slate-400">{account.bank}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-semibold text-white">{account.balance}</p>
                  <span className="inline-flex rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
                    {account.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Resumo</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Distribuição</h2>

          <div className="mt-6 space-y-5">
            {[
              { label: "Disponibilidade", value: 62, color: "bg-cyan-400" },
              { label: "Investimentos", value: 24, color: "bg-violet-400" },
              { label: "Reservas", value: 14, color: "bg-emerald-400" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800">
                  <div className={`h-2.5 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
