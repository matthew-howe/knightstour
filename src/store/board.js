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
  knight: 0,
  board: [],
}


export default function (state, action) {
  switch (action.type) {
    case MOVE_KNIGHT:
      return Object.assign({}, state, {knight: action.knight})
    case UPDATE_BOARD:
      return Object.assign({}, state, {board: action.board})
    case FAILURE:
      alert("Failed to converge on a correct solution. Try again.")
    case RUN_SCRIPT:
      console.log("RESET THE BOARD HERE")
    default:
      console.log("Switch function error in board store")
  }
}






