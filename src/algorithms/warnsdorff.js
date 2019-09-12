import util from '../utils/utils';

export default async function warnsdorf(board, moves, updateBoard, moveKnight, speed) {
    await setTimeout(async () => {
        let curBoard = board; 

        if (util.boardVisited(moves)) return true;


        // get the current position of the knight and the
        // possible moves for it to make
        const lastMove = moves[moves.length - 1];
        let possibleMoves = util.findMoves(lastMove);

        // find the move with the most empty spaces
        let bestMove;
        let bestCount = Infinity;
        for (const move of possibleMoves) {
            const count = util.numOfEmpty( curBoard, move);
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

        if (warnsdorf(curBoard, moves, updateBoard, moveKnight)) {
            return true;
        }

        return false;
    }, 100);
}
