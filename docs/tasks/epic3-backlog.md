# Backlog do Epic 3 — Gestão de contas pagas e contas recebidas

## Visão

O Epic 3 concentra a fase de histórico financeiro: quando uma transação deixa de estar pendente e é liquidada, ela deve passar para um contexto de movimentação concluída, com destaque para pagamento/recebimento real, valor líquido e histórico por período.

## Status da implementação atual

### Já implementado no código

- As páginas de módulos concluídos existem e já estão expostas na navegação:
  - [src/app/contas-pagas/page.tsx](../../src/app/contas-pagas/page.tsx)
  - [src/app/contas-recebidas/page.tsx](../../src/app/contas-recebidas/page.tsx)
- A estrutura base de transação e seus módulos/status já está modelada em:
  - [src/types/transaction.ts](../../src/types/transaction.ts)
- Os dados iniciais de exemplo já incluem transações em módulos pagos/recebidos:
  - [src/data/transactions.ts](../../src/data/transactions.ts)
- A lógica reutilizável de métricas e listagem foi centralizada em:
  - [src/components/transaction-module-page.tsx](../../src/components/transaction-module-page.tsx)
  - [src/components/transaction-page.tsx](../../src/components/transaction-page.tsx)

### Ainda faltando para entrega completa do Epic 3

- fluxo real de transição de transação pendente para concluída
- data de pagamento/recebimento explícita e consistente
- vínculo preservado entre a transação original e seu status final
- filtros específicos para histórico por período e categoria
- exportação ou compartilhamento simples do histórico
- validação do valor líquido e do comportamento no módulo concluído

## Objetivo do épico

Permitir que o usuário acompanhe o histórico real de despesas e receitas já quitadas, veja a data de liquidação, compreenda o comportamento do fluxo concluído e continue com a mesma base de transação usada nos módulos pendentes.

## Prioridade

Alta

## Entregáveis do epic 3

- tela de contas pagas
- tela de contas recebidas
- informações de data de pagamento/recebimento
- exportação ou compartilhamento simples de histórico
- filtros por período e categoria
- transição correta de status entre módulo pendente e concluído

---

## Backlog de tarefas

| ID | Título | Prioridade | Estimativa | Dependência | Status |
|---|---|---:|---:|---|---|
| E3-01 | Definir o modelo de transição de pendente para concluído | Alta | M | E2-09 | Em andamento |
| E3-02 | Reaproveitar a arquitetura de módulo para contas pagas e recebidas | Alta | M | E3-01 | Parcialmente concluído |
| E3-03 | Implementar a tela de contas pagas com métricas e listagem | Alta | M | E3-02 | Parcialmente concluído |
| E3-04 | Implementar a tela de contas recebidas com métricas e listagem | Alta | M | E3-02 | Parcialmente concluído |
| E3-05 | Adicionar filtros por período, categoria e status no histórico | Alta | M | E3-03, E3-04 | Não iniciado |
| E3-06 | Criar fluxo de liquidação e movimentação para módulo concluído | Alta | M | E3-05 | Não iniciado |
| E3-07 | Exibir data de pagamento/recebimento e histórico no detalhe da transação | Alta | M | E3-06 | Não iniciado |
| E3-08 | Implementar exportação ou compartilhamento simples do histórico | Média | M | E3-05, E3-07 | Não iniciado |
| E3-09 | Validar critérios de aceite do Epic 3 e preparar entrega | Alta | S | E3-03, E3-04, E3-05, E3-06, E3-07, E3-08 | Não iniciado |

---

## Tarefas executáveis de desenvolvimento

### Fase 1 — Base do ciclo de vida da transação

#### DEV-E3-01 — Modelar a transição de status e data de liquidação

- Prioridade técnica: P0 (crítica)
- Arquivos principais: `src/types/transaction.ts`, `src/data/transactions.ts`
- Objetivo: garantir que uma transação siga um ciclo claro: pendente -> pago/recebido, preservando a identidade original e os dados de histórico.
- Implementação esperada:
  - reforçar a modelagem de `TransactionStatus` para refletir o estado final da movimentação
  - incluir campos de data de liquidação no modelo de transação e no payload de listagem
  - centralizar helpers para saber se uma transação está ativa ou concluída
  - manter o módulo como contexto de visualização e não como duplicação do registro
