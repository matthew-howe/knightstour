// TODO: swap utils class with import statement

class utils {

    findMoves(pos) {
        // findmoves takes the [x, y] coordinates
        // of the knight and returns an array of valid
        // positions for the knight to move

        let movesArr = [
            [pos[0] - 1, pos[1] - 2],
            [pos[0] - 2, pos[1] - 1],
            [pos[0] + 1, pos[1] - 2],
            [pos[0] + 2, pos[1] - 1],
            [pos[0] - 2, pos[1] + 1],
            [pos[0] - 1, pos[1] + 2],
            [pos[0] + 1, pos[1] + 2],
            [pos[0] + 2, pos[1] + 1],
        ];
        let posMoves = movesArr.filter(move => {
            return move[0] >= 0 && move[1] >= 0 && move[0] < 12 && move[1] < 12;
        });
        return posMoves;
    }

    
    validMove(board, pos) {
        // validmove checks if the target square 
        // hasn't been visited yet
        return board[pos[0]][pos[1]] !== 1;
    }

        
    boardVisited(moves) {
        // checks if every square has been visited
        return moves.length === 143;
    }

    boardVisitedWarnsdorf(moves) {
        // adjusted for warnsdorf's moves length
        return moves.length === 145;
    }


    shuffle(array) {
        // shuffling utility
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    numOfEmpty( board, pos ) {
        let count = 0;
        let moves = this.findMoves(pos); 

        for (const move of moves) {
            if (this.validMove(board, move)) count++;
        }

        return count;
    }

    mapNumToCoords(num) {
        let y = Math.floor(num / 12);
        let x = num % 12;
        return [x, y]
    }

}

let util = new utils();


const ub = (b) => console.log('new board ', b);
const mk = (m) => console.log('knight moves ', m);
// @param {array[][]} board - 2d array of the board
// @param {array[][] moves - 2d array of the moves so far
// @param {object{}} updateBoard - function to update board state
// @param {object{}} moveKnight - function to update knight state
const warnsdorf = async (board, moves, updateBoard = ub, moveKnight = mk) => {
        let curBoard = board; 
				if (util.boardVisitedWarnsdorf(moves)) {
						console.log('board toured');
						return;
				}
        const lastMove = moves[moves.length - 1];
        if (curBoard[lastMove[0]][lastMove[1]] === 0) {
					  curBoard[lastMove[0]][lastMove[1]] = 1;
				}

				console.log('lastMove: ', lastMove)
        let possibleMoves = util.findMoves(lastMove);
        console.log('possibleMoves: ', possibleMoves)
        // find the move with the most empty spaces
        let bestMove;
        let bestCount = Infinity;
        for (const move of possibleMoves) {
            const count = util.numOfEmpty(curBoard, move);
            if (count < bestCount && util.validMove( curBoard, move)) {
                bestCount = count;
                bestMove = move;
            }
        }
        // move the knight and update the board
        if (bestMove[0] !== undefined && bestMove[1] !== undefined) {
            moves.push(bestMove);
            let row = bestMove[0];
            let column = bestMove[1];
            curBoard[row][column] = 1;
            moveKnight(bestMove);
            updateBoard(curBoard);
        } else {
            alert('failed to converge on correct solution!')
            return false;
        }

}

export default warnsdorf;


