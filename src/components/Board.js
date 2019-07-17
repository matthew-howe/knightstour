import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moveKnight, updateBoard } from '../store/board';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      iter: 0
    }
  }

  findMoves(pos) {
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
      return move[0] >= 0 && move[1] >= 0 && move[0] < 8 && move[1] < 8;
    });
    return posMoves;
  }

  validMove(board, pos) {
    return board[pos[0]][pos[1]] !== 1;
  }

  boardVisited(moves) {
    return moves.length === 63;
  }

   async tour(board, moves, updateBoard, moveKnight) {
    this.setState(state => {
      console.log(state.iter)
      state.iter++
      return {
        iter: state.iter++
      }
    })
     if (this.state.iter < 200) {
    console.log('starting new tour', this.state)
     await setTimeout(() => {
      let curBoard = board;

      if (this.boardVisited(moves)) {
        return true;
      }

      const lastMove = moves[moves.length - 1];
      const possibleMoves = this.findMoves(lastMove);

      for (let moveIdx = 0; moveIdx < possibleMoves.length; moveIdx++) {
        const curMove = possibleMoves[moveIdx];
        console.log(curMove)
        if (this.validMove(curBoard, curMove)) {
          moves.push(curMove);
          let row = curMove[0]
          let column = curMove[1]

          curBoard[row][column] = 1
          
          
          this.props.moveKnight(curMove);
          this.props.updateBoard(curBoard);
          console.log('before new tour', curMove)
          if (this.tour(curBoard, moves, updateBoard, moveKnight)) {
            console.log('hit true', curMove)
            return true 
          } 

          console.log('hit the pop spot') 
          moves.pop();
          curBoard[curMove[0]][curMove[1]] = 0;
          this.props.moveKnight(moves[moves.length - 1]);
          this.props.updateBoard(curBoard);
          
        }
      }
      console.log('hit false', lastMove) 
      return false; 
     }, 1000)
     }
  }

  renderSquare(i) {
    let x = i % 8;
    let y = Math.floor(i / 8);
    let black = (x + y) % 2 === 1;
    let knight;
    let visited;
    if (this.props.knight) {
      knight = this.props.knight[0] === x && this.props.knight[1] === y;
    }
    if (this.props.board) {
      visited = this.props.board[y][x] === 1;
    }

    return knight ? (
      black ? (
        <div key={i} className="black square knight" />
      ) : (
        <div key={i} className="white square knight" />
      )
    ) : black ? (
      visited ? (
        <div key={i} className="black square visited" />
      ) : (
        <div key={i} className="black square" />
      )
    ) : visited ? (
      <div key={i} className="white square visited" />
    ) : (
      <div key={i} className="white square" />
    );
  }

  render() {
    let squares = [];

    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }
    return (
      <div id="main">
        <div id="board">{squares}</div>
        <div id="buttons">
          <button id="b1">Brute Force Permutation</button>
          <button id="b2">Divide and Conquer</button>
          <button id="b3">Warnsdorff's Rule</button>
          <button
            onClick={() =>
              this.tour(
                this.props.board,
                [[0, 0]],
                this.props.updateBoard,
                this.props.moveKnight
              )
            }
            id="b4"
          >
            Neural Network Solution
          </button>
          <div />
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Iterations:{' '}
            {this.state.iter} 
          </p>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  board: state.board.board,
  knight: state.board.knight,
  iterations: state.board.iterations,
});

const mapDispatch = dispatch => ({
  moveKnight: (knight) => dispatch(moveKnight(knight)),
  updateBoard: (newBoard) => dispatch(updateBoard(newBoard)),
});

export default connect(
  mapState,
  mapDispatch
)(Board);
