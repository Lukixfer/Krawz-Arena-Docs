# Arquitetura do Krawz Arena

O sistema é construído como uma aplicação monolítica escalável em Node.js, com frontend Vanilla JS e geração de arte sob demanda via IA (ComfyUI).

## 1. Visão Geral da Stack

- **Backend:** Node.js + Express.js (REST HTTP) + WebSocket (`ws`)
- **Persistência:** MySQL (`mysql2`) com pool de conexões — consistência garantida por transações e `SELECT … FOR UPDATE` em operações financeiras
- **Frontend:** Vanilla JS servido de `public/` — zero frameworks, performance máxima no cliente
- **Geração de Arte por IA:** ComfyUI (local) integrado por `image_weaver.js`; imagens publicadas via Cloudinary
- **Autenticação:** Google OAuth 2.0 exclusivo; backend emite JWT após verificar o token Google

## 2. Estrutura de Módulos

```
src/
├── api/
│   ├── middleware/        # auth, rate limiting, response formatter
│   └── routes/            # admin, auth, cemetery, champions, duels,
│                          # leaderboard, monitor, payments, players,
│                          # public, torneira
├── arena/
│   ├── arena_orchestrator.js   # controle do ciclo de duelos
│   ├── buff_manager.js         # aplica/expira buffs
│   ├── combat_engine.js        # resolução de turnos
│   ├── duel_manager.js         # gestão de filas e pareamento
│   ├── duel_preparator.js      # setup pré-duelo
│   ├── duel_resolver.js        # pós-duelo: evolução, nível 6, cemitério
│   ├── duel_state.js           # estado imutável via updateDueloState
│   ├── forja_manager.js        # orquestra geração de imagem IA
│   ├── game_logic.js           # regras alquímicas e fórmulas
│   └── skill_registry.js       # registro de 38+ habilidades
├── db/database.js              # pool MySQL singleton
├── habilidades/                # implementação de cada habilidade
├── realtime/websocket_manager.js  # hub WS: chat, arena broadcast
├── services/
│   ├── CemeteryService.js      # ressurreição e cemitério
│   ├── ChampionService.js      # venda, afiliados, comissões
│   ├── DuelService.js          # histórico e consultas de duelo
│   ├── LeaderboardService.js   # ranking por cartas
│   ├── PixService.js           # depósito PIX (Asaas / demo)
│   ├── PlayerService.js        # saldo, perfil, referral
│   └── TorneiraService.js      # faucet, claims, campanhas
└── utils/
    ├── image_weaver.js         # interface ComfyUI → Cloudinary
    └── swagger.js
```

## 3. Paradigmas Obrigatórios

### Imutabilidade de Estado de Duelo

Nenhuma propriedade do estado de duelo é mutada diretamente. O fluxo obrigatório é:

```js
const changed = duelState.updateDueloState(updates);  // 1. valida e mescla
buffManager.forcarAplicacao();                          // 2. aplica buffs persistentes
if (changed) websocketManager.broadcastUpdate();        // 3. broadcast para clientes
```

### Segurança Financeira

Todas as operações de crédito/débito críticas (venda, saque, comissão de afiliado, claim de torneira) executam dentro de transações MySQL com `SELECT … FOR UPDATE` para prevenir race conditions e double-spend.

### Frontend — Autoridade de Animação

`fx_engine.js` é o único ponto de controle de animações de HP e indicadores visuais:

```js
import * as fx from './fx_engine.js';
fx.animateHP(elemento, valorInicial, valorFinal, 350);
```

Sistema Anti-Flicker garante atualizações sem "flash" via atributo `data-rendering-in-progress` e classes de estado (`flip-permitida`, `is-flipped`, `front-locked`).

## 4. Aliases de Importação (Backend)

| Alias    | Caminho real      |
| -------- | ----------------- |
| `@api`   | `src/api`         |
| `@arena` | `src/arena`       |
| `@db`    | `src/db`          |
| `@ws`    | `src/realtime`    |
| `@svc`   | `src/services`    |
| `@utils` | `src/utils`       |
| `@hab`   | `src/habilidades` |

## 5. Deploy de Referência

```
Navegador
    ↕ HTTPS / WSS
GitHub Pages (Frontend — Vanilla JS)
    ↕ REST / WebSocket
Render / VPS (Backend — Node.js)
    ↕ MySQL TCP
PlanetScale / Render DB / MySQL local
```

Para desenvolvimento local com backend próprio e frontend público, use o túnel Cloudflare (`npm run cloudflare`).