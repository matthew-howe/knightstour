import React, { Component } from 'react'

class Board extends Component {

  renderSquare (i) {
    let x = i % 8;
    let y = Math.floor(i / 8);
    let black = ( x + y ) % 2 === 1;
    let knight = i === 56;
    // let board = new Array(8);
    return knight ? (
      black ?  (
      <div className="black square knight"></div> 
    ) : (
      <div className="white square knight"></div>
    ) ) : ( black ? (
      <div className="black square"></div> 
    ) : (
      <div className="white square"></div>
    ) )
  }


  render () {
    let squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i))
    }
    return (
      <div id='main'>
      <div id="board">
        {squares}
      </div>
      <div id='buttons'>
        <button>Brute Force Permutation</button>
        <button>Divide and Conquer</button>
        <button>Warnsdorff's Rule</button>
        <button>Neural Network Solution</button>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Iterations: 0</p>
      </div>
    </div>
    )
  }
}

export default Board;
