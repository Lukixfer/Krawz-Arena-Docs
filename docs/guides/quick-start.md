# Quick Start: Sua Primeira Batalha

Este guia ensina como conectar no seu ambiente local (ou produção) e iniciar um duelo de testes.

## Roteiro Básico

1. Crie uma Conta ou Login:

```bash
POST /api/player/register
{ "username": "Tester", "password": "123", "email": "test@test.com" }
```

2. Crie seu Campeão:

```bash
POST /api/champions/forge
{ "name": "Krawz" }
# Salve o Champion ID gerado
```

3. Registre na Queue (Fila):

```bash
POST /api/duel/queue
```

O Backend Krawz Arena conectará você ao primeiro oponente livre ou a um Bot (`Krawz-Bot`). Abra o socket e jogue via `connect_and_duel.js` da pasta de `examples`.

## Mais:

Consulte a `API_REFERENCE.md` na raiz para o mapeamento total de REST & WS.
