const gameboard = (() => {
    let board = [];
    const makeBoard = () => {
        board = [];
        for (let i = 0; i < 3; i++) {
            board.push([]);
            for (let j = 0; j < 3; j++) {
                board[i].push("-");
            }
        }
    };

    const placeMarker = (marker, position) => {
        const [i, j] = position;
        if (board[i][j] !== '-')
            return -1;
        board[i][j] = marker;
        return 1;
    };

    const checkWinner = () => {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== '-' && board[i][0] === board[i][1] && board[i][0] === board[i][2])
                return board[i][0];
        }
        for (let j = 0; j < 3; j++) {
            if (board[0][j] !== '-' && board[0][j] === board[1][j] && board[0][j] === board[2][j])
                return board[0][j];
        }
        if (board[1][1] !== '-') {
            if (board[0][0] === board[1][1] && board[0][0] === board[2][2])
                return board[1][1];
            else if (board[2][0] === board[1][1] && board[0][2] === board[1][1])
                return board[1][1];
        }

        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (board[i][j] === '-')
                    return '-';

        return "draw";

    };

    const showBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                console.log(board[i][j]);
            }
            console.log(`\n`);
        }
    };

    return { makeBoard, placeMarker, checkWinner, showBoard };

})();

function gameControl(player1_name, player2_name) {
    const players = [
        {
            name: player1_name,
            marker: 'X'
        },
        {
            name: player2_name,
            marker: 'O'
        }]
    let activePlayer = players[0];

    const getMarker = () => {
        return activePlayer.marker;
    }

    const getPlayer = () => {
        return activePlayer.name;
    }

    const playRound = (position) => {
        const status = gameboard.placeMarker(activePlayer.marker, position);
        if (status === 1)
            activePlayer = activePlayer === players[0] ? players[1] : players[0];
        return [status, gameboard.checkWinner()];
    }
    return { getMarker, playRound, getPlayer }
}

let player1;
let player2;
let game;
const nameDialog = document.querySelector(".name_selection");
nameDialog.showModal();
const submit = document.querySelector(".submit_btn");
const turnName = document.querySelector(".active_player_name");
const gameContainer = document.querySelector(".game_container");
const gameover_dialog = document.querySelector(".game_over");
const win_result = document.querySelector(".game_over>span");

submit.addEventListener("click", (event) => {
    event.preventDefault();
    player1 = document.querySelector("#player1").value;
    player2 = document.querySelector("#player2").value;

    nameDialog.close();
    game = gameControl(player1, player2);
    turnName.textContent = `${game.getPlayer()}'s turn`;
});

function playGame() {
    gameboard.makeBoard();
    gameContainer.replaceChildren();
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) {
            const btn = document.createElement("button");
            btn.dataset.i = i;
            btn.dataset.j = j;
            gameContainer.appendChild(btn);
        }

    gameover_dialog.close();
    gameContainer.addEventListener("click", (event) => {
        const marker = game.getMarker();
        const [markerStatus, roundStatus] = game.playRound([event.target.dataset.i, event.target.dataset.j]);
        if (markerStatus === 1) {

            if (marker === "X") {
                const x_img = document.createElement("img");
                x_img.src = "./assets/svg/x.svg";
                x_img.alt = "X";
                event.target.replaceChildren(x_img);
            }
            else if (marker === 'O') {
                const o_img = document.createElement("img");
                o_img.src = "./assets/svg/circle.svg";
                o_img.alt = "O";
                event.target.replaceChildren(o_img);
            }
            turnName.textContent = `${game.getPlayer()}'s turn`;
        }
        if (roundStatus !== '-') {
            gameover_dialog.showModal();
            if (roundStatus === "draw")
                win_result.textContent = "DRAW";

            else if (roundStatus === "X")
                win_result.textContent = `${player1} won`;

            else
                win_result.textContent = `${player2} won`;
        }
    });
}

playGame();

const play_again = document.querySelector(".game_over>button");
play_again.addEventListener("click", () => {
    playGame();
});