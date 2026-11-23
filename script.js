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
            console.log(`\n`)
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
    let activePlayer=players[0];

    const getMarker=()=>{
        return activePlayer.marker;
    }
    
    const playRound=(position)=>{
        const status= gameboard.placeMarker(activePlayer.marker,position);
        if(status===1)
            activePlayer= activePlayer===players[0]?players[1]:players[0];
        return gameboard.checkWinner();
    }
    return {getMarker, playRound}
}

const game = gameControl('geo', 'zen');



