# Documentação do pivô do app financeiro

## Visão geral
Este diretório reúne a base de diagnóstico e o planejamento do pivô do frontend para um app de controle de gastos pessoais.

## Contexto da base atual
A aplicação atual já está estruturada como um dashboard financeiro em Next.js, com:

- shell de navegação com sidebar
- dashboard principal com métricas e gráficos
- módulos de contas, despesas, receitas, investimentos e relatórios
- visual atual alinhada ao tema financeiro corporativo

A base é funcional para um contexto institucional, mas ainda não atende ao modelo de gestão pessoal de fluxo de caixa com transações unificadas.

## Artefatos disponíveis

- [contexto-atual-e-pivot.md](contexto-atual-e-pivot.md) — diagnóstico do cenário atual e desenho do novo modelo de negócio.
- [epicos-pivot-financas-pessoais.md](epicos-pivot-financas-pessoais.md) — estrutura dos épicos, objetivos, entregas e critérios de aceitação.

## Direção estratégica do pivô
O aplicativo deve evoluir para um sistema de controle financeiro pessoal em que todas as movimentações sejam tratadas como transações, com campos padrão e classificação por tipo:

- despesa
- receita

Além disso, cada registro deve poder ser categorizado como:

- contas a pagar
- contas a receber
- contas pagas
- contas recebidas

Com isso, a mesma entidade de dados serve para diferentes visões e filtros sem duplicação de estrutura.
