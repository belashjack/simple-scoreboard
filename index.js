class Scoreboard {
    constructor(className, initialGames) {
        this.scoreboardBody = document.querySelector(`.${className} tbody`);
        this.games = initialGames;
    }

    init() {
        const tableBodyFragment = new DocumentFragment();

        this.games.forEach((game) => {
            const { hostTeamName, hostTeamScore, guestTeamName, guestTeamScore } = game;

            const gameRow = document.createElement('tr');

            const hostTeamNameCell = document.createElement('td');
            hostTeamNameCell.textContent = hostTeamName;

            const scoreCell = document.createElement('td');
            scoreCell.textContent = `${hostTeamScore} - ${guestTeamName}`;

            const guestTeamNameCell = document.createElement('td');
            guestTeamNameCell.textContent = guestTeamName;

            const actionsCell = document.createElement('td');
            const updateScoreButton = document.createElement('button');
            updateScoreButton.textContent = 'Update Score';
            const finishGameButton = document.createElement('button');
            finishGameButton.textContent = 'Finish Game';

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
}

const initialGames = [
    { hostTeamName: 'Mexico', hostTeamScore: 0, guestTeamName: 'Canada', guestTeamScore: 5 },
    { hostTeamName: 'Spain', hostTeamScore: 10, guestTeamName: 'Brazil', guestTeamScore: 2 },
    { hostTeamName: 'Germany', hostTeamScore: 2, guestTeamName: 'France', guestTeamScore: 2 },
    { hostTeamName: 'Uruguay', hostTeamScore: 6, guestTeamName: 'Italy', guestTeamScore: 6 },
    { hostTeamName: 'Argentina', hostTeamScore: 3, guestTeamName: 'Australia', guestTeamScore: 1 },
];

const scoreboard = new Scoreboard('scoreboard', initialGames);

scoreboard.init();
