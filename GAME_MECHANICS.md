# Mecânicas do Jogo`n`n## Visão Geral`nKrawz Arena é um jogo de duelo tático onde o jogador constrói um campeão utilizando Alquimia e elementos, enfrentando outros jogadores em tempo real.`n`n## Visão do Coliseu (Arena Única)

A Krawz Arena opera sob o conceito de um autêntico **Coliseu**:

- **Sala Única de Duelo**: Existe apenas um único combate ocorrendo por vez em todo o servidor.
- **Fila de Prioridade (As Mais Fortes Primeiro)**: O pareamento não é aleatório; as cartas/campeões mais fortes sempre têm prioridade e brigam primeiro frente a toda a plateia.

## A "Mão do Jogador" e Nível Máximo (Cap Nível 6)

Durante a jornada de combates, quando uma carta atinge o **Nível 6**, ela é automaticamente retirada da fila de duelos do Coliseu e retorna para a **"Mão do Jogador"** (inventário pessoal).

Enquanto a carta estiver na "Mão do Jogador", o proprietário terá duas opções exclusivas:

1. **Voltar ao Combate**: Reinsere a carta na fila de batalhas da Arena.
2. **Vender (RMT - Real Money Trading)**: Negocia a carta diretamente com o servidor.

## Economia e RMT (Real Money Trading)

A valorização das cartas é o pilar do sistema econômico. Se o jogador optar por **Vender**, o próprio servidor adquire a carta pagando **90% do valor acumulado** dela.

### Como a carta acumula valor?

O valor de uma carta dobra a cada nível conquistado na Arena:

- **Nível 1**: 1kk (Valor inicial de compra)
- **Nível 2**: 2kk
- **Nível 3**: 4kk
- **Nível 4**: 8kk
- **Nível 5**: 16kk
- **Nível 6**: 32kk (Momento em que retorna para a "Mão do Jogador")

## Status dos Campeões`n`n- **HP (Health Points)**: Pontos de vida do campeão. Chegar a 0 significa derrota.`n- **Energia / Mana**: Utilizada para lançar habilidades e ataques especiais.`n- **Atributos**: Força, Defesa, Agilidade, focados em determinar a ordem e efetividade do dano.`n`n## Sistema de Combate`n`nO combate é gerido de forma assíncrona por um WebSocket de baixa latência. Cada turno é dividido em:`n`n1. **Ação Padrão**: Escolher ataque ou defesa.`n2. **Uso de Habilidades**: Aplicação de habilidades ativas que consomem mana ou aplicam buffs/debuffs.`n3. **Resolução de Turno**: O motor de jogo resolve a ação e emite um broadcast de estado (`duel_update`).
