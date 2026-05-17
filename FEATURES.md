# Features do Produto

Este documento separa o que está implementado hoje do que está no backlog.

## Implementado

### Gameplay e combate

- Arena com duelos em tempo real (Coliseu — sala única global)
- Motor de combate com buffs/debuffs e resolução no backend
- 38+ habilidades únicas: buffs, sangramento, fúria, voo, regeneração, **ressurreição**
- Progressão de carta por níveis (Lv1 a Lv6) com valor exponencial `V(n) = 2^(n-1)` KK
- Coluna `total_ressurreicoes` em campeões para rastrear ressurreições em batalha
- Estatísticas de matchmaking em `matchmaking_stats`

### Mão do Jogador e progressão

- Cartas nível 6 vão automaticamente para a Mão do Jogador
- `GET /api/champions/hand` para listar cartas disponíveis
- `POST /api/champions/:id/return-to-combat` para voltar à fila
- `POST /api/champions/:id/sell` para vender carta com 100% do valor acumulado

### Cemitério e Ressurreição

- Cartas derrotadas ficam no cemitério com status `derrotado`
- `GET /api/cemetery` para listar cartas do jogador no cemitério
- `POST /api/cemetery/buy/:id` para ressuscitar uma carta (custo: 1 KK)
- Ressurreição restaura a carta ao Lv1 com +1 em atributo permanente aleatório

### Pagamentos e compliance operacional

- **Depósito PIX**: taxa 1 BRL = 1 KK, mínimo 5 BRL, modo demo (dev) e integração real Asaas
- `POST /api/payments/pix/deposito` para gerar cobrança PIX
- `POST /api/payments/pix/webhook` para confirmação automática de pagamento
- Idempotência de confirmação de pagamento para evitar crédito duplicado
- Auditoria completa em `audit_pagamentos` com IP, user-agent e referência externa
- `POST /api/champions/withdraw` para saque PIX com fee de 10%
- `GET /api/champions/withdraw/history` para histórico de saques

### Programa de Afiliados

- Link de referral exclusivo por jogador: `GET /api/players/r/:apelido`
- Comissão de 5% sobre saques para o afiliado que indicou o jogador
- Tabela `transacoes_comissao_afiliado` para auditoria das comissões
- `GET /api/players/me/afiliados` para listar indicados do jogador

### Torneira — Ad Faucet

- Jogadores ganham KK visualizando anúncios pelo tempo mínimo configurado
- Campanhas de jogadores com orçamento próprio em KK e moderação administrativa
- Campanhas YouTube com embed verificado
- Postback S2S de provedores externos (A-ADS, Adsterra) com validação por segredo
- Cap diário, cooldown e rate limit de claims configuráveis por variável de ambiente
- Rotas:
    - `GET /api/torneira/ads` — lista anúncios disponíveis
    - `GET /api/torneira/stats` — estatísticas diárias do jogador
    - `POST /api/torneira/claim` — registra visualização e credita KK
    - `GET /api/torneira/campaigns/mine` — campanhas do jogador
    - `POST /api/torneira/campaigns/youtube` — criar campanha YouTube
    - `GET /api/torneira/postback/:provider` — callback S2S das redes

### Social e moderação

- Chat global via WebSocket com histórico persistido em memória
- Rate limit por jogador/sessão
- Comandos de moderação do Game Master (`/mod mute`, `/mod unmute`, `/mod kick`, `/mod clear`)

### Leaderboard

- Ranking por desempenho de cartas: nível, vitórias, derrotas e dano total
- `GET /api/leaderboard` para o quadro de líderes atual

### Plataforma técnica

- API REST em Express com organização por rotas e serviços
- Persistência em MySQL
- Comunicação em tempo real com `ws`
- 64+ arquivos de testes automatizados cobrindo backend e frontend
- Autenticação Google OAuth exclusiva + JWT emitido pelo backend
- Helmet, CORS e rate limiting globais e por rota

## Indicadores técnicos atuais

- 64+ arquivos de teste
- `PixService.js`: 97.54% de cobertura
- `websocket_manager.js`: 86.87% de cobertura
- Torneira e Afiliados com suites de teste dedicadas

## Backlog próximo

- Torneios e modo espectador
- Melhorias adicionais de branch coverage no WebSocket
- Evolução de telemetria pública de produto (dashboards)
- Novas superfícies sociais (amizades/desafios diretos)
- Sistema de conquistas e progressão de jogador
