import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moveKnight, updateBoard } from '../store/board';
import backtrack from '../algorithms/backtracking';
import warnsdorff from '../algorithms/warnsdorff';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      iter: 0,
      speed: 100,
    };

    this.backtrack = backtrack.bind(this);
    this.warnsdorff = warnsdorff.bind(this);
  }

  handleChange(e) {
    this.setState({ speed: e.target.value });
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
          <div id="img">
              <img className="img" alt="knight" src="https://i.imgur.com/rDN4qFr.jpg" />
          </div>
          <div className="middle">
      <div id="title">
        <h1>Knight's Tour</h1>
        <p>By <a href="http://matthewhowe.net">Matthew Howe</a></p>
      </div>
        <div id="board">{squares}</div>
    </div>
        <div id="buttons">
          <button
            onClick={() =>
              this.backtrack(
                this.props.board,
                [[0, 0]],
                this.props.updateBoard,
                this.props.moveKnight,
                this.state.speed
              )
            }
            id="b4"
          >
            Brute Force Iterations
          </button>
          <button
            onClick={() =>
              this.warnsdorff(
                this.props.board,
                [[5, 3]],
                this.props.updateBoard,
                this.props.moveKnight,
                this.state.speed
              )
            }
            id="b3"
          >
            Warnsdorf's Algorithm
          </button>
          <button
            onClick={() =>
              this.warnsdorff(
                this.props.board,
                [[5, 3]],
                this.props.updateBoard,
                this.props.moveKnight
              )
            }
            id="b3"
          >
            Divide and Conquer
          </button>
          <button
            onClick={() =>
              this.warnsdorff(
                this.props.board,
                [[5, 3]],
                this.props.updateBoard,
                this.props.moveKnight
              )
            }
            id="b3"
          >
              Neural Network Algorithm
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
          <p className="iterations">Iterations: {this.state.iter}</p>
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
  moveKnight: knight => dispatch(moveKnight(knight)),
  updateBoard: newBoard => dispatch(updateBoard(newBoard)),
});

export default connect(
  mapState,
  mapDispatch
)(Board);
