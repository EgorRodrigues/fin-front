# Contexto atual e pivô do produto

## 1. Diagnóstico do cenário atual
A base do frontend foi verificada diretamente no código e na estrutura do projeto. O app atual está em Next.js e já contém uma arquitetura inicial com:

- dashboard central com gráficos e cards de métricas
- navegação lateral com módulos financeiros
- páginas dedicadas para contas, despesas, outras receitas, investimentos e relatórios
- visual de dashboard institucional com foco em indicadores e fluxo de caixa

### Estrutura atual observada
Arquivos relevantes que confirmam o cenário:

- [src/app/page.tsx](../src/app/page.tsx) — renderiza o dashboard principal
- [src/components/financial-dashboard.tsx](../src/components/financial-dashboard.tsx) — dashboard com cards, áreas, gráficos e tabela de movimentações
- [src/components/sidebar.tsx](../src/components/sidebar.tsx) — navegação por módulos financeiros
- [src/app/contas/page.tsx](../src/app/contas/page.tsx) — base de lista de contas
- [src/app/despesas/page.tsx](../src/app/despesas/page.tsx) — base para despesas
- [src/app/outras-receitas/page.tsx](../src/app/outras-receitas/page.tsx) — base para receitas

### Conclusão do diagnóstico
A aplicação já tem uma base forte para um sistema financeiro, porém o contexto atual é mais institucional e corporativo, com métricas como:

- saldo disponível
- receitas líquidas
- investimentos
- fluxo do mês

Esse modelo não representa ainda a realidade do controle pessoal de gastos, onde o foco principal é:

- acompanhar obrigações e recebimentos
- controlar o que já foi pago ou recebido
- separar despesas e receitas em uma base única de transações
- visualizar fluxo de caixa pessoal e pendências em aberto

## 2. Oportunidade de pivô
O produto deve migrar de um dashboard institucional para um app pessoal de gestão financeira, usando a mesma base visual e arquitetural já construída.

### Objetivo do novo produto
Cria um app de controle de gastos pessoais que permita:

- cadastrar e gerenciar transações de receita e despesa
- separar registros em contas a pagar e contas a receber
- distinguir transações pagas e recebidas
- centralizar todas as movimentações em uma única entidade chamada transação
- filtrar e visualizar o comportamento financeiro por status e tipo

## 3. Modelo de domínio recomendado
Todas as movimentações devem ser registradas como transações, com campos padronizados e compartilhados.

### Entidade transação
Cada registro terá campos como:

- id
- descricao
- valor
- data
- categoria
- tipo: despesa ou receita
- status: pendente, pago, recebido, vencida, atrasada
- modulo: conta a pagar, conta a receber, conta paga, conta recebida
- conta vinculada
- observacoes
- data de vencimento
- data de pagamento ou recebimento
- recorrencia (opcional)

### Regra de negócio central
Mesmo com módulos diferentes, todos os dados devem continuar sendo transações. O módulo apenas define a visão contextual da movimentação.

Exemplo:

- uma despesa com vencimento futuro aparece em contas a pagar
- a mesma despesa, depois de paga, migra para contas pagas
- uma receita pendente entra em contas a receber
- uma receita recebida é exibida em contas recebidas

Essa abordagem reduz duplicação de estrutura e simplifica o filtro, a busca, a análise e o relatório.

## 4. Estrutura funcional proposta
O app deve manter os módulos mais relevantes para personal finance:

- contas a pagar
- contas a receber
- contas pagas
- contas recebidas
- dashboard geral
- relatórios e resumo financeiro
- configurações e categorias

## 5. MVP recomendado
Para a primeira fase, o foco deve ser em funcionalidade essencial com baixo risco e alta utilidade:

1. cadastro de transações com tipo despesa/receita
2. visualização por módulos de contas a pagar e receber
3. listagem de registros pagas/recebidas
4. filtro por status, tipo e período
5. dashboard com saldo, total pago, total recebido e próximos vencimentos
6. edição e exclusão simples das transações

## 6. Ajuste de linguagem e UX
A linguagem atual da interface está fortemente orientada a negócios/institucional. Para o novo produto, a UI deve ser adaptada para uso pessoal, com termos mais intuitivos:

- invés de "FinanceFlow Group" → "Controle Financeiro Pessoal"
- painel de métricas mais simples e mais acionáveis
- textos mais próximos de uso diário do usuário
- módulos e filtros com linguagem familiar para gestão doméstica

## 7. Recomendação final
A base já construida é uma boa fundação para o pivô, porque ela já possui:

- shell de app
- navegação consistente
- dashboard visual
- estrutura em páginas e componentes reutilizáveis
- stack tecnológica já pronta em Next.js

O que falta é principalmente a mudança de mentalidade do produto:

- passar de visão institucional para visão pessoal
- unificar a modelagem em transações
- organizar o fluxo por módulos de pagamento e recebimento
- dar foco em gestão de obrigações, vencimentos e saldos reais

Com isso, a aplicação pode continuar a partir do mesmo frontend sem recomeçar do zero.
