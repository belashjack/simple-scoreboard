class Scoreboard {
    constructor(className, initialGames) {
        this.scoreboardBody = document.querySelector(`.${className} tbody`);
        this.games = initialGames;
    }

    init() {
        const tableBodyFragment = new DocumentFragment();

        this.games.forEach((game) => {
            const { id, hostTeamName, hostTeamScore, guestTeamName, guestTeamScore } = game;

            const gameRow = document.createElement('tr');

            const hostTeamNameCell = document.createElement('td');
            hostTeamNameCell.textContent = hostTeamName;

            const scoreCell = document.createElement('td');
            scoreCell.textContent = `${hostTeamScore} - ${guestTeamScore}`;

            const guestTeamNameCell = document.createElement('td');
            guestTeamNameCell.textContent = guestTeamName;

            const actionsCell = document.createElement('td');
            const updateScoreButton = document.createElement('button');
            updateScoreButton.textContent = 'Update Score';
            updateScoreButton.addEventListener('click', this.updateScore.bind(this, id))
            const finishGameButton = document.createElement('button');
            finishGameButton.textContent = 'Finish Game';
            finishGameButton.addEventListener('click', this.finishGame.bind(this, id))

            actionsCell.append(updateScoreButton);
            actionsCell.append(finishGameButton);

            gameRow.append(hostTeamNameCell);
            gameRow.append(scoreCell);
            gameRow.append(guestTeamNameCell);
            gameRow.append(actionsCell);

            tableBodyFragment.append(gameRow);
        });

        this.scoreboardBody.replaceChildren(tableBodyFragment);
    }

    validateGoals(goals) {
        if (isNaN(goals)) return false;

        if (goals < 0) return false;

        return true;
    }

    promptGoals(teamName, teamScore) {
        let newGoals;

        do {
            const promptResult = prompt(`Please, enter how many goals ${teamName} scored:`, teamScore);

            if (promptResult === null) return;

            newGoals = parseInt(promptResult, 10);
        } while (!this.validateGoals(newGoals));

        return newGoals;
    }

    updateScore(id) {
        const currentGameIndex = this.games.findIndex((game) => game.id === id);
        const currentGame = this.games[currentGameIndex];

        const newHostTeamScore = this.promptGoals(currentGame.hostTeamName, currentGame.hostTeamScore);

        if (newHostTeamScore === undefined) return;

        const newGuestTeamScore = this.promptGoals(currentGame.guestTeamName, currentGame.guestTeamScore);

        if (newGuestTeamScore === undefined) return;

        currentGame.hostTeamScore = newHostTeamScore;
        currentGame.guestTeamScore = newGuestTeamScore;

        this.init();
    }

    finishGame(id) {
        const currentGameIndex = this.games.findIndex((game) => game.id === id);

        this.games.splice(currentGameIndex, 1);

        this.init();
    }
}

const initialGames = [
    { id: 0, hostTeamName: 'Mexico', hostTeamScore: 0, guestTeamName: 'Canada', guestTeamScore: 5 },
    { id: 1, hostTeamName: 'Spain', hostTeamScore: 10, guestTeamName: 'Brazil', guestTeamScore: 2 },
    { id: 2, hostTeamName: 'Germany', hostTeamScore: 2, guestTeamName: 'France', guestTeamScore: 2 },
    { id: 3, hostTeamName: 'Uruguay', hostTeamScore: 6, guestTeamName: 'Italy', guestTeamScore: 6 },
    { id: 4, hostTeamName: 'Argentina', hostTeamScore: 3, guestTeamName: 'Australia', guestTeamScore: 1 },
];

const scoreboard = new Scoreboard('scoreboard', initialGames);

scoreboard.init();
