# Features do Produto

Este documento separa o que está implementado hoje do que está no backlog.

## Implementado

### Gameplay e combate

- Arena com duelos em tempo real
- Motor de combate com buffs/debuffs e resolução no backend
- Progressão de carta por níveis
- Sistema de habilidades abrangente com alta cobertura de testes

### Mão do Jogador e economia

- Cartas nível 6 vão para a Mão do Jogador
- `GET /api/champions/hand` para listar cartas disponíveis
- `POST /api/champions/:id/return-to-combat` para voltar à fila
- `POST /api/champions/:id/sell` para vender carta com 100% do valor acumulado
- `POST /api/champions/withdraw` para saque com taxa de 10%

### Pagamentos e compliance operacional

- Fluxo de depósito PIX com integração Asaas + modo demo
- Auditoria de pagamentos e endpoints de monitoramento
- Idempotência de confirmação de pagamento para evitar crédito duplicado

### Social e moderação

- Chat global via WebSocket
- Rate limit por jogador/sessão
- Comandos de moderação do Game Master (`/mod mute`, `/mod unmute`, `/mod kick`, `/mod clear`)

### Plataforma técnica

- API REST em Express com organização por rotas e serviços
- Persistência em MySQL
- Comunicação em tempo real com `ws`
- Testes automatizados cobrindo backend e frontend

## Indicadores técnicos atuais

- 538 testes passando
- `PixService.js` com cobertura elevada após hardening
- `websocket_manager.js` com cobertura elevada após ciclo de estabilidade

## Backlog próximo

- Torneios e modo espectador
- Melhorias adicionais de branch coverage no WebSocket
- Evolução de telemetria pública de produto (dashboards)
- Novas superfícies sociais (amizades/desafios diretos)
