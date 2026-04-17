# 🗄️ Guia de Configuração e Manutenção do Banco de Dados

O Krawz Arena utiliza **MySQL** como banco de dados relacional para garantir a persistência segura dos atributos dos campeões, histórico de partidas e evolução de contas.

Este guia é direcionado a desenvolvedores e administradores de sistema que precisam configurar o ambiente local ou realizar manutenções nas instâncias de banco de dados.

## 🛠️ Configuração Inicial (Setup)

### 1. Requisitos

- MySQL Server 8.0+
- Node.js configurado no ambiente
- Arquivo `.env` corretamente preenchido na raiz do projeto:

```env
DB_HOST=127.0.0.1
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=krawz_arena
```

### 2. Estrutura DDL

As tabelas principais do sistema incluem:

- `campeoes`: Armazena o DNA, nível, atributos base, bônus permanentes e URL de arte (ComfyUI).
- `duelos`: Registra as partidas ativas ou recém concluídas.
- `historico_duelos` (Opcional/Analytics): Log completo de turnos e status de duelos passados.
- `usuarios`: Dados de login, carteira e autenticação OAuth.

_(Nota: O projeto utiliza Pool de conexões via `mysql2/promise` exportado em `@db/database`)_.

---

## 🧹 Scripts de Reset e Manutenção (Wipes)

Durante o desenvolvimento (Alpha/Beta) ou na transição de Temporadas Sazonais, é comum precisar redefinir o estado do jogo. Nós construímos uma suíte de scripts em NodeJS na raiz do projeto para realizar **Wipes** controlados sem precisar de acesso direto ao console SQL.

### Resets de Progressão (Wipes de Temporada)

1. **Reset Completo (Nível + Elemento + Bônus) ⭐ Recomendado**
    - **Comando:** `npm run wipe:nivel-elemento`
    - **Script:** `reset_nivel_elemento.js`
    - **O que faz:** Volta todos os campeões para o Nível 1. Zera bônus de HP herdado, ataque e defesa permanentes. Reseta a classe elemental de todos para `Sulphur`. Limpa a tabela de `duelos` e o estado atual em memória.

2. **Reset Estrutural Base**
    - **Script:** `reset_campeoes.js`
    - **O que faz:** Realiza um wipe semelhante, focando na zeragem dos bônus e retorno ao nível 1, mas preservando certas características não atreladas a temporadas.

3. **Reset Direto (Safe Mode para Novos Deploys)**
    - **Script:** `reset_direto.js`
    - **O que faz:** Verifica dinamicamente quais tabelas existem no seu banco de dados antes de tentar os `TRUNCATE` ou `UPDATE`. Perfeito para rodar logo após a primeira migração de tabelas.

### Manipulação de Elementos (Forja / Balanceamento)

Se você estiver testando o motor de combate e precisar garantir que a massa de campeões tenha uma distribuição justa de elementos, use as ferramentas de Elementos:

1. **Randomização Equilibrada**
    - **Comando:** `npm run random:elementos-basicos`
    - **Script:** `randomizar_elementos_basicos.js`
    - **O que faz:** Usa algoritmo Fisher-Yates para embaralhar os 3 elementos básicos (Sulphur, Hydrargyrum, Natrium) garantindo que 33% da base de campeões fique em cada categoria.

2. **Distribuição Determinística**
    - **Comando:** `npm run wipe:elementos`
    - **Script:** `wipe_elementos_basicos.js`
    - **O que faz:** Distribui os elementos fixamente via `ID % 3`. Útil para testes automatizados reproduzíveis.

## 🛡️ Notas de Segurança e Cloud

- Os arquivos `.sql` e ferramentas como `reset_simples.js` (que contêm credenciais hardcoded) JAMAIS devem subir para instâncias de nuvem. Utilize apenas chamadas orientadas a `.env`.
- Rotinas de manipulação do banco em produção devem preferencialmente passar por `cliente_reset.js` (que simula chamadas em Endpoints autenticados via JWT com roles de Admin), garantindo o rastreio da operação no servidor em Node.js.
