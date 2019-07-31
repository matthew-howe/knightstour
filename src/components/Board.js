import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moveKnight, updateBoard } from '../store/board';
import Slider, { Range } from 'rc-slider';
// import 'rc-slider/assests/index.css';


class Board extends Component {
  constructor() {
    super();
    this.state = {
		iter: 0,
		speed: 100
    }
  }

  handleChange(e) {
	this.setState({ speed: e.target.value})
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

  shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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

   async tour(board, moves, updateBoard, moveKnight) {
    this.setState(state => {
      state.iter++
      return {
        iter: state.iter++
      }
    })
     if (this.state.iter < 2000) {
     await setTimeout(async () => {
      let curBoard = board;
      curBoard[0][0] = 1

      if (this.boardVisited(moves)) {
        return true;
      }

      const lastMove = moves[moves.length - 1];
      const lastlastMove = moves[moves.length - 2];
      const lastlastlastMove = moves[moves.length - 3];
      const llllMove = moves[moves.length - 4];
      let possibleMoves = this.findMoves(lastMove);
      possibleMoves = this.shuffle(possibleMoves)

      for (let moveIdx = 0; moveIdx < possibleMoves.length; moveIdx++) {
        const curMove = possibleMoves[moveIdx];
        if (this.validMove(curBoard, curMove)) {
          moves.push(curMove);
          let row = curMove[0]
          let column = curMove[1]

          curBoard[row][column] = 1
          
          
          this.props.moveKnight(curMove);
          this.props.updateBoard(curBoard);
          if (this.tour(curBoard, moves, updateBoard, moveKnight)) {
            return true 
          } 

          moves.pop();
          curBoard[curMove[0]][curMove[1]] = 0;
          this.props.moveKnight(moves[moves.length - 1]);
          this.props.updateBoard(curBoard);
          
        }
      }
       curBoard[lastMove[0]][lastMove[1]] = 0
       curBoard[lastlastMove[0]][lastlastMove[1]] = 0
       curBoard[lastlastlastMove[0]][lastlastlastMove[1]] = 0
       curBoard[llllMove[0]][llllMove[1]] = 0
       moves.pop()
       moves.pop()
       moves.pop()
       moves.pop()
       this.props.moveKnight(moves[moves.length - 2]);
       this.props.updateBoard(curBoard);
      this.tour(curBoard, moves, updateBoard, moveKnight) 
     }, this.state.speed)
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
            Brute Force Permutations
          </button>
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
            Warnsdorf's Algorithm
          </button>
          <div />
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Iterations:{' '}
            {this.state.iter} 
          </p>
		  <p>
			  
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Speed:{' '}
            {this.state.speed} ms
		  </p>
		  <input
			  name="speed"
			  onChange={e => {
				  this.handleChange(e)
			  }}
			  type="range"
			  min="10"
			  max="500"
			  value={this.state.speed}
			  className="slider"
			/>

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
