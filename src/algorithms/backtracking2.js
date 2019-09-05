
let board = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
]

function backtrack(board) {
    let boards = [board]
    let path = [[0,0]]

    
    // for (let i = 0; i < 20; i++) {
    while (!board.every(row => row.every(square => square === 1))) {
        board = boards.pop()
        let lastmove = path.pop();
        let x = lastmove[0]
        let y = lastmove[1]

        console.log(board)

        let moves = [
            [x - 2, y + 1], // left 2 up 1
            [x - 1, y + 2], // left 1 up 2
            [x + 1, y + 2], // right 1 up 2
            [x + 2, y + 1], // right 2 up 1
            [x + 2, y - 1], // right 2 down 1
            [x + 1, y - 2], // right 1 down 2
            [x - 1, y - 2], // left 1 down 2
            [x - 2, y - 1], // left 2 down 1
        ]

        moves = moves.filter(move => {
            if (board[move[1]] && board[move[0]]) return move
        })

        for (const move of moves) {
            let tempBoard = board
            tempBoard[move[1]][move[0]] = 1;
            boards.push(tempBoard)
            path.push([move[0], move[1]])
        }

    }
    
}

backtrack(board)
