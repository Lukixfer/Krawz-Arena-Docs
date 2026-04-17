# Diretrizes de Desenvolvimento no Krawz Arena

A arquitetura do backend em Krawz Arena prioriza **Managers Autônomos** com papéis distintos e uma separação drástica de atualizações em tempo real (State X Clients).

## Managers Principais (`src/arena/*`)

1. **`DuelState` (`duel_state.js`)**: Armazena e regula o Turno (Quem ataca, Vida atual, Mana, Histórico do Turno atual).
2. **`BuffManager` (`buff_manager.js`)**: Gerencia toda mecânica de envenenamento e auras bônus/redução de durabilidade por turno.
3. **`WebSocketManager` (`websocket_manager.js`)**: Realiza o broadcast das atualizações do estado da batalha.
4. **`CombatEngine` (`combat_engine.js`)**: Executa as regras de negócio de dano, status (críticos, precisão vs agilidade)

### 11 Mandamentos do Dev (Code of Conduct)

- Nunca modifique estados diretamente `state.hp -= 10`. Use `DuelState.updateDueloState()`.
- O Motor FX JS no `public/` é quem anima as coisas, o Server só envia valores brutos.

### Adicionar Novas Habilidades (`src/habilidades/`)

Siga a classe `Effect` genérica. Adicione o JSON descritivo.
