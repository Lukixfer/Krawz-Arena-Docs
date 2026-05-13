# Mecânicas do Jogo

## Visão Geral

Krawz Arena é um jogo de duelo tático onde o jogador constrói um campeão usando alquimia e elementos, enfrentando outros jogadores em tempo real.

## Visão do Coliseu

A arena opera sob o conceito de um coliseu com regras globais:

- **Sala única de duelo**: existe apenas um combate por vez em todo o servidor.
- **Fila de prioridade**: as cartas e campeões mais fortes têm prioridade no pareamento.

## Mão do Jogador e Nível Máximo

Quando uma carta atinge o nível 6, ela sai da fila de combate e retorna para a Mão do Jogador.

Enquanto estiver nessa mão, o proprietário pode:

1. **Voltar ao combate**: reinsere a carta na fila da arena.
2. **Vender**: negociar a carta com o servidor.

## Economia e Venda

O sistema econômico foi consolidado com duas regras centrais:

- A venda da carta paga **100% do valor acumulado**.
- O saque aplica **fee de 10% apenas no saque**, não na valorização interna da carta.

### Valor da Carta

O valor da carta cresce conforme a progressão da arena:

- **Nível 1**: 1kk
- **Nível 2**: 2kk
- **Nível 3**: 4kk
- **Nível 4**: 8kk
- **Nível 5**: 16kk
- **Nível 6**: 32kk

## Status dos Campeões

- **HP**: pontos de vida do campeão. Chegar a 0 significa derrota.
- **Energia / Mana**: usada em habilidades e ataques especiais.
- **Atributos**: força, defesa e agilidade, determinando ordem e efetividade do dano.

## Sistema de Combate

O combate é gerido por WebSocket de baixa latência. Cada turno é dividido em:

1. **Ação padrão**: ataque ou defesa.
2. **Uso de habilidades**: aplicação de habilidades ativas que consomem mana ou aplicam buffs e debuffs.
3. **Resolução do turno**: o motor do jogo resolve a ação e emite um broadcast de estado.
