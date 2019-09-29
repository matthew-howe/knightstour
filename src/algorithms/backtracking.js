import util from '../utils/utils';

// @param {array[][]} board - 2d array of the board
// @param {array[][] moves - 2d array of the moves so far
// @param {object{}} updateBoard - function to update board state
// @param {object{}} moveKnight - function to update knight state
// @param {integer} speed - ms speed for each iteration
// @param {void} iterate - function to change local iteration state
// @param {object{}} updateSpeed - function to update speed state
const backtrack = async (
  board,
  moves,
  updateBoard,
  moveKnight,
  speed,
  iterate,
  updateSpeed
) => {
  setTimeout(async () => {
    iterate();
    let curBoard = board;
    curBoard[0][0] = 1;

    if (util.boardVisited(moves)) return true;

    const curPosition = moves[moves.length - 1];
    let possibleMoves = util.findMoves(curPosition);
    possibleMoves = util.shuffle(possibleMoves);

    for (let moveIdx = 0; moveIdx < possibleMoves.length; moveIdx++) {
      const curMove = possibleMoves[moveIdx];
      if (util.validMove(curBoard, curMove)) {
        moves.push(curMove);
        let row = curMove[0];
        let column = curMove[1];

        curBoard[row][column] = 1;

        moveKnight(curMove);
        updateBoard(curBoard);
        if (
          backtrack(curBoard, moves, updateBoard, moveKnight, speed, iterate)
        ) {
          return true;
        }


      }
    }

    console.log('ended', 
      moves[moves.length - 1]
    )

  }, 10);
};

export default backtrack;
