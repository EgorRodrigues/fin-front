# Backlog do Epic 2 — Gestão de contas a pagar e contas a receber

## Visão

O Epic 2 foca na gestão das movimentações ativas do fluxo financeiro pessoal: contas a pagar e contas a receber. A ideia principal é manter a consistência do domínio em uma única entidade de transação, mas apresentar a visão correta para cada contexto de cobrança e pagamento.

## Objetivo do épico

Permitir que o usuário cadastre, edite, visualize e filtre transações pendentes de forma clara, com destaque para vencimento, atraso e organização por módulo.

## Prioridade

Alta

## Entregáveis do épico

- tela de contas a pagar
- tela de contas a receber
- filtros por data, categoria, status e valor
- criação de transação de despesa e receita
- edição e exclusão de movimentações pendentes
- indicação de vencimento próximo e atrasado

---

## Backlog de tarefas

| ID | Título | Prioridade | Estimativa | Dependência | Status |
|---|---|---:|---:|---|---|
| E2-01 | Definir a arquitetura de telas por módulo de pendência | Alta | M | E1-06 | Em andamento |
| E2-02 | Reaproveitar a base de componente de módulo para contas a pagar e receber | Alta | M | E2-01 | Planejado |
| E2-03 | Implementar a tela de contas a pagar com dados e métricas | Alta | M | E2-02 | Planejado |
| E2-04 | Implementar a tela de contas a receber com dados e métricas | Alta | M | E2-02 | Planejado |
| E2-05 | Adicionar filtros por período, categoria, status e valor | Alta | M | E2-03, E2-04 | Planejado |
| E2-06 | Criar fluxo de cadastro de transação para despesa e receita | Alta | M | E2-05 | Planejado |
| E2-07 | Implementar edição e remoção de movimentações pendentes | Alta | M | E2-06 | Planejado |
| E2-08 | Exibir indicadores de vencimento próximo e em atraso | Alta | M | E2-03, E2-04 | Planejado |
| E2-09 | Validar critérios de aceite do Epic 2 e preparar transição para o Epic 3 | Alta | S | E2-03, E2-04, E2-05, E2-06, E2-07, E2-08 | Planejado |

---

## Detalhamento das tarefas

### E2-01 — Definir a arquitetura de telas por módulo de pendência

**Descrição**

Definir como as telas de pendências serão estruturadas para manter consistência entre contas a pagar e contas a receber, evitando duplicação de regras e mantendo a mesma entidade transação em todo o fluxo.

**Objetivo**

Padronizar a estrutura de visualização de módulos ativos sem perder clareza do contexto financeiro pessoal.

**Refinamento inicial**

A arquitetura foi centralizada em um único registro de configuração por módulo para manter a entidade de transação como base, enquanto o módulo define o contexto visual e as regras de status. A reutilização do componente genérico fica como ponto de entrada comum para pendências de despesa e receita.

**Critérios de aceite**

- a arquitetura mantém a entidade transação como base para todas as telas
- o módulo define a visão contextual, não um modelo diferente de dados
- as telas seguem o mesmo padrão de layout, métricas e listagem
- o fluxo é reutilizável para despesas e receitas pendentes

**Estimativa**: M

---

### E2-02 — Reaproveitar a base de componente de módulo para contas a pagar e receber

**Descrição**

Aproveitar o componente base já definido para páginas de módulo financeiro e adaptá-lo ao comportamento de pendências, sem criar estruturas paralelas para cada tela.

**Objetivo**

Reutilizar a solução para evitar duplicação e facilitar manutenção do dashboard de módulo.

**Decisão técnica**

- manter `TransactionModulePage` como ponto central de composição
- tratar a lógica de total, pendentes e concluídos por tipo de módulo
- separar métricas e resumo da página de listagem para reduzir acoplamento
- preferir um único fluxo de rendering, com variações por módulo

**Critérios de aceite**

- o componente de módulo aceita o módulo atual e exibe métricas acordes ao contexto
- o mesmo componente serve para despesa e receita pendente
- a lógica de status e cálculo de totais permanece centralizada
- a UI continua consistente entre as telas

**Estimativa**: M

---

### E2-03 — Implementar a tela de contas a pagar com dados e métricas

**Descrição**

Construir a visão de contas a pagar com foco em despesas pendentes, valores por vencer, vencidas e status de pagamento.

**Objetivo**

Dar ao usuário uma visão clara do que precisa ser quitado e do impacto financeiro do período.

**Critérios de aceite**

- a página lista transações de despesa com módulo de contas a pagar
- são exibidos cards de valor total, pendentes e pagas
- a listagem mostra categoria, data, valor e status
- o usuário consegue identificar rapidamente as despesas vencidas ou próximas do vencimento

**Estimativa**: M

---

### E2-04 — Implementar a tela de contas a receber com dados e métricas

**Descrição**

Construir a visão de contas a receber com foco em receitas pendentes e pagamentos esperados.

**Objetivo**

Permitir o acompanhamento do fluxo de entradas futuras e facilitar a previsão de caixa.

**Critérios de aceite**

