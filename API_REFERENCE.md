# 📖 API Reference - Krawz Arena

A API do Krawz Arena é dividida em duas frentes principais:

1. **REST API**: Para autenticação, criação de perfis, campeões, economia e histórico de duelos.
2. **WebSocket API**: Canal persistente de baixa latência para o estado em tempo real dos combates.

Todas as chamadas protegidas requerem o header:
`Authorization: Bearer <seu_jwt_token>`

---

## 🔐 Autenticação

| Método | Rota                                | Descrição                                                       | Auth |
| ------ | ----------------------------------- | --------------------------------------------------------------- | ---- |
| `POST` | `/api/players/register`             | Cria conta com apelido + senha.                                 | Não  |
| `POST` | `/api/players/login`                | Retorna JWT (login com apelido/senha).                          | Não  |
| `POST` | `/api/players/auth/google`          | Login via Google OAuth. Retorna JWT ou `requires_registration`. | Não  |
| `POST` | `/api/players/auth/google/register` | Completa o registro para novos usuários Google.                 | Não  |

---

## 👤 Perfil do Jogador

| Método | Rota                                  | Descrição                               | Auth |
| ------ | ------------------------------------- | --------------------------------------- | ---- |
| `GET`  | `/api/players/me`                     | Dados do perfil autenticado.            | Sim  |
| `GET`  | `/api/players/me/avatar`              | URL do avatar atual.                    | Sim  |
| `POST` | `/api/players/me/avatar`              | Atualiza avatar.                        | Sim  |
| `GET`  | `/api/players/me/active-champions`    | Lista campeões em combate.              | Sim  |
| `GET`  | `/api/players/me/forge-status`        | Status da Forja (geração de imagem IA). | Sim  |
| `GET`  | `/api/players/me/available-champions` | Campeões disponíveis na Mão do Jogador. | Sim  |
| `GET`  | `/api/players/:id/stats`              | Estatísticas de combate de um jogador.  | Sim  |
| `GET`  | `/api/players/r/:apelido`             | Link de referral do jogador.            | Não  |
| `GET`  | `/api/players/me/afiliados`           | Lista de referrals do jogador.          | Sim  |

---

## ⚔️ Campeões

| Método   | Rota                                  | Descrição                                         | Auth |
| -------- | ------------------------------------- | ------------------------------------------------- | ---- |
| `POST`   | `/api/champions/create`               | Cria um campeão com imagem gerada por IA (Forja). | Sim  |
| `POST`   | `/api/champions/create-random-batch`  | Cria lote de campeões aleatórios.                 | Sim  |
| `GET`    | `/api/champions`                      | Lista todos os campeões do jogador.               | Sim  |
| `GET`    | `/api/champions/:id`                  | Detalhes completos de um campeão.                 | Sim  |
| `DELETE` | `/api/champions/:id`                  | Remove um campeão.                                | Sim  |
| `POST`   | `/api/champions/:id/queue`            | Coloca campeão na fila da arena.                  | Sim  |
| `POST`   | `/api/champions/:id/dequeue`          | Remove campeão da fila.                           | Sim  |
| `GET`    | `/api/champions/hand`                 | Mão do Jogador (campeões Nível 6 disponíveis).    | Sim  |
| `POST`   | `/api/champions/:id/return-to-combat` | Recoloca campeão Lv6 na fila do coliseu.          | Sim  |
| `POST`   | `/api/champions/:id/sell`             | Vende campeão ao servidor (100% do valor em KK).  | Sim  |
| `POST`   | `/api/champions/withdraw`             | Saque PIX do saldo KK (fee 10%).                  | Sim  |
| `GET`    | `/api/champions/withdraw/history`     | Histórico de saques.                              | Sim  |

---

## 📜 Duelos

| Método | Rota                 | Descrição                        | Auth |
| ------ | -------------------- | -------------------------------- | ---- |
| `GET`  | `/api/duels/history` | Histórico geral de duelos.       | Não  |
| `GET`  | `/api/duels/:id`     | Detalhes de um duelo específico. | Não  |

---

## 💰 Pagamentos PIX

