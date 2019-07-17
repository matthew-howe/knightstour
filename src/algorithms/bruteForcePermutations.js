// class bruteForcePermutations { findMoves(pos) {
//     let movesArr = [
//       [pos[0] - 1, pos[1] - 2],
//       [pos[0] - 2, pos[1] - 1],
//       [pos[0] + 1, pos[1] - 2],
//       [pos[0] + 2, pos[1] - 1],
//       [pos[0] - 2, pos[1] + 1],
//       [pos[0] - 1, pos[1] + 2],
//       [pos[0] + 1, pos[1] + 2],
//       [pos[0] + 2, pos[1] + 1],
//     ];
//     let posMoves = movesArr.filter(move => {
//       return move[0] >= 0 && move[1] >= 0 && move[0] < 8 && move[1] < 8;
//     });
//     return posMoves;
//   }

//   validMove(board, pos) {
//     return board[pos[0]][pos[1]] !== 1;
//   }

//   boardVisited(moves) {
//     return moves.length === 63;
//   }

//   tour(board, moves, updateBoard, moveKnight) {
//     const curBoard = board;

//     if (this.boardVisited(moves)) {
//       return true;
//     }

//     const lastMove = moves[moves.length - 1];
//     const possibleMoves = this.findMoves(lastMove);

//     for (let moveIdx = 0; moveIdx < possibleMoves.length; moveIdx++) {
//       const curMove = possibleMoves[moveIdx];
//       if (this.validMove(curBoard, curMove)) {
//         moves.push(curMove);
//         curBoard[curMove[0]][curMove[1]] = 1;
//         moveKnight(curMove)
//         updateBoard(curBoard)
//         if (this.tour(curBoard, moves)) {
//           return true;
//         }

//         moves.pop();
//         curBoard[curMove[0]][curMove[1]] = 0;
//         moveKnight(moves[moves.length - 1])
//         updateBoard(curBoard)
//       }
//     }
//     return false;
//   }
// }

// const bruteForce = new bruteForcePermutations

// export default bruteForce;
