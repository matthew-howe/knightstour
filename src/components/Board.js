import React, { Component } from 'react';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      i: -1,
      idx: -1,
      tour: [
        56,
        41,
        24,
        9,
        3,
        13,
        7,
        22,
        5,
        15,
        30,
        47,
        62,
        52,
        58,
        48,
        33,
        16,
        1,
        11,
        26,
        32,
        49,
        59,
        53,
        63,
        46,
        31,
        14,
        4,
        10,
        0,
        17,
        2,
        8,
        18,
        12,
        6,
        23,
        38,
        55,
        61,
        51,
        57,
        40,
        25,
        42,
        36,
        21,
        27,
        37,
        20,
        35,
        50,
        60,
        43,
        28,
        45,
        39,
        54,
        44,
        34,
        19,
        29,
      ],
    };
  }

  componentDidMount() {
    this.moveKnight();
  }

  moveKnight() {
    if (this.state.idx > 63) {
      this.setState(state => ({
        idx: 0,
        i: state.i++,
      }));
    } else {
      this.setState(state => ({
        idx: (state.idx += 1),
        i: (state.i += 1),
      }));
    }
  }

  startSim() {
    for (let i = 0; i < 2000; i++) {
      let sim = function(i) {
        if (i % 5 === 0) {
          return function() {
            document.getElementById(['b1']).click();
          };
        }
      };
      setTimeout(sim(i), 50 * i);
    }
  }

  findMoves (pos) {
    let movesArr = [
    [pos[0] - 1, pos[1] - 2],
    [pos[0] - 2, pos[1] - 1],
    [pos[0] + 1, pos[1] - 2],
    [pos[0] + 2, pos[1] - 1],
    [pos[0] - 2, pos[1] + 1],
    [pos[0] - 1, pos[1] + 2],
    [pos[0] + 1, pos[1] + 2],
      [pos[0] + 2, pos[1] + 1]
    ]
    let posMoves = movesArr.filter(move => {
      return move[0] >= 0 &&
        move[1] >= 0 &&
        move[0] < 8 &&
        move[1] < 8
    })
    return posMoves;
  }

  validMove (board, pos) {
    return board[pos[0]][pos[1]] !== 1   
  }

  boardVisited (moves) {
    return moves.length === 63
  }

  knightsTour (board, moves) {
    const curBoard = board;

    if (this.boardVisited(moves)) {
      return true;
    }

    const lastMove = moves[moves.length - 1];
    const possibleMoves = this.findMoves(lastMove);

    for (let moveIdx = 0; moveIdx < possibleMoves.length; moveIdx ++) {
      const curMove = possibleMoves[moveIdx];
      if (this.validMove(curBoard, curMove)) {
        moves.push(curMove)
        curBoard[curMove[0]][curMove[1]] = 1

        if (this.knightsTour(curBoard, moves)) {
          return true;
        }

        moves.pop()
        curBoard[curMove[0]][curMove[1]] = 0
      }
    }
    return false;
  }

  tour () {
    const board = Array(8).fill(null).map(() => Array(8).fill(0));
    let moves = [[0, 0]]
    board[0][0] = 1
    const solution = this.knightstour(board, moves)
    return solution ? moves : [];
    


  renderSquare(i) {
    let x = i % 8;
    let y = Math.floor(i / 8);
    let black = (x + y) % 2 === 1;
    let knight = i === this.state.tour[this.state.idx];
    let visitedArr = this.state.tour.filter((el, idx) => idx < this.state.idx);
    let visited = visitedArr.includes(i);

    return knight ? (
      black ? (
        <div id={i} className="black square knight" />
      ) : (
        <div id={i} className="white square knight" />
      )
    ) : black ? (
      visited ? (
        <div id={i} className="black square visited" />
      ) : (
        <div id={i} className="black square" />
      )
    ) : visited ? (
      <div id={i} className="white square visited" />
    ) : (
      <div id={i} className="white square" />
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
          <button id="b1" onClick={() => this.moveKnight()}>
            Brute Force Permutation
          </button>
          <button id="b2" onClick={() => this.moveKnight()}>
            Divide and Conquer
          </button>
          <button id="b3" onClick={() => this.moveKnight()}>
            Warnsdorff's Rule
          </button>
          <button id="b4" onClick={() => this.startSim()}>
            Neural Network Solution
          </button>
          <div />
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Iterations:{' '}
            {this.state.i}
          </p>
        </div>
      </div>
    );
  }
}

export default Board;
