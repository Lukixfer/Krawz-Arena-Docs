# 📖 API Reference - Krawz Arena

A API do Krawz Arena é dividida em duas frentes principais:

1. **REST API**: Para autenticação, criação de perfis, campeões, estatísticas, e match-making.
2. **WebSocket API**: Um canal de comunicação persistente de ultra-baixa latência para o decorrer dos combates (duelos em tempo real).

## 🚀 1. REST API

### 📡 Rotas Principais

Todas as chamadas requerem header assinado quando protegidas:
`Authorization: Bearer <seu_jwt_token>`

#### Campeões & Jogador

| Método | Rota                   | Descrição                                        | Auth |
| ------ | ---------------------- | ------------------------------------------------ | ---- |
| `POST` | `/api/player/register` | Cria uma nova conta.                             | Não  |
| `POST` | `/api/player/login`    | Retorna um token JWT.                            | Não  |
| `GET`  | `/api/player/profile`  | Busca os dados da conta.                         | Sim  |
| `POST` | `/api/champions/forge` | Cria um novo campeão usando ComfyUI (Imagem AI). | Sim  |
| `GET`  | `/api/champions/:id`   | Detalhes completos de um campeão e atributos.    | Sim  |

#### Duelos & Ranking

| Método | Rota                    | Descrição                                         | Auth |
| ------ | ----------------------- | ------------------------------------------------- | ---- |
| `POST` | `/api/duel/queue`       | Coloca o jogador/campeão na fila de Match-Making. | Sim  |
| `GET`  | `/api/leaderboard`      | Ranking de pontuação e vitórias dos jogadores.    | Não  |
| `GET`  | `/api/duel/history/:id` | Histórico de duelos para exibir análises.         | Não  |

## ⚡ 2. WebSocket API (Combate em Tempo Real)

A comunicação durante os combates ocorre integralmente no protocolo `ws://` ou `wss://` da nossa infraestrutura escalável.

### Conexão e Autenticação

Ao se conectar em `wss://api.krawz.net/arena`, o cliente deve emitir um primeiro payload para se identificar e provar que faz parte de um duelo em andamento:

```json
{
    "type": "authenticate",
    "payload": {
        "token": "eyJhbGci...",
        "match_id": "math_xyz123"
    }
}
```

### Eventos Recebidos (Server ➔ Client)

- `duel_update`: Atualizações de vida, buffs, e quem deve jogar.
- `combat_log`: Informação do que acabou de acontecer ("Ataque Crítico (-25 HP)").
- `duel_ended`: A match terminou e os rankings estão sendo processados.

### Ações Enviadas (Client ➔ Server)

- `action`: Executa um ataque básico defesa, etc.
- `use_skill`: Utiliza uma habilidade específica de classe.

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
