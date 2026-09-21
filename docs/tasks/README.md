# Backlog de tarefas

Este diretório reúne os artefatos do backlog para o pivô do app de finanças pessoais.

## Epic em foco

- Título: Gestão de contas a pagar e contas a receber
- Prioridade: Alta
- Status: Planejado

## Artefatos

- [epic1-backlog.md](./epic1-backlog.md) — backlog completo do Epic 1, com domínio, navegação e base estrutural do app
- [epic2-backlog.md](./epic2-backlog.md) — backlog completo do Epic 2, com tarefas de contas a pagar e a receber

## Ordem recomendada de execução

1. Validar a base do domínio e a navegação criadas no Epic 1
2. Implementar a estrutura de módulos de pendências no app
3. Construir a tela de contas a pagar
4. Construir a tela de contas a receber
5. Adicionar filtros por período, categoria, status e valor
6. Criar fluxo de cadastro, edição e exclusão de transações pendentes
7. Exibir alertas de vencimento e atraso
8. Validar atendimento dos critérios do Epic 2 antes de avançar para o Epic 3

## Critério de entrada para o Epic 2

O Epic 2 só deve iniciar quando:

- todas as transações forem tratadas como uma única entidade
- os enums de tipo, status e módulo estiverem estáveis
- a navegação principal estiver funcional
- as páginas base dos módulos estiverem consistentes com o modelo

## Critério de saída do Epic 2

O Epic 2 pode ser concluído quando:

- contas a pagar e contas a receber estiverem funcionando como fluxos de transações pendentes
- o usuário puder registrar, editar e excluir movimentações ativas
- os filtros e indicadores de vencimento/atraso estiverem funcionalmente validados
- o app estiver pronto para dar início ao Epic 3 de histórico e conclusão de movimentações
