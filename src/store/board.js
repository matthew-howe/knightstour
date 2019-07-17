const MOVE_KNIGHT = "MOVE_KNIGHT"
const UPDATE_BOARD = "UPDATE_BOARD"
const FAILURE = "FAILURE"
const RUN_SCRIPT = "RUN_SCRIPT"

export const moveKnight = (knight) => ({
  type: MOVE_KNIGHT,
  knight: knight
})

export const updateBoard = (board) => ({
  type: UPDATE_BOARD,
  board: board
})

export const failure = () => ({
  type: FAILURE,
})

export const runScript = () => ({
  type: RUN_SCRIPT,
})

const initialState = {
  knight: [0, 0],
  board: [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  ],
  iterations: 0
}


export default function (state = initialState, action) {
  switch (action.type) {
    case MOVE_KNIGHT:
      return Object.assign({}, state, {knight: [action.knight[1], action.knight[0]]})
    case UPDATE_BOARD:
      return Object.assign({}, state, {board: action.board})
    case FAILURE:
      alert("Failed to converge on a correct solution. Try again.")
      break;
    case RUN_SCRIPT:
      return initialState // reset the board
    default:
      console.log("Switch function error in board store")
      return initialState
  }
}






