import util from '../utils/utils';

export default async function warnsdorf(board, moves, updateBoard, moveKnight) {
    await setTimeout(async () => {
        let curBoard = board; 
        // curBoard[5][3] = 0; // <- remove later

        if (util.boardVisited(moves)) return true;


        // get the current position of the knight and the
        // possible moves for it to make
        const lastMove = moves[moves.length - 1];
        let possibleMoves = util.findMoves(lastMove);

        // find the move with the most empty spaces
        let bestMove;
        let bestCount = 0;
        for (const move of possibleMoves) {
            const count = util.numOfEmpty( curBoard, move);
            if (count > bestCount && util.validMove( curBoard, move)) {
                bestCount = count;
                bestMove = move;
            }
        }

        // move the knight and update the board
        moves.push(bestMove);
        let row = bestMove[0]
        let column = bestMove[1];
        curBoard[row][column] = 1;
        moveKnight(bestMove);
        updateBoard(curBoard);

        if (warnsdorf(curBoard, moves, updateBoard, moveKnight)) {
            return true;
        }

        return false;
    }, 500);
}
