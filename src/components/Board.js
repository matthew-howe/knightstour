import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moveKnight, updateBoard } from '../store/board';
import backtrack from '../algorithms/backtracking';
import warnsdorf from '../algorithms/warnsdorf';
import divideandconquer from '../algorithms/divideandconquer';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      iter: 0,
      speed: 80,
      start: [[0,0]],
      timer: {}
    };

    this.backtrack = backtrack.bind(this);
    this.warnsdorf = warnsdorf.bind(this);
    this.iterate = this.iterate.bind(this)
    this.divideandconquer = divideandconquer.bind(this);
  }

  handleChange(e) {
    this.setState({ speed: e.target.value });
  }

  iterate() {
      this.setState({ iter:  this.state.iter + 1 })
  }

  updateSpeed() {
      return this.state.speed;
  }

  runAlgo(algo) {
      clearTimeout(this.state.timeout);

      this.props.moveKnight([0, 0])

      this.props.updateBoard([
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0],
      ])

      let timer = algo(
        this.props.board,
        this.state.start,
        this.props.updateBoard,
        this.props.moveKnight,
        this.state.speed,
        this.iterate
      )

      this.setState({ timer: timer })
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

    for (let i = 0; i < 144; i++) {
      squares.push(this.renderSquare(i));
    }
    return (
      <div id="main" >
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
            onClick={() => this.runAlgo(this.backtrack) }
            id="b4"
          >
            Brute Force Iterations
          </button>
          <button
            onClick={() => this.runAlgo(this.warnsdorf)}
            id="b3"
          >
            Warnsdorf's Rule
          </button>
          <button
            onClick={() =>
              this.divideandconquer(
                this.props.board,
                [2,0],
                [0,1],
                this.props.updateBoard,
                this.props.moveKnight,
                this.state.speed,
                this.iterate
              )
            }
            id="b3"
          >
            Divide and Conquer
          </button>
          <button
            onClick={() =>
              alert('coming soon!')
            }
            id="b3"
          >
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
