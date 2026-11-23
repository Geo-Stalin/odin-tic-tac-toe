const gameboard=(()=>{
    let board=[];
    const makeBoard=()=>{
        board=[];
        for(let i=0;i<3;i++){
            board.push([]);
            for(let j=0;j<3;j++){
                board[i].push("-");
            }
        }
    };

    const placeMarker=(marker,position)=>{
        const [i,j]=position;
        board[i][j]=marker;
    };

    const checkWinner=()=>{
        
    };

    const showBoard=()=>{
        for(let i=0;i<3;i++){
            for (let j=0;j<3;j++){
                console.log(board[i][j]);
            }
            console.log(`\n`)
        }
    };

        return {makeBoard,placeMarker,showBoard};

})();