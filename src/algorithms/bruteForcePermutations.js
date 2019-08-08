import util from '../utils/utils';

export default async function backtrack(board, moves, updateBoard, moveKnight) {
  this.setState(state => {
    state.iter++;
    return {
      iter: state.iter++,
    };
  });
  if (this.state.iter < 2000) {
    await setTimeout(async () => {
      let curBoard = board;
      curBoard[0][0] = 1;

      if (util.boardVisited(moves)) {
        return true;
      }

      const lastMove = moves[moves.length - 1];
      let possibleMoves = util.findMoves(lastMove);
      possibleMoves = util.shuffle(possibleMoves);

      for (let moveIdx = 0; moveIdx < possibleMoves.length; moveIdx++) {
        const curMove = possibleMoves[moveIdx];
        if (util.validMove(curBoard, curMove)) {
          moves.push(curMove);
          let row = curMove[0];
          let column = curMove[1];

          curBoard[row][column] = 1;

          this.props.moveKnight(curMove);
          this.props.updateBoard(curBoard);
          if (backtrack(curBoard, moves, updateBoard, moveKnight)) {
            return true;
          }

          moves.pop();
          curBoard[curMove[0]][curMove[1]] = 0;
          this.props.moveKnight(moves[moves.length - 1]);
          this.props.updateBoard(curBoard);
        }
      }

      curBoard[lastMove[0]][lastMove[1]] = 0;
      moves.pop();

      let random = Math.floor(Math.random() * 5) + 2;
      if (random > moves.length) random = moves.length;
      for (let i = 2; i < random; i++) {
        curBoard[moves[moves.length - i][0]][moves[moves.length - i][1]] = 0;
      }

      for (let j = 2; j < random; j++) {
        moves.pop();
      }
      console.log('moves before new', moves);

      this.props.moveKnight(moves[moves.length - 2]);
      this.props.updateBoard(curBoard);
      backtrack(curBoard, moves, updateBoard, moveKnight);
    }, this.state.speed);
  }
}