- a página lista transações de receita com módulo de contas a receber
- os indicadores refletem total em recebimento, pendentes e recebidas
- o usuário consegue distinguir receitas em atraso e recebidas no período
- a mesma estrutura visual da tela de contas a pagar é mantida para consistência

**Estimativa**: M

---

### E2-05 — Adicionar filtros por período, categoria, status e valor

**Descrição**

Implementar mecanismos de filtragem para facilitar a busca e a análise das transações pendentes em cada módulo.

**Objetivo**

Ajudar o usuário a localizar despesas e receitas por contexto de uso real, sem sobrecarregar a interface.

**Filtros propostos**

- período (mês, intervalo ou data específica)
- categoria
- status (pendente, vencida, atrasada, pago/recebido quando aplicável)
- valor mínimo e/ou máximo

**Critérios de aceite**

- os filtros funcionam em ambos os módulos
- a interface atualiza a listagem sem recarregar a página
- a combinação de filtros respeita o domínio da transação
- a lista continua legível mesmo com múltiplos critérios ativos

**Estimativa**: M

---

### E2-06 — Criar fluxo de cadastro de transação para despesa e receita

**Descrição**

Permitir que o usuário registre novas movimentações como transações, com tipo e módulo definidos de acordo com o contexto da operação.

**Objetivo**

Aumentar a praticidade de uso do app para criar pendências e recebimentos sem duplicar regras na interface.

**Fluxo de cadastro**

- seleção de tipo: despesa ou receita
- definição de módulo: pagar ou receber
- preenchimento de descrição, categoria, valor, data e status
- opcionalmente anexar conta e observações

**Critérios de aceite**

- o usuário consegue cadastrar uma despesa pendente em contas a pagar
- o usuário consegue cadastrar uma receita pendente em contas a receber
- o cadastro respeita o modelo de transação já definido
- a transação criada aparece imediatamente na listagem correta do módulo

**Estimativa**: M

---

### E2-07 — Implementar edição e remoção de movimentações pendentes

**Descrição**

Adicionar ações de atualização e exclusão para transações pendentes, permitindo ajustes rápidos após a criação ou ao surgir mudanças de calendário financeiro.

**Objetivo**

Garantir controle real do fluxo sem exigir que o usuário recomece o processo manualmente.

**Critérios de aceite**

- o usuário consegue alterar valor, data, categoria e status de uma transação pendente
- a edição preserva o vínculo da transação e mantém a consistência do módulo
- a remoção remove corretamente a movimentação da listagem ativa
- a ação de editar ou excluir está acessível e com feedback visual

**Estimativa**: M

---

### E2-08 — Exibir indicadores de vencimento próximo e em atraso

**Descrição**

Adicionar alertas visuais para ajudar o usuário a perceber vencimentos e atrasos antes que a situação se agrave.

**Objetivo**

Transformar a triagem de pendências em uma experiência mais do dia a dia, com foco em ações urgentes.

**Indicadores propostos**

- próximo do vencimento
- vencido
- atrasado
- resumo de dias pendentes

**Critérios de aceite**

- a interface destaca transações pendentes próximas do vencimento
- transações vencidas aparecem com prioridade visual
- o status da transação é refletido na UI de forma consistente
- os indicadores ajudam na compreensão do fluxo sem exigirem leitura completa da lista

**Estimativa**: M

---

### E2-09 — Validar critérios de aceite do Epic 2 e preparar transição para o Epic 3

**Descrição**

Conferir se todas as entregas do epic 2 atendem ao modelo de produto, ao domínio em transações e à experiência do usuário em gerenciamento de pendências.

**Objetivo**

Garantir que o app está estável para seguir para a fase de histórico de contas pagas e recebidas.

**Critérios de aceite**

- o usuário consegue registrar despesas e receitas pendentes
- o sistema exibe alertas e indicadores visuais para vencimento e atraso
- o usuário consegue filtrar transações por período, categoria e status
- a navegação entre módulo de pagar e receber é clara e consistente
- os critérios do Epic 2 foram validados antes da transição

**Estimativa**: S

---

## Definição de pronto do Epic 2

O Epic 2 pode ser considerado pronto quando:

- as telas de contas a pagar e receber estão funcionando com base em transações
- os filtros por período, categoria, status e valor estão operando corretamente
- o cadastro, a edição e a exclusão das movimentações pendentes estão implementados
- a interface comunica claramente vencimentos e atrasos
- a base do domínio e da UX estão estáveis para o próximo epic

## Dependências de saída

O Epic 3 deve começar somente depois que o usuário puder:

- registrar transações pendentes sem ambiguidade
- diferenciar módulo, tipo e status claramente
- entender o estado financeiro atual com base em pendências e alertas visuais

## Observação de arquitetura

A implementação deve seguir o padrão recomendado pelo FrontExpert: usar Next.js + TypeScript com componentes reutilizáveis, estados bem definidos e foco em consistência de domínio. A solução mais adequada para este épico é continuar centralizando as regras de negócio e apresentação em torno da entidade `Transação`, com a UI adaptando a visão por módulo conforme a necessidade do usuário.
