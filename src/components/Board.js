import React, { Component } from 'react';

class Board extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
  }


    


  renderSquare(i) {
    let x = i % 8;
    let y = Math.floor(i / 8);
    let black = (x + y) % 2 === 1;
    let knight = false
    let visited = false 

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
          <button id="b1" >
            Brute Force Permutation
          </button>
          <button id="b2" >
            Divide and Conquer
          </button>
          <button id="b3" >
            Warnsdorff's Rule
          </button>
          <button onClick={() => this.tour()} id="b4" >
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
