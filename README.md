# Krawz Arena: A Revolução Alquímica e Tecnológica

[![Geração por IA](https://img.shields.io/badge/Arte-ComfyUI_AI-blueviolet)](https://krawz.net)
[![Status](https://img.shields.io/badge/Status-Beta-gold)](https://krawz.net)

**Krawz Arena** é uma plataforma inovadora de duelos estratégicos em tempo real e evolução de personagens. Combinando mecânicas profundas de RPG de cartas elementais com arte dinâmica gerada por **Inteligência Artificial**, o projeto foi desenhado para escalabilidade, baixa latência e profundo engajamento.

## 🚀 Visão Tecnológica e Estado Atual

A arquitetura de **Krawz Arena** foi construída visando máxima performance, retenção de jogadores e rápida capacidade de iteração. Nossa stack exclusiva garante uma experiência fluida.

### ⚙️ Nossa Stack Exclusiva e Realizações Recentes:
*   **Backend Híbrido Node/Express + MySQL**: Um núcleo rápido, assíncrono e altamente escalável. Implementamos a migração híbrida de Autenticação (Login Local + Google Auth via JWT), roteamento robusto como Listagem e Paginação de Campeões (GET /api/champions), e um robusto Sistema de Leaderboard (GET /api/leaderboard), além de Matchmaking Queue/Dequeue.
*   **WebSockets (Rede de Baixa Latência)**: Comunicação bidirecional contínua garantindo que ataques, defesas e habilidades elementais sejam computadas e distribuídas em milissegundos.
*   **Motor de Combate Avançado**: Operando com mais de 38 habilidades dinâmicas orquestradas sob forte rigor técnico pelo sistema de *Managers* (duel_manager, uffManager), que forçam aplicações sem manipulação direta dos estados.
*   **Frontend (Vanilla JS + x_engine.js)**: Nossa engine própria traz estabilidade total. Introduzimos o moderno sistema **Anti-Flicker** com rigoroso controle visual via atributos (data-rendering-in-progress) na x_engine.js, evitando saltos e quebras de interface durante a carga.
*   **ComfyUI AI Generation Integrado**: Geração de cards autêntica. Processos assíncronos gerenciam o ciclo de vida e a injeção nativa das peças visuais no game com o image_weaver.js e a forja de metamorfoses.

---

## 💼 Por Quê Investir no Krawz Arena?

Krawz Arena ultrapassa o conceito de apenas um "jogo de cartas". É um Produto de Software Completo projetado com uma cultura DevSecOps consolidada:

1. **Desenvolvimento Ágil e Resiliente**: Pipeline contínuo com forte aderência a TDD. Rotinas críticas do motor de combate são protegidas por dezenas de suítes de testes (__tests__).
2. **Arquitetura Orientada a Eventos Seguros**: Mudanças de estado nunca são diretas, mitigando trapaças e bugs. O fluxo do ciclo vital de batalha é imutável no Frontend, que opera como camada de apresentação.
3. **Poder Retentivo da IA**: Colecionismo vivo acompanhado pela evolução visual procedimental.

O mundo de Krawz Arena está preparado para o próximo estágio de expansão.