- Acceptance Criteria:
  - uma transação com status `pago` ou `recebido` continua sendo a mesma entidade da transação original
  - o valor permanece consistente e não é duplicado em outra estrutura
  - a data de pagamento/recebimento fica representada de forma explícita
  - os módulos `contas-pagas` e `contas-recebidas` usam a mesma entidade base que `contas-a-pagar` e `contas-a-receber`
- Dependências: E2-09

#### DEV-E3-02 — Centralizar regras de transição e cálculo de módulo concluído

- Prioridade técnica: P0 (crítica)
- Arquivos principais: `src/types/transaction.ts`, `src/components/transaction-module-page.tsx`, `src/components/transaction-page.tsx`
- Objetivo: remover regras espalhadas pela UI e criar helpers únicos para decidir se uma transação está pendente ou concluída.
- Implementação esperada:
  - criar helper para identificar `isCompletedTransaction` por módulo e tipo
  - ajustar `getModuleStatusOptions` para refletir status válidos do histórico concluído
  - reusar métricas de total, pendentes e concluídos em um único ponto de cálculo
  - preparar a base para que `TransactionPage` aceite dados de histórico sem quebrar o fluxo atual
- Acceptance Criteria:
  - a lógica de status final não fica duplicada entre páginas e componentes
  - o total e o resumo do módulo concluído são calculados a partir da mesma fonte de verdade
  - o componente aceita módulo de despesa e receita com comportamento distinto, mas sem duplicação de código
  - o fluxo de renderização continua funcionando para os módulos pendentes sem regressão
- Dependências: DEV-E3-01

### Fase 2 — Reuso e estrutura dos módulos concluídos

#### DEV-E3-03 — Adaptar o componente de módulo para contexto de histórico

- Prioridade técnica: P1 (alta)
- Arquivos principais: `src/components/transaction-module-page.tsx`
- Objetivo: ajustar o componente reutilizável para representar corretamente o histórico de contas pagas e recebidas sem perder a identidade visual dos módulos ativos.
- Implementação esperada:
  - permitir que o componente receba uma configuração específica para módulos concluídos
  - trocar rótulos e métricas quando o módulo for pago/recebido
  - corrigir cálculo de `pending` para considerar o status final sem confundir fluxo ativo e concluído
- Acceptance Criteria:
  - cada módulo concluído exibe métricas corretas para sua realidade financeira
  - o componente continua funcionando para módulos pendentes e concluídos
  - os textos de resumo e botão acompanham o contexto de pagamento ou recebimento
  - não há uso de dados estáticos que contradizem o status real da transação
- Dependências: DEV-E3-02

#### DEV-E3-04 — Ajustar a listagem e o detalhe para histórico de transações concluídas

- Prioridade técnica: P1 (alta)
- Arquivos principais: `src/components/transaction-page.tsx`, `src/app/contas-pagas/page.tsx`, `src/app/contas-recebidas/page.tsx`
- Objetivo: garantir que o detalhe da movimentação mostre a data de liquidação e os indicadores corretos do status final.
- Implementação esperada:
  - incluir campo de data de pagamento/recebimento no item exibido
  - garantir que o modal de detalhes tenha um texto específico para histórico concluído
  - manter o status em língua natural e sincronia com o modelo de transação
- Acceptance Criteria:
  - a data de liquidação aparece na listagem e no detalhe da transação
  - o usuário consegue diferenciar status final e status pendente no mesmo componente
  - o item de detalhe continua permitindo edição e exclusão sem quebrar o fluxo
  - os módulos concluídos passam a refletir o histórico real da transação
- Dependências: DEV-E3-03

#### DEV-E3-05 — Validar a base do Epic 3 antes de seguir para os próximos incrementos

