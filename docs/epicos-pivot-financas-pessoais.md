# Épicos para o pivô do app de controle de gastos pessoal

## Visão do produto
Transformar a base atual de dashboard financeiro em um app de controle de gastos pessoais, com foco em gestão de contas a pagar, contas a receber, contas pagas e contas recebidas, usando uma única entidade de dados: transação.

## Produto principal
O app deve permitir ao usuário acompanhar, organizar e controlar o fluxo financeiro pessoal com clareza, sem duplicar registros ou operações para cada visão de módulo.

## Estrutura de organização
Todos os registros são transações, e cada transação possui tipo:

- despesa
- receita

Além disso, a mesma transação pode ser visualizada por módulo:

- contas a pagar
- contas a receber
- contas pagas
- contas recebidas

## Epic 1 — Fundação do domínio e da estrutura do app
### Objetivo
Estabelecer a base de dados, os modelos e a arquitetura da navegação para que todas as telas usem a mesma entidade transação.

### Entregáveis
- definição da entidade Transação
- enumeração de tipo: despesa/receita
- enumeração de status: pendente, pago, recebido, vencida, atrasada
- enumeração de módulo: contas a pagar, contas a receber, contas pagas, contas recebidas
- estrutura inicial de páginas e navegação do app
- atualização da linguagem do app para contexto pessoal

### Critérios de aceitação
- todo registro é armazenado/consumido como transação
- o tipo da transação é obrigatório
- o módulo da transação é visível na listagem e no filtro
- o usuário consegue navegar entre os módulos principais sem perda de contexto

### Prioridade
Alta

---

## Epic 2 — Gestão de contas a pagar e contas a receber
### Objetivo
Permitir o cadastro, edição, remoção e visualização das movimentações pendentes, com foco em vencimentos e recebimentos esperados.

### Entregáveis
- tela de contas a pagar
- tela de contas a receber
- filtros por data, categoria, status e valor
- criação de transação de despesa e receita
- edição e exclusão de movimentações pendentes
- indicação de vencimento próximo e atrasado

### Critérios de aceitação
- o usuário consegue registrar uma despesa pendente em contas a pagar
- o usuário consegue registrar uma receita pendente em contas a receber
- o sistema exibe alertas/indicadores visuais para vencimento e atraso
- o usuário consegue filtrar as transações por período e categoria

### Prioridade
Alta

---

## Epic 3 — Gestão de contas pagas e contas recebidas
### Objetivo
Organizar o histórico de movimentações já concluídas e permitir análise de fluxo pessoal efetivamente liquidado.

### Entregáveis
- tela de contas pagas
- tela de contas recebidas
- informações de data de pagamento/recebimento
- exportação ou compartilhamento simples de histórico
- filtros por período e categoria

### Critérios de aceitação
- uma transação de despesa paga é movida corretamente para contas pagas
- uma transação de receita recebida é movida corretamente para contas recebidas
- o usuário consegue identificar o valor líquido e o histórico por período
- o sistema preserva o vínculo da transação original e sua evolução de status

### Prioridade
Alta

---

## Epic 4 — Dashboard financeiro pessoal
### Objetivo
Gerar uma visão rápida e útil do saldo, do fluxo de caixa e da situação atual do usuário.

### Entregáveis
- cards com saldo atual, receitas do mês, despesas do mês, próximos vencimentos
- gráficos de fluxo por período
- indicadores de receitas vs despesas
- painel de pendências e transações recentes
- resumos por categoria

### Critérios de aceitação
- o dashboard mostra informações baseadas em transações do usuário
- os valores refletem o status dos registros ativos e concluídos
- o usuário entende rapidamente se está em equilíbrio financeiro
- os principais indicadores se atualizam conforme a transação é alterada

### Prioridade
Alta

---

## Epic 5 — Relatórios e análise financeira
### Objetivo
Permitir análise qualitativa e quantitativa do comportamento financeiro pessoal.

### Entregáveis
- relatórios por mês
- comparação entre receitas e despesas
- análise por categoria
- acompanhamento de tendência de gastos
- visão de evolução do saldo ao longo do tempo

### Critérios de aceitação
- o usuário consegue visualizar registros por período
- o sistema agrupa valores por categoria e tipo
- os relatórios são legíveis e úteis para tomada de decisão
- há consistência entre dashboard, módulos e relatórios

### Prioridade
Média

---

## Epic 6 — Configuração, categorias e recorrência
### Objetivo
Ajustar a ferramenta para uso real no cotidiano e reduzir esforço manual no cadastro de movimentações.

### Entregáveis
- cadastro de categorias
- configuração de contas ou métodos de pagamento
- transações recorrentes
- lembretes de vencimento
- preferências visuais e filtros padrão

### Critérios de aceitação
- o usuário consegue criar categorias personalizadas
- o sistema suporta transações recorrentes
- a interface lembra ao usuário vencimentos próximos
- o usuário consegue ajustar configurações sem quebrar o fluxo principal

### Prioridade
Média

---

## Roadmap sugerido
### Fase 1 — MVP
- Epic 1
- Epic 2
- Epic 3
- Epic 4

### Fase 2 — Aprimoramento
- Epic 5
- Epic 6

## Matriz de prioridade
| Épico | Valor para o usuário | Complexidade | Prioridade |
|---|---:|---:|---:|
| Fundação do domínio | Alta | Média | Alta |
| Contas a pagar e receber | Alta | Média | Alta |
| Contas pagas e recebidas | Alta | Média | Alta |
| Dashboard financeiro | Alta | Média | Alta |
| Relatórios | Média | Média | Média |
| Configuração e recorrência | Média | Média | Média |

## Definição de sucesso do produto
O produto será considerado bem-sucedido quando o usuário conseguir:

- registrar transações de forma rápida
- diferenciar perfeitamente despesas e receitas
- visualizar pendências e movimentações concluídas em módulos separados
- controlar o saldo diário/ mensal sem esforço
- tomar decisões com base em relatórios simples e confiáveis

## Conclusão
A base atual do frontend é boa para sustentar o pivô. O principal trabalho agora é reorganizar o entendimento do produto em torno de transações pessoais e de módulos de controle financeiro, mantendo a identidade visual e o padrão de desenvolvimento já estabelecido.
