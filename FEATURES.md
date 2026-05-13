# 🌟 Funcionalidades do Krawz Arena

Abaixo estão as entregas mais recentes, organizadas por bloco funcional.

## Autenticação e Segurança

- 🔑 **Google Auth (OAuth2) e login nativo**: fluxos harmonizados por JWT.
- 🛡️ **Segurança de API**: tokens para rotas REST e handshakes WebSocket protegidos.

## Ecossistema Competitivo

- ⚔️ **Matchmaking e fila**: encontra oponentes em tempo real e inicia salas de duelo dedicadas.
- 🏆 **Leaderboard automático**: ranking dos duelistas exposto via API.
- 📜 **Histórico de combates**: partidas completas salvas com eventos e turnos.

## Motor de Combate

- 🔥 **Orquestrador de habilidades**: mais de 38 habilidades ativas e passivas integradas ao sistema.
- ⚙️ **Processamento determinístico**: o backend dita as regras e valida as ações pelo manager.

## Economia e Coleção

- 💰 **Venda integral no nível 6**: a carta retorna para a Mão do Jogador e pode ser vendida por 100% do valor acumulado.
- 💸 **Saque com fee de 10%**: a taxa é aplicada apenas no saque, preservando a economia interna.
- 🗃️ **Histórico de saques**: transações persistidas para consulta e auditoria.
- 🎨 **Forge IA nativo**: geração assíncrona com ComfyUI baseada nos atributos de transformação.

## Frontend Imersivo e Sólido

- 🎬 **fx_engine.js**: HP e dano com interpolações precisas.
- 🚫 **Sistema anti-flickering**: renderização de cards sem piscadas durante atualizações WebSocket.
