# Configuração Inicial

Esse é um guia focado na preparação da infraestrutura e dos pré-requisitos para execução local ou implantação do Servidor Krawz Arena:

## 1. Pré-Requisitos

1. Node.js (v18+)
2. Servidor MySQL / MariaDB Local
3. ComfyUI (Recomendado clonar as instalações recomendadas proativas)
4. Redis (Para escalar WebSockets em um fluxo robusto).

## 2. Banco de Dados

- Crie uma database no MySQL chamada `krawz_arena_db`.
- O script estará no diretório `DATABASE-SETUP.md` (veja lá como rodar as tabelas).

## 3. ComfyUI

O ComfyUI (`ComfyUI/`) gera as imagens. Siga as orientações específicas contidas nos scripts `.bat` ou `requirements.txt` dele.
