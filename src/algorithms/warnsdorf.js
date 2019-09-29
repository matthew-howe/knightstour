import util from '../utils/utils';


// @param {array[][]} board - 2d array of the board
// @param {array[][] moves - 2d array of the moves so far
// @param {object{}} updateBoard - function to update board state
// @param {object{}} moveKnight - function to update knight state
// @param {integer} speed - ms speed for each iteration
// @param {void} iterate - function to change local iteration state
// @param {object{}} updateSpeed - function to update speed state
const warnsdorf = async (board, moves, updateBoard, moveKnight, speed, iterate, updateSpeed) => {
    await setTimeout(async () => {
        let curBoard = board; 
        if (util.boardVisitedWarnsdorf(moves)) return true;
        iterate()

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

        if (warnsdorf(curBoard, moves, updateBoard, moveKnight, speed, iterate)) {
            return true;
        }

        return false;
    }, speed);
}

export default warnsdorf;
