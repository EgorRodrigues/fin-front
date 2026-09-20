"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BriefcaseBusiness,
  CreditCard,
  HandCoins,
  LayoutDashboard,
  ReceiptText,
  Settings,
  Sparkles,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Visão geral", href: "/", icon: LayoutDashboard },
  { label: "Contas", href: "/contas", icon: CreditCard },
  { label: "Despesas", href: "/despesas", icon: ReceiptText },
  { label: "Outras receitas", href: "/outras-receitas", icon: HandCoins },
  { label: "Investimentos", href: "/investimentos", icon: BriefcaseBusiness },
  { label: "Relatórios", href: "/relatorios", icon: BarChart3 },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full max-w-[260px] shrink-0">
      <div className="sticky top-6 flex h-[calc(100vh-3rem)] flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-950/35 backdrop-blur">
        <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-slate-950">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
              FinanceFlow
            </p>
            <h2 className="text-base font-semibold text-white">Gerencial</h2>
          </div>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(href));

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "sidebar-nav-item flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive && "sidebar-nav-item--active",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Operações</p>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-white">R$ 2,84M</p>
                <p className="text-xs text-emerald-300">+12,4% nesta semana</p>
              </div>
              <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-300">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}
