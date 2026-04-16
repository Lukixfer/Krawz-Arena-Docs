# 🗺️ Roadmap de Desenvolvimento - Krawz Arena

> _"A jornada alquímica rumo à perfeição digital"_

## 🎯 Visão e Progresso Contínuo

**Missão:** Estabelecer Krawz Arena como **referência mundial** em jogos de cartas estratégicos, combinando inovação tecnológica nativa e IA.

## 📊 Status Atual -> Entrega e Refinamento Tecnológico

Com a base estabilizada, muitas das grandes promessas já foram concretizadas.

### ✅ **Core Completo e Tech Stack Entregues** (100%)
- ✅ **Setup Híbrido Node/Express + Vanilla JS**: Organização robusta de pastas e separação de responsabilidades.
- ✅ **Motor de Combate e Buffs Avançados**: Motor lidando com mais de 38 habilidades ativas/passivas (uffManager), impedindo manipulação de estados não-padronizada.
- ✅ **Base de Dados Escalonável (MySQL)**: Histórico de duelos, persistência de atributos cruzados com JWT Auth e Google Auth Integrado.
- ✅ **Matchmaking e Salas Real-time (WebSockets)**: Filas Queue/Dequeue 100% operacionais com robusto controle de sessão e desconexões.
- ✅ **Integração de IA (ComfyUI)**: Cards dinâmicos e fluidos integrados nativamente com image_weaver.js.
- ✅ **Frontend Anti-Flicker**: Integração visual guiada pela autoridade pura da aba (HP/Animação gerenciado pelo x_engine.js).
- ✅ **Leaderboard e Campeões**: APIs consistentes, listagem e paginação entregues (GET /api/leaderboard, GET /api/champions).

### 🟡 **Em Progresso / Próximos Passos (Scaling e UX)**
- 🟡 Melhoria no suporte e escalonamento dos WebSockets (Sharding e Microservices passíveis).
- 🟡 Adição de novas métricas de pareamento no Matchmaking.
- 🟡 Ampliação do suporte a Guildas e Torneios.
- 🟡 Implementação de Mercado RMT (Real Money Trading).

---

## 🚀 Próximas Entregas Planejadas

### **Q3/Q4 - Expansão de Habilidades e IA**
- [ ] Ampliar engine para 50+ habilidades funcionais e interconectadas.
- [ ] Adicionar customização em tempo real de geração de IA de acordo com os Status/Elementos.

### **Expansão Futura - RMT e Torneios**
- [ ] Torneios globais automatizados.
- [ ] Interface de Marketplace RMT controlada e segura limitando *fraud-rates*.
- [ ] Infraestrutura estrita e otimização massiva de instâncias.
