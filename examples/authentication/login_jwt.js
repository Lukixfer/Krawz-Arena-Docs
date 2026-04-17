const loginUser = async (username, password) => {
    try {
        const response = await fetch('https://api.krawz.net/api/player/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const { token, user } = await response.json();
        console.log('Login bem-sucedido!', user);

        // Guardando o token para futuras requisições JWT
        localStorage.setItem('krawz_arena_token', token);
        return token;
    } catch (error) {
        console.error('Falha na autenticação:', error);
    }
};

// Uso:
// loginUser('my_epic_player', 'SenhaUltaSecreta123');
