import React, { Component } from 'react'

class Board extends Component {
  constructor () {
    super()
    this.state = {
      i: -1,
      idx: -1,
      tour: [
        56, 41, 24, 9, 3, 13, 7, 22, 5, 15, 30, 47, 62, 52, 58,
        48, 33, 16, 1, 11, 26, 32, 49, 59, 53, 63, 46, 31, 14, 
        4, 10, 0, 17, 2, 8, 18, 12, 6, 23, 38, 55, 61, 51, 57,
        40, 25, 42, 36, 21, 27, 37, 20, 35, 50, 60, 43, 28,
        45, 39, 54, 44, 34, 19, 29
      ],
    }
  }

  componentDidMount() {
    this.moveKnight()
  }

  clickHandler () {
    let to = setTimeout(this.moveKnight, 100)
  }

  moveKnight() {
    console.log('moveknight called')
    if (this.state.idx > 63) {
      this.setState((state) => ({
        idx: 0,
        i: state.i++
      }))
    } else {
      this.setState((state) => ({
        idx: state.idx += 1,
        i: state.i += 1
      })
      )
    }
  }

  renderSquare (i) {
    let x = i % 8;
    let y = Math.floor(i / 8);
    let black = ( x + y ) % 2 === 1;
    let knight = i === this.state.tour[this.state.idx]
    let visited;
    return knight ? (
             black ?  (
               <div className="black square knight"></div> 
             ) : ( 
               <div className="white square knight"></div>
             ) ) : ( 
               black ? (
                 visited ? (
                   <div className="black square visited"></div>
                 ) : (
                   <div className="black square"></div> 
                 )) : (
                   visited ? (
                     <div className="white square visited"></div>
                   ) : (
                     <div className="white square"></div>
    ) ) )
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
        <button onClick={() => this.moveKnight()}>Brute Force Permutation</button>
        <button onClick={() => this.moveKnight()}>Divide and Conquer</button>
        <button onClick={() => this.moveKnight()}>Warnsdorff's Rule</button>
        <button onClick={() => this.moveKnight()}>Neural Network Solution</button>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Iterations: {this.state.i}</p>
      </div>
    </div>
    )
  }
}

export default Board;
