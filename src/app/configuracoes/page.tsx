import { Bell, ShieldCheck, ShieldEllipsis, Users } from "lucide-react";

const settings = [
  { label: "Permissões do time", value: "12 usuários ativos", icon: Users },
  { label: "Segurança", value: "2FA habilitado", icon: ShieldCheck },
  { label: "Notificações", value: "4 alertas configurados", icon: Bell },
];

const team = [
  { name: "Marina Costa", role: "Diretora financeira", access: "Total" },
  { name: "Thiago Lima", role: "Controller", access: "Gerencial" },
  { name: "Amanda Reis", role: "Analista", access: "Leitura" },
];

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Configurações</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Ajustes de operação e segurança</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {settings.map(({ label, value, icon: Icon }) => (
          <article key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{label}</span>
              <div className="rounded-xl bg-slate-800 p-2 text-cyan-300">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-6 text-xl font-semibold text-white">{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Acesso</p>
              <h2 className="text-xl font-semibold text-white">Equipe com permissões</h2>
            </div>
            <div className="rounded-xl bg-slate-800 p-2 text-cyan-300">
              <ShieldEllipsis className="h-5 w-5" />
            </div>
          </div>

          <div className="space-y-3">
            {team.map((member) => (
              <div key={member.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                <div>
                  <p className="font-medium text-white">{member.name}</p>
                  <p className="text-sm text-slate-400">{member.role}</p>
                </div>
                <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-200">
                  {member.access}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Status</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Sistema</h2>

          <div className="mt-5 space-y-4">
            {[
              { label: "API financeira", value: "Online" },
              { label: "Sincronização contábil", value: "Atualizada" },
              { label: "Backup diário", value: "Concluído" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-3">
                <span className="text-slate-300">{item.label}</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
