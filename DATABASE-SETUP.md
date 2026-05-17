# Guia de Configuração e Manutenção do Banco de Dados

O Krawz Arena utiliza **MySQL** como banco de dados relacional para garantir a persistência segura dos atributos dos campeões, histórico de partidas e evolução de contas.

Este guia é direcionado a desenvolvedores e administradores de sistema que precisam configurar o ambiente local ou realizar manutenções.

## Configuração Inicial

### Requisitos

- MySQL Server 8.0+
- Node.js configurado no ambiente
- Arquivo `.env` corretamente preenchido na raiz do projeto

> **Atenção:** A variável de banco é `DB_DATABASE`, não `DB_NAME`.

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=krawz_arena
```

### Tabelas Principais

| Tabela                           | Descrição                                                                   |
| -------------------------------- | --------------------------------------------------------------------------- |
| `jogadores`                      | Perfil, saldo KK, autenticação Google, link de afiliado                     |
| `campeoes`                       | DNA, nível, atributos, status, URL de arte, total_ressurreicoes             |
| `duelos`                         | Partidas ativas ou recém concluídas                                         |
| `historico_duelos`               | Log completo de turnos e resultados (analytics)                             |
| `transacoes_saque`               | Histórico de saques PIX com fee de 10%                                      |
| `transacoes_deposito_pix`        | Cobranças PIX geradas e seu status de confirmação                           |
| `audit_pagamentos`               | Auditoria de todas as operações financeiras (IP, user-agent, referência)    |
| `transacoes_comissao_afiliado`   | Comissões de 5% pagas ao afiliado por saque do indicado                     |
| `torneira_ads`                   | Anúncios e campanhas disponíveis no faucet                                  |
| `torneira_claims`                | Histórico de KK creditado por visualização de anúncio                       |
| `matchmaking_stats`              | Estatísticas de matchmaking por jogador                                      |

O projeto utiliza pool de conexões via `mysql2/promise` exportado em `@db/database`.

---

## Migrações

As migrações são scripts Node.js em `scripts/migrations/`. Execute-as em ordem:

```bash
npm run migrate:pix                  # transacoes_deposito_pix
npm run migrate:audit-pagamentos     # audit_pagamentos
npm run migrate:torneira             # torneira_ads, torneira_claims
npm run migrate:torneira-embeds      # suporte a embed_html/url
npm run migrate:torneira-postback    # campo postback_provider
npm run migrate:terms                # termos_aceitos_em em jogadores
npm run migrate:fallback-webp        # corrige fallback de imagens WebP
```

> Migrações de afiliados e `matchmaking_stats` são aplicadas automaticamente pelo `server.js` na inicialização.

---

## Scripts de Reset e Manutenção

### Resets de Progressão (Wipes de Temporada)

**Reset Completo (Nível + Elemento) — Recomendado**

```bash
npm run wipe:nivel-elemento
```

Volta todos os campeões para Lv1, zera bônus permanentes, reseta elemento para `Sulphur` e limpa a tabela de duelos ativos.

### Manipulação de Elementos

**Randomização equilibrada (Fisher-Yates):**

```bash
npm run random:elementos-basicos
```

Distribui Sulphur, Hydrargyrum e Natrium em ~33% cada.

### Torneira — Limpeza de Placeholders

```bash
npm run torneira:wipe-placeholders:dry   # pré-visualização
npm run torneira:wipe-placeholders       # executa a limpeza
```

Remove anúncios placeholder sem orçamento real inseridos pelo seed antigo.

---

## Notas de Segurança

- Nunca commite credenciais. Use exclusivamente variáveis de ambiente via `.env`.
- Operações de wipe em produção devem ser executadas via endpoints autenticados com JWT de Admin ou diretamente pelo DBA com acesso controlado.
- As migrações que alteram tabelas financeiras (`transacoes_saque`, `transacoes_deposito_pix`) requerem permissão `ALTER` no usuário MySQL de aplicação — execute com usuário DBA se necessário.