| Método | Rota                                   | Descrição                                                             | Auth |
| ------ | -------------------------------------- | --------------------------------------------------------------------- | ---- |
| `POST` | `/api/payments/pix/deposito`           | Gera cobrança PIX (1 BRL = 1 KK, mínimo 5 BRL).                      | Sim  |
| `POST` | `/api/payments/pix/webhook`            | Webhook de confirmação de pagamento (Asaas/providers).                | Não  |
| `POST` | `/api/payments/pix/demo/confirmar`     | Confirma pagamento manualmente (apenas fora de produção).             | Não  |
| `GET`  | `/api/payments/pix/status/:externalId` | Status de uma cobrança PIX.                                           | Sim  |

---

## 📣 Torneira — Ad Faucet

| Método | Rota                                | Descrição                                                     | Auth |
| ------ | ----------------------------------- | ------------------------------------------------------------- | ---- |
| `GET`  | `/api/torneira/ads`                 | Lista anúncios ativos disponíveis para o jogador.             | Sim  |
| `GET`  | `/api/torneira/stats`               | Estatísticas diárias de claims do jogador.                    | Sim  |
| `POST` | `/api/torneira/claim`               | Registra visualização de anúncio e credita KK.                | Sim  |
| `GET`  | `/api/torneira/campaigns/mine`      | Lista campanhas criadas pelo jogador.                         | Sim  |
| `POST` | `/api/torneira/campaigns/youtube`   | Cria campanha YouTube com orçamento em KK.                    | Sim  |
| `GET`  | `/api/torneira/postback/:provider`  | Callback S2S de rede de anúncios (validação por segredo env). | Não  |

---

## 🏆 Leaderboard

| Método | Rota               | Descrição                                     | Auth |
| ------ | ------------------ | --------------------------------------------- | ---- |
| `GET`  | `/api/leaderboard` | Ranking de cartas por nível, vitórias e dano. | Não  |

---

## 🪦 Cemitério

| Método | Rota                    | Descrição                                     | Auth |
| ------ | ----------------------- | --------------------------------------------- | ---- |
| `GET`  | `/api/cemetery`         | Lista cartas do jogador no cemitério.         | Sim  |
| `POST` | `/api/cemetery/buy/:id` | Ressuscita uma carta derrotada (custo: 1 KK). | Sim  |
| `GET`  | `/api/cemetery/public`  | Cemitério público — últimas cartas derrotadas.| Não  |

---

## 🌐 Público

| Método | Rota                    | Descrição                              | Auth |
| ------ | ----------------------- | -------------------------------------- | ---- |
| `GET`  | `/api/public/champions` | Lista pública de campeões em destaque. | Não  |
| `GET`  | `/api/config/google`    | Client ID do Google OAuth (frontend).  | Não  |

---

## 🩺 Monitoramento

| Método | Rota                    | Descrição                                         | Auth          |
| ------ | ----------------------- | ------------------------------------------------- | ------------- |
| `GET`  | `/api/monitor/health`   | Health check geral do sistema.                    | Não           |
| `GET`  | `/api/monitor/websocket`| Status do hub WebSocket (conexões, fila).         | Não           |
| `GET`  | `/api/monitor/forja`    | Status do ComfyUI e fila de geração de imagens.   | Não           |
| `GET`  | `/api/monitor/financial`| Métricas financeiras operacionais.                | Token interno |
| `GET`  | `/arena-status`         | Estado atual da arena (fila, duelo em andamento). | Não           |

---

## ⚡ WebSocket (Estado em Tempo Real)

Conecte-se a `ws://<host>/ws` para receber broadcasts do estado da arena.

### Payloads do Servidor

Todos os eventos são objetos JSON. O campo `type` identifica o evento:

| `type`         | Descrição                                              |
| -------------- | ------------------------------------------------------ |
| `arena_state`  | Estado completo da arena (campeões, HP, turno, buffs). |
| `duel_started` | Novo duelo iniciado — contém IDs dos campeões.         |
| `duel_ended`   | Duelo encerrado — contém vencedor e dados de evolução. |
| `chat_message` | Mensagem do chat global.                               |
| `system_chat`  | Mensagem de sistema (moderação, eventos).              |

O servidor faz broadcast automático de `arena_state` após cada pulso de combate.

**Exemplo de Envio:**

```json
{
    "type": "action",
    "payload": {
        "actionType": "attack",
        "target": "player2"
    }
}
```
