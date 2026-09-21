# Backlog do Epic 1 — Fundação do domínio e da estrutura do app

## Visão

O Epic 1 tem como objetivo estabelecer a base do produto para que todas as telas usem a mesma entidade: a transação. A partir disso, o app pode evoluir para o modelo de gestão financeira pessoal sem duplicar registros ou manter lógicas divergentes por módulo.

## Objetivo do épico

Estabelecer a base de dados, os modelos e a arquitetura da navegação para que todas as telas usem a mesma entidade transação.

## Prioridade

Alta

## Entregáveis do épico

- definição da entidade Transação
- enumeração de tipo: despesa/receita
- enumeração de status: pendente, pago, recebido, vencida, atrasada
- enumeração de módulo: contas a pagar, contas a receber, contas pagas, contas recebidas
- estrutura inicial de páginas e navegação do app
- atualização da linguagem do app para contexto pessoal

---

## Backlog de tarefas

| ID | Título | Prioridade | Estimativa | Dependência | Status |
|---|---|---:|---:|---|---|
| E1-01 | Definir o modelo de domínio da Transação | Alta | M | Nenhuma | Concluído |
| E1-02 | Definir enums de tipo, status e módulo | Alta | S | E1-01 | Concluído |
| E1-03 | Criar dados mockados de exemplo para validar o domínio | Alta | S | E1-01, E1-02 | Concluído |
| E1-04 | Estruturar navegação principal do app por módulos | Alta | M | E1-01, E1-02, E1-03 | Concluído |
| E1-05 | Ajustar a linguagem e a UX para contexto pessoal | Média | S | E1-04 | Concluído |
| E1-06 | Criar páginas base dos módulos principais | Alta | M | E1-03, E1-04, E1-05 | Concluído |
| E1-07 | Validar aceite do Epic 1 e preparar transição para o Epic 2 | Alta | S | E1-04, E1-05, E1-06 | Concluído |

---

## Detalhamento das tarefas

### E1-01 — Definir o modelo de domínio da Transação

**Descrição**

Definir a estrutura central da entidade transação e garantir que todos os registros do app sejam tratados como uma única base de dados de movimentações.

**Objetivo**

Padronizar a forma como despesas e receitas são armazenadas e exibidas em todas as telas.

**Critérios de aceite**

- a entidade transação contém os campos principais do domínio
- o registro de transação inclui descrição, valor, data e categoria
- o tipo da transação é obrigatório
- o status e o módulo são parte do modelo
- o mesmo registro pode ser visualizado em diferentes módulos sem duplicação de dados

**Observações**

- campo de módulo deve ser usado como visão contextual, não como entidade separada
- a implementação deve priorizar consistência e simplicidade de modelagem

**Estimativa**: M

---

### E1-02 — Definir enums de tipo, status e módulo

**Descrição**

Formalizar as categorias padrão que vão orientar o fluxo do app, filtros, regras de negócio e apresentação da interface.

**Objetivo**

Garantir consistência na classificação das movimentações.

**Enums propostos**

- Tipo: despesa, receita
- Status: pendente, pago, recebido, vencida, atrasada
- Módulo: contas a pagar, contas a receber, contas pagas, contas recebidas

**Critérios de aceite**

- os valores de enum são únicos e documentados
- o tipo da transação nunca fica vazio
- o status da transação está sempre em um valor válido
- o módulo aparece claramente na listagem e no filtro

**Estimativa**: S

---

### E1-03 — Criar dados mockados de exemplo para validar o domínio

**Descrição**

Construir um conjunto inicial de transações mockadas para simular o comportamento real do fluxo financeiro pessoal e validar o modelo antes da evolução das telas.

**Objetivo**

Validar a estrutura do domínio com cenários reais de uso.

**Critérios de aceite**

- existem exemplos de despesa pendente, receita pendente, despesa paga e receita recebida
- os registros representam corretamente a lógica de módulo e status
- os dados são usados para alimentar as telas iniciais
- a mesma transação pode ser visualizada de acordo com o módulo de contexto

**Estimativa**: S

---

### E1-04 — Estruturar navegação principal do app por módulos

**Descrição**

Definir a arquitetura de navegação do app, com foco nos módulos principais e na manutenção do contexto do usuário.

**Objetivo**

Permitir que o usuário transite entre contas a pagar, contas a receber, contas pagas, contas recebidas e dashboard sem perder clareza do fluxo.

**Critérios de aceite**

- a navegação principal inclui dashboard e módulos financeiros essenciais
- cada módulo está acessível e tem nome consistente com o domínio pessoal
- o layout preserva a identidade visual atual do app
- o usuário entende a separação entre módulos e a visão geral do sistema

**Estimativa**: M

---

### E1-05 — Ajustar a linguagem e a UX para contexto pessoal

**Descrição**

Atualizar os textos da aplicação para refletir a realidade do uso pessoal de finanças, removendo referências institucionais e ajustando o vocabulário ao cotidiano do usuário.

**Objetivo**

Aumentar clareza, familiaridade e aderência ao produto de finanças pessoais.

**Critérios de aceite**

- os nomes e textos refletem gestão pessoal do orçamento
- os módulos têm linguagem simples e intuitiva
- filtros e rótulos ajudam o usuário a entender pendências, vencimentos e saldos
- a interface continua consistente com a identidade visual existente

**Estimativa**: S

---

### E1-06 — Criar páginas base dos módulos principais

**Descrição**

Implementar a base de cada módulo principal com a mesma estrutura de listagem, filtros e dados do domínio do app.

**Objetivo**

Preparar as telas que serão expandidas nos próximos épicos sem duplicação de arquitetura.

**Módulos base**

- contas a pagar
- contas a receber
- contas pagas
- contas recebidas

**Critérios de aceite**

- todas as páginas usam a mesma entidade transação
- cada módulo exibe apenas as informações relevantes ao contexto
- os filtros e a listagem seguem o mesmo padrão visual e lógico
- o sistema consegue evoluir para cadastro, edição e exclusão sem refatoração estrutural grande

**Estimativa**: M

---

### E1-07 — Validar aceite do Epic 1 e preparar transição para o Epic 2

**Descrição**

Conferir a base criada e confirmar se o app está pronto para avançar para a gestão de contas pendentes e movimentações ativas.

**Objetivo**

Garantir que o domínio e a navegação estejam estáveis antes do início do Epic 2.

**Critérios de aceite**

- todo registro é consumido como transação
- o tipo da transação é obrigatório
- o módulo da transação é visível na listagem e no filtro
- o usuário consegue navegar entre os módulos principais sem perda de contexto
- os critérios de negócio do épico estão atendidos

**Estimativa**: S

---

## Definição de pronto do Epic 1

O Epic 1 pode ser considerado pronto quando:

- a transação é a entidade principal do app
- enums e regras de domínio foram definidos e usados na UI
- a navegação principal está funcional e consistente
- a linguagem foi ajustada para o contexto pessoal
- as páginas base dos módulos existem e seguem o modelo comum

## Dependências de saída

O Epic 2 deve começar somente depois que o Epic 1 estiver validado e o domínio estiver estável.

---

## Observação de arquitetura

A implementação deve seguir a recomendação do FrontExpert: priorizar uma solução simples, correta e reutilizável em Next.js + TypeScript, com estrutura clara de componentes, navegação consistente e foco em manutenção da base de domínio em vez de duplicação de módulos.
