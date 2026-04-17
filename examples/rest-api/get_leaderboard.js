const getLeaderboard = async () => {
    try {
        const response = await fetch('https://api.krawz.net/api/leaderboard?limit=10', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Falha ao obter Leaderboard.');
        }

        const topPlayers = await response.json();
        console.table(topPlayers);

        // Renderizar o Top 10
        topPlayers.forEach((player, index) => {
            console.log(`${index + 1}º Lugar: ${player.username} - MMR: ${player.mmr} (${player.wins} Vitórias)`);
        });
    } catch (error) {
        console.error(error);
    }
};

// Uso Público (Não requer Auth):
// getLeaderboard();