- Prioridade técnica: P2 (média)
- Arquivos principais: todos citados acima
- Objetivo: confirmar que a arquitetura e o fluxo do histórico já estão estáveis antes de avançar para filtros avançados, exportação e refinamento do histórico.
- Implementação esperada:
  - verificar a renderização das páginas de contas pagas e recebidas
  - validar os cálculos de total e status em dados locais
  - confirmar ausência de regressões nos módulos ativos de contas a pagar e a receber
- Acceptance Criteria:
  - as telas concluídas renderizam sem inconsistência visual
  - o componente de módulo continua compatível com pendentes e concluídos
  - a base de regras da transação está pronta para receber filtros, exportação e refinamento de histórico
  - a equipe pode seguir para as próximas tarefas do Epic 3 sem retrabalho de arquitetura
- Dependências: DEV-E3-04

---

## Detalhamento das tarefas

### E3-01 — Definir o modelo de transição de pendente para concluído

**Descrição**

Definir como a transação evolui de um status ativo para um status liquidado sem perder o vínculo com o histórico e sem duplicar entidades.

**Objetivo**

Garantir que o módulo concluído reflita o mesmo registro financeiro, apenas em outro estágio de fluxo.

**Decisão técnica recomendada**

- manter a transação como entidade central
- representar a liquidação por `status` e `date` de pagamento/recebimento
- permitir a mudança de módulo sem criar uma cópia independente do registro
- usar o mesmo componente de listagem e detalhe para manter consistência

**Critérios de aceite**

- o mesmo registro pode ser visualizado em módulo pendente e em módulo concluído conforme o status
- a transação preserva dados originais como categoria, conta, valor e descrição
- a data de liquidação fica registrada no contexto do status final
- o modelo funciona tanto para despesa quanto para receita

**Estimativa**: M

---

### E3-02 — Reaproveitar a arquitetura de módulo para contas pagas e recebidas

**Descrição**

Aproveitar a base já criada para telas de módulo financeiro e adaptar o componente para o histórico de movimentações concluídas.

**Objetivo**

Manter consistência de UX e reduzir duplicação de Código entre os módulos do app.

**Observações de implementação atual**

A reutilização já existe em [src/components/transaction-module-page.tsx](../../src/components/transaction-module-page.tsx) e nas páginas [src/app/contas-pagas/page.tsx](../../src/app/contas-pagas/page.tsx) e [src/app/contas-recebidas/page.tsx](../../src/app/contas-recebidas/page.tsx), porém ainda falta a lógica de histórico real, não apenas a UI de resumo com dados estáticos.

**Critérios de aceite**

- duas telas usam a mesma base de composição com variações por módulo
- a lógica de totais, filtros e resumo é reutilizada
- o componente aceita a diferença entre histórico de pagamento e recebimento com clareza
- a UI continua consistente com o padrão dos módulos ativos

**Estimativa**: M

---

### E3-03 — Implementar a tela de contas pagas com métricas e listagem

**Descrição**

Construir a visão de despesas liquidadas e exibir métricas relevantes para o usuário monitorar o volume de pagamentos concluídos.

**Objetivo**

Organizar o histórico de pagamentos por categoria, período e valor real da saída.

**Critérios de aceite**

- a página mostra despesas cujo status final seja pago
- o usuário vê total pago, histórico por categoria e movimentações do período
- o valor é acompanhado pela data de pagamento
- a listagem mantém o mesmo padrão visual da tela de contas a pagar

**Estimativa**: M

---

### E3-04 — Implementar a tela de contas recebidas com métricas e listagem

**Descrição**

Construir a visão de receitas recebidas e apresentar os indicadores de fluxo concluído ao usuário.

**Objetivo**

Permitir acompanhamento do histórico de entradas efetivamente recebidas.

**Critérios de aceite**

- a página mostra receitas cujo status final seja recebido
- o usuário consegue visualizar total recebido e distribuição por categoria
- a data de recebimento aparece claramente na listagem e no detalhe
- a tela segue o mesmo padrão visual da tela de contas pagas

**Estimativa**: M

---

### E3-05 — Adicionar filtros por período, categoria e status no histórico

**Descrição**

Permitir que o usuário filtre a listagem conclúida por intervalo temporal, categoria e status do histórico.

**Objetivo**

