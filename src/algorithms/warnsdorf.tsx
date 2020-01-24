import util from "../utils/utils";
import actionQueue from "../queue/action-queue";

// @param {array[][]} board - 2d array of the board
// @param {array[][] moves - 2d array of the moves so far
// @param {object{}} updateBoard - function to update board state
// @param {object{}} moveKnight - function to update knight state
const warnsdorf = async (
  board: any,
  moves: any,
  updateBoard: any,
  moveKnight: any,
  addMove: any,
  iterate: any
) => {
  let curBoard = board;
  if (util.boardVisitedWarnsdorf(moves)) {
    console.log("board toured");
    return true;
  }
  const lastMove = moves[moves.length - 1];
  if (curBoard[lastMove[0]][lastMove[1]] === 0) {
    curBoard[lastMove[0]][lastMove[1]] = 1;
  }

  console.log("lastMove: ", lastMove);
  let possibleMoves = util.findMoves(lastMove);
  // find the move with the most empty spaces
  let bestMove: number[] = [0, 0];
  let bestCount = Infinity;
  for (const move of possibleMoves) {
    const count = util.numOfEmpty(curBoard, move);
    if (count < bestCount && util.validMove(curBoard, move)) {
      bestCount = count;
      bestMove = move;
    }
  }

  // move the knight and update the board
  if (bestMove[0] !== undefined && bestMove[1] !== undefined) {
    let row = bestMove[0];
    let column = bestMove[1];

    // enqueue actions
    actionQueue.enqueue(() => {
      addMove(bestMove);
      moveKnight(bestMove);
      updateBoard(curBoard);
      iterate();
    });

    curBoard[row][column] = 1;
    moves.push(bestMove);

    if (warnsdorf(curBoard, moves, updateBoard, moveKnight, addMove, iterate)) {
      return true;
    } else return false;
  } else {
    alert("failed to converge on correct solution!");
    return false;
  }
};

export default warnsdorf;
