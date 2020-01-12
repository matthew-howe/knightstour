import util from '../utils/utils'
import actionQueue from '../queue/action-queue'


const ub = (b) => console.log('new board ', b);
const mk = (m) => console.log('knight moves ', m);
// @param {array[][]} board - 2d array of the board
// @param {array[][] moves - 2d array of the moves so far
// @param {object{}} updateBoard - function to update board state
// @param {object{}} moveKnight - function to update knight state
const warnsdorf = async (board, moves, updateBoard, moveKnight, addMove) => {
        let curBoard = board; 
        
        if (actionQueue.length > 143) {
					console.log('board toured');
					return true;
				}
				if (util.boardVisitedWarnsdorf(moves)) {
						console.log('board toured');
						return true;
				}
        const lastMove = moves[moves.length - 1];
        if (curBoard[lastMove[0]][lastMove[1]] === 0) {
					  curBoard[lastMove[0]][lastMove[1]] = 1;
				}

				console.log('lastMove: ', lastMove)
        let possibleMoves = util.findMoves(lastMove);
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
        
				
        
        // TODO: remove debug blocker
        if (!bestMove) return;
        
        // move the knight and update the board
        if (bestMove[0] !== undefined && bestMove[1] !== undefined) {
            let row = bestMove[0];
            let column = bestMove[1];
						
						// enqueue actions
						actionQueue.enqueue(() => {
							addMove(bestMove);
							moveKnight(bestMove);
							updateBoard(curBoard);
					});

					
							curBoard[row][column] = 1;
							moves.push(bestMove)
			
					
					if (
						warnsdorf(curBoard, moves, updateBoard, moveKnight, addMove)
					) {
						return true;
					}
					else return false;
            


        } else {
            alert('failed to converge on correct solution!')
            return false;
        }

}

export default warnsdorf;