Ajudar na leitura do fluxo efetivamente liquidado com foco em análise de período, categoria e situação da transação.

**Filtros propostos**

- período: mês atual, últimos 30 dias, próximo período ou intervalo customizado
- categoria
- status final: pago/recebido
- valor mínimo e máximo

**Critérios de aceite**

- os filtros funcionam em contas pagas e contas recebidas
- a listagem atualiza automaticamente sem recarregar a página
- a combinação dos filtros respeita o domínio da transação
- o usuário identifica rapidamente o que foi liquidado em um intervalo desejado

**Estimativa**: M

---

### E3-06 — Criar fluxo de liquidação e movimentação para módulo concluído

**Descrição**

Adicionar o mecanismo de atualização de status da transação ao ser paga ou recebida, deslocando a transação para o módulo histórico correto.

**Objetivo**

Concluir o ciclo de vida da movimentação sem quebrar a consistência do domínio da transação.

**Fluxo proposto**

- usuário marca uma pendência como paga/recebida
- a transação recebe data de liquidação
- o módulo de origem deixa de exibir a movimentação no fluxo ativo
- a transação passa para o módulo concluído correspondente

**Critérios de aceite**

- uma despesa pendente pode ser movida para contas pagas
- uma receita pendente pode ser movida para contas recebidas
- o status final e a data de liquidação ficam persistidos corretamente
- a transação mantêm seu relacionamento original e histórico de evolução

**Estimativa**: M

---

### E3-07 — Exibir data de pagamento/recebimento e histórico no detalhe da transação

**Descrição**

Ampliar o modal ou painel de detalhes para incluir data de liquidação, valor líquido e qualquer informação relevante da evolução do registro.

**Objetivo**

Dar ao usuário contexto do que foi realmente pago/recebido e quando isso ocorreu.

**Critérios de aceite**

- o detalhe da transação exibe a data de pagamento ou recebimento
- o usuário consegue distinguir valor original, valor líquido e status final
- o histórico da transação permanece consistente para o módulo concluído
- a informação aparece tanto em visualização quanto em edição

**Estimativa**: M

---

### E3-08 — Implementar exportação ou compartilhamento simples do histórico

**Descrição**

Adicionar uma ação de exportação ou compartilhamento para facilitar a consolidação do histórico financeiro em relatórios simples.

**Objetivo**

Dar ao usuário uma forma simples de usar o histórico fora da interface do app sem exigir infraestrutura complexa.

**Sugestões viáveis**

- exportar CSV do módulo histórico
- gerar texto resumido por período
- compartilhar resumo com cópia em memória para uso externo

**Critérios de aceite**

- o usuário consegue exportar o histórico filtrado
- o arquivo ou conteúdo inclui dados relevantes da transação
- a funcionalidade funciona para contas pagas e contas recebidas
- a geração do arquivo é simples e facilmente compreensível

**Estimativa**: M

---

### E3-09 — Validar critérios de aceite do Epic 3 e preparar entrega

**Descrição**

Conferir se todas as entregas do Epic 3 atendem ao problema do usuário, ao modelo de transação e à usabilidade da interface de histórico financeiro.

**Objetivo**

Garantir que o app está pronto para demonstrar o comportamento real de movimentações concluídas e entregá-lo com consistência.

**Critérios de aceite**

- o usuário consegue distinguir histórico de pagamento e recebimento
- a transação concluída guarda vínculo com o registro original
- os filtros e métricas do histórico funcionam sem inconsistência
- a data de pagamento/recebimento e o valor líquido são legíveis
- a entrega do Epic 3 está pronta para validação em ambiente real

**Estimativa**: S

---

## Observações finais

O código atual já entrega a base visual e a arquitetura de reutilização dos módulos de contas pagas e recebidas. O que ainda falta não é a estrutura inicial, e sim a lógica de negócio e a experiência de histórico real: transição de status, data de liquidação e validação do fluxo concluído.

Essa separação deixa o Epic 3 em um caminho mais objetivo: primeiro fechar a regra de transição do fluxo financeiro, depois refinar a análise e a exportação do histórico.
