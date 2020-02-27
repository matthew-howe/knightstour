import React, {Component} from 'react';
import {connect} from 'react-redux';
import {iterate, moveKnight, updateBoard, addMove, updateCurmove, updateLastmove, runScript, changeSpeed} from '../store/board';
import warnsdorf from '../algorithms/warnsdorf';
import divideandconquer from '../algorithms/divideandconquer';
import actionQueue from '../queue/action-queue';
import Square from './Square'
import warnsdorfAnime from '../algorithms/warnsdorf-anime'

class Board extends Component {
  constructor() {
    super();
    this.state = {
      speed: 80,
      start: [[0, 0]],
      curMove: [2,0],
      lastMove: [0,1]
    };

    this.warnsdorf = warnsdorf.bind(this);
    this.divideandconquer = divideandconquer.bind(this);
  }

  handleChange(e) {
			
			actionQueue.clearQueueInterval();
			actionQueue.modulateSpeed(e.target.value);
			
			this.props.changeSpeed(e.target.value);
			this.setState({speed: e.target.value});

			actionQueue.changeSpeed(e.target.value);
  }

	run(algo) {
			actionQueue.clear();
			let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
	

		if (algo === 'warnsdorf') {
			warnsdorf(board, this.props.moves, this.props.updateBoard,
			 this.props.moveKnight, this.props.addMove, this.props.iterate);
		} else {
			divideandconquer(board, this.props.curMove, this.props.lastMove,
										this.props.updateBoard, this.props.moveKnight, this.props.updateCurmove, this.props.updateLastmove, this.props.iterate)
		}
		actionQueue.startQueueing(this.props.speed);

	}

  renderSquare(i) {
    let x = i % 12;
    let y = Math.floor(i / 12);
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
        <Square serial={i} styling="black square knight" />
      ) : (
        <Square serial={i} styling="white square knight" />
      )
    ) : black ? (
      visited ? (
        <Square serial={i} styling="black square visited" />
      ) : (
        <Square serial={i} styling="black square" />
      )
    ) : visited ? (
      <Square serial={i} styling="white square visited" />
    ) : (
      <Square serial={i} styling="white square" />
    );
  }

  render() {
    let squares = [];

    for (let i = 0; i < 144; i++) {
      squares.push(this.renderSquare(i));
    }
    return (
      <div id="main">
        <div id="img">
        </div>
        <div className="middle">
          <div id="title">
            <h1>Knight's Tour</h1>
            <p>
              By <a href="http://matthw.com">Matthew Howe</a>
            </p>
          </div>
          <div id="board">{squares}</div>
        </div>
        <div id="buttons">
          <button onClick={() => this.run('warnsdorf')} id="b3">
            Warnsdorf's Rule
          </button>
          <button
            onClick={() => this.run()}
            id="b3">
            Divide and Conquer
          </button>
          <button onClick={() => warnsdorfAnime(this.props.updateBoard, this.props.moveKnight)} id="b3">
            Neural Network Solution
          </button>
          <div />
          <div>
            <p className="speed-text">Speed: {this.state.speed} ms</p>
            <input
              name="speed"
              onChange={e => {
                this.handleChange(e);
              }}
              type="range"
              min="10"
              max="500"
              value={this.state.speed}
              className="slider"
            />
          </div>
          <p className="iterations">Iterations: {this.props.iterations}</p>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
	lastMove: state.board.lastMove,
	moves: state.board.moves,
	curMove: state.board.curMove,
  board: state.board.board,
  knight: state.board.knight,
  iterations: state.board.iterations,
	speed: state.board.speed
});

const mapDispatch = dispatch => ({
  moveKnight: knight => dispatch(moveKnight(knight)),
  updateBoard: newBoard => dispatch(updateBoard(newBoard)),
  runScript: () => dispatch(runScript()),
  addMove: move => dispatch(addMove(move)),
  updateCurmove: move => dispatch(updateCurmove(move)),
  updateLastmove: move => dispatch(updateLastmove(move)),
  changeSpeed: speed => dispatch(changeSpeed(speed)),
  iterate: () => dispatch(iterate()),
});

export default connect(mapState, mapDispatch)(Board);
