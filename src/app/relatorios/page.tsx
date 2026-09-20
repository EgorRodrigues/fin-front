import { ArrowDownToLine, CalendarRange, FileText, TrendingUp } from "lucide-react";

const reports = [
  { name: "Relatório consolidado", period: "Agosto 2026", status: "Concluído" },
  { name: "DRE mensal", period: "Julho 2026", status: "Disponível" },
  { name: "Fluxo de caixa", period: "Junho 2026", status: "Em revisão" },
];

export default function RelatoriosPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">Relatórios</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Indicadores e documentos financeiros</h1>
        </div>
        <button className="inline-flex items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-400/20">
          Exportar PDF
          <ArrowDownToLine className="ml-2 h-4 w-4" />
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          { label: "Receita líquida", value: "R$ 1,61M", icon: TrendingUp },
          { label: "Custos fixos", value: "R$ 430K", icon: FileText },
          { label: "Período", value: "2026 Q3", icon: CalendarRange },
        ].map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{label}</span>
              <div className="rounded-xl bg-slate-800 p-2 text-emerald-300">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-6 text-3xl font-semibold text-white">{value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-5">
          <p className="text-sm text-slate-400">Documentos</p>
          <h2 className="text-xl font-semibold text-white">Relatórios disponíveis</h2>
        </div>

        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
              <div>
                <p className="font-medium text-white">{report.name}</p>
                <p className="text-sm text-slate-400">{report.period}</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                {report.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
