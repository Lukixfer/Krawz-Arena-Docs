# Mecânicas do Jogo

## Visão Geral

Krawz Arena é um jogo de duelo tático onde o jogador cria campeões usando alquimia e elementos, enfrentando outros jogadores em tempo real.

## Visão do Coliseu

A arena opera sob o conceito de um coliseu com regras globais:

- **Sala única de duelo**: existe apenas um combate por vez em todo o servidor.
- **Fila de prioridade**: as cartas mais fortes têm prioridade no pareamento.
- **Fila sequencial**: novos campeões entram na fila ao serem criados ou ao retornar da Mão do Jogador.

## Sistema de Elementos Alquímicos

Cada campeão possui um elemento primário que influencia os modificadores de combate:

- **Sulphur** (Fogo): agressivo, bônus ofensivos
- **Hydrargyrum** (Água): fluido, bônus defensivos
- **Natrium** (Ar): ágil, bônus de evasão

Os Aspectos definem a polaridade do campeão: **Celestial** (Luz) ou **Abissal** (Trevas).

## Mão do Jogador e Nível Máximo

Quando uma carta atinge o nível 6, ela sai da fila de combate e retorna para a Mão do Jogador.

Enquanto estiver nessa mão, o proprietário pode:

1. **Voltar ao combate**: reinsere a carta na fila da arena.
2. **Vender**: negocia a carta com o servidor, recebendo 100% do valor acumulado em KK.

## Economia e Venda

O sistema econômico opera com duas regras centrais:

- A venda da carta paga **100% do valor acumulado**.
- O saque aplica **fee de 10% apenas no saque**, não na valorização interna.

### Valor da Carta por Nível

Fórmula: `V(n) = 2^(n-1)` KK

| Nível | Valor |
| ----- | ----- |
| 1     | 1 KK  |
| 2     | 2 KK  |
| 3     | 4 KK  |
| 4     | 8 KK  |
| 5     | 16 KK |
| 6     | 32 KK |

## Depósito e Saque PIX

- **Taxa de câmbio**: 1 BRL = 1 KK (Krawz Koinz)
- **Depósito mínimo**: 5 BRL via PIX dinâmico (integração Asaas)
- **Saque**: qualquer valor do saldo com fee de 10%

## Programa de Afiliados

Cada jogador possui um link de indicação (`/r/:apelido`). Quando um indicado realiza um saque:

- O afiliado recebe automaticamente **5% do valor bruto** do saque como comissão.
- A comissão é creditada diretamente no saldo KK do afiliado.

## Torneira — Ad Faucet

A Torneira é o sistema de faucet do jogo: o jogador assiste anúncios e ganha KK como recompensa.

- Cada anúncio tem um **payout estimado** e um **tempo mínimo de visualização**.
- Há um **cap diário** de ganhos por jogador (padrão: 0,05 KK/dia).
- Jogadores podem criar **campanhas YouTube** com orçamento próprio em KK.
- Anúncios de terceiros passam por moderação antes de serem exibidos.

## Cemitério e Ressurreição

- Cartas derrotadas vão para o cemitério com status `derrotado`.
- O jogador pode ressuscitar qualquer carta morta pagando **1 KK**:
    - A carta volta ao **nível 1**.
    - Recebe **+1 em um atributo permanente aleatório** (atk, def, regen ou fúria).
    - Status muda para `na_fila` (pronta para duelar novamente).
- O servidor registra o `total_ressurreicoes` de cada campeão.

## Status dos Campeões

| Status         | Descrição                                        |
| -------------- | ------------------------------------------------ |
| `na_fila`      | Na fila do Coliseu aguardando ou em combate      |
| `disponivel`   | Na Mão do Jogador (nível 6 ou após ressurreição) |
| `derrotado`    | No cemitério — pode ser ressuscitado             |
| `em_tecelagem` | Em processo de geração de arte por IA            |

## Sistema de Combate

O combate é gerido por WebSocket de baixa latência. Cada turno é dividido em:

1. **Ação padrão**: ataque base com rolagem de dado D12 ou D16 conforme atributos.
2. **Uso de habilidades**: aplicação de habilidades ativas que consomem mana/energia ou aplicam buffs e debuffs.
3. **Resolução do turno**: o motor resolve a ação, aplica buffs persistentes e emite broadcast de estado para todos os clientes.

### Habilidades Disponíveis (seleção)

- **Buff de Ataque/Defesa**: aumentos permanentes ou temporários de atributos
- **Fúria**: bônus de dano por um número de turnos
- **Sangramento**: dano contínuo por turno
- **Voo**: chance de esquivar ataques
- **Regeneração**: cura por turno
- **Ressurreição**: retorna ao combate ao ser derrotado (rastreada em `total_ressurreicoes`)
