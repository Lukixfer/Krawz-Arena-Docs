# 🪦 Fluxo do Cemitério e Ressurreição de Cartas

## O que mudou?

- Não existe mais rito automático de ressurreição.
- Cartas derrotadas (“mortas”) só podem voltar ao jogo se forem compradas explicitamente do cemitério pelo jogador.
- O reset de níveis foi realizado: todas as cartas estão no nível 1.

## Como funciona o cemitério?

- Quando uma carta é derrotada em duelo, seu status vira `derrotado` e ela vai para o cemitério.
- O cemitério é acessível via `/api/cemetery` (backend) e pela interface do jogo (frontend).
- O jogador pode visualizar todas as suas cartas mortas e optar por ressuscitar qualquer uma delas.

## Ressuscitar uma carta (compra do cemitério)

- **Custo:** 1 KK (Koinz).
- **Como fazer:** O jogador clica no botão “Ressuscitar” na interface do cemitério.
- **O que acontece:**
    - A carta volta ao nível 1.
    - Ela recebe +1 em um atributo permanente aleatório (atk, def, regen ou fúria).
    - O status da carta muda para `na_fila` (pronta para duelar novamente).
    - O saldo do jogador é debitado em 1 KK.
- **API envolvida:**
    - `POST /api/cemetery/buy/:id`
    - Serviço: `CemeteryService.reencarnarCampeao(jogadorId, campeaoId)`

## Restrições e mensagens de erro

- Não é possível ressuscitar cartas que:
    - Não pertencem ao jogador.
    - Não estão mortas (`status` diferente de `derrotado`).
    - O jogador não tem saldo suficiente.
- Mensagens de erro são retornadas pela API e exibidas na interface.

## Fluxo técnico resumido

**Backend:**

- Rota `/api/cemetery` lista cartas mortas do jogador.
- Rota `/api/cemetery/buy/:id` executa a reencarnação (transação atômica).
- Serviço `CemeteryService` centraliza a lógica e garante integridade.

**Frontend:**

- Função `getCemetery(token)` busca as cartas mortas.
- Função `buyFromCemetery(id, token)` executa a compra/ressurreição.
- Interface exibe botão “Ressuscitar” e feedback visual.

## Referências de código

- Backend:
    - src/services/CemeteryService.js
    - src/api/routes/cemetery_routes.js
- Frontend:
    - public/api.js
    - public/main.js
    - public/html_forge.js
- Testes:
    - **tests**/cemetery_routes.test.js
    - **tests**/CemeteryService.test.js

## Observações

- Não existe mais qualquer lógica de ressurreição automática, nem timers ocultos.
- O único caminho para ressuscitar cartas é via compra manual no cemitério.
- O fluxo está coberto por testes automatizados.
