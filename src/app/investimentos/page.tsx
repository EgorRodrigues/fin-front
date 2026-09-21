import { ArrowUpRight, BarChart3, BriefcaseBusiness, TrendingUp } from "lucide-react";

const portfolio = [
  { name: "Renda fixa", value: "R$ 1,1M", yield: "7,8% a.a." },
  { name: "Ações", value: "R$ 820K", yield: "11,4% a.a." },
  { name: "Imóveis", value: "R$ 640K", yield: "6,2% a.a." },
  { name: "Private Credit", value: "R$ 510K", yield: "9,1% a.a." },
];

const transactions = [
  { asset: "Petróleo Global", type: "Compra", amount: "+R$ 120K", date: "12/09" },
  { asset: "FII Premium", type: "Dividendos", amount: "+R$ 34K", date: "10/09" },
  { asset: "Tesouro Selic", type: "Resgate", amount: "-R$ 48K", date: "09/09" },
];

export default function InvestimentosPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">Investimentos</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Seu portfólio pessoal e rendimentos</h1>
        </div>
        <button className="inline-flex items-center justify-center rounded-full border border-violet-400/60 bg-violet-400/10 px-4 py-2 text-sm font-medium text-violet-200 transition hover:bg-violet-400/20">
          Novo aporte
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          { label: "Patrimônio total", value: "R$ 4,12M", change: "+5,6%", icon: BriefcaseBusiness },
          { label: "Rentabilidade", value: "9,8%", change: "+1,2%", icon: TrendingUp },
          { label: "Fluxo líquido", value: "R$ 280K", change: "+3,4%", icon: BarChart3 },
        ].map(({ label, value, change, icon: Icon }) => (
          <article key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{label}</span>
              <div className="rounded-xl bg-slate-800 p-2 text-violet-300">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-6 text-3xl font-semibold text-white">{value}</p>
            <p className="mt-2 text-sm text-emerald-300">{change}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Carteira</p>
              <h2 className="text-xl font-semibold text-white">Distribuição do seu patrimônio</h2>
            </div>
          </div>

          <div className="space-y-4">
            {portfolio.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.yield}</p>
                  </div>
                  <p className="text-base font-semibold text-white">{item.value}</p>
                </div>
                <div className="mt-3 h-2.5 rounded-full bg-slate-800">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
                    style={{ width: `${Math.min(100, (Number(item.value.replace(/[^\d]/g, "")) / 1100000) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Movimentações</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Últimas movimentações</h2>

          <div className="mt-5 space-y-3">
            {transactions.map((transaction) => (
              <div key={`${transaction.asset}-${transaction.date}`} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{transaction.asset}</p>
                    <p className="text-xs text-slate-400">{transaction.type}</p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-300">{transaction.amount}</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">{transaction.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
