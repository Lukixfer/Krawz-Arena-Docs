const WS_URL = 'wss://api.krawz.net/arena';

const connectToDuel = (token, matchId) => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
        console.log('Conectado à Arena! Autenticando...');

        // 1. Identifica-se na conexão
        const authPayload = {
            type: 'authenticate',
            payload: { token, match_id: matchId },
        };

        socket.send(JSON.stringify(authPayload));
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        switch (data.type) {
            case 'duel_update':
                console.log(`Estado atual: Meu HP: ${data.state.player1.hp} | Inimigo HP: ${data.state.player2.hp}`);
                break;

            case 'combat_log':
                console.log(`Registro Batalha: ${data.log}`);
                break;

            case 'duel_ended':
                console.log(`Batalha Finalizada! Vencedor: ${data.winner}`);
                socket.close();
                break;
        }
    };

    socket.onclose = () => {
        console.warn('Conexão Perdida. Tentando reconectar...');
    };

    // Função para usar pelo jogo
    window.sendAttack = (targetId) => {
        socket.send(
            JSON.stringify({
                type: 'action',
                payload: { actionType: 'attack', target: targetId },
            })
        );
    };
};

// Uso (após o login):
// connectToDuel(localStorage.getItem('krawz_arena_token'), 'm-1234');
