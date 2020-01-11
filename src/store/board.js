import backtrack from '../algorithms/backtracking';
import warnsdorf from '../algorithms/warnsdorf';
import divideandconquer from '../algorithms/divideandconquer';

const MOVE_KNIGHT = 'MOVE_KNIGHT';
const UPDATE_BOARD = 'UPDATE_BOARD';
const FAILURE = 'FAILURE';
const RUN_SCRIPT = 'RUN_SCRIPT';
const STOP_SCRIPT = 'STOP_SCRIPT';
const CHANGE_SPEED = 'CHANGE_SPEED';
const CHANGE_SCRIPT = 'CHANGE_SCRIPT';
const CHANGE_SIZE = 'CHANGE_SIZE';

export const moveKnight = knight => ({
  type: MOVE_KNIGHT,
  knight: knight,
});

export const updateBoard = board => ({
  type: UPDATE_BOARD,
  board: board,
});

export const failure = () => ({
  type: FAILURE,
});

export const stopScript = () => ({
  type: STOP_SCRIPT,
});

export const runScript = () => ({
	type: RUN_SCRIPT
});

export const changeScript = (script) => ({
	type: CHANGE_SCRIPT,
	script
});

export const changeSize = (size) => ({
	type: CHANGE_SIZE,
	size
});

const initialState = {
  knight: [0, 0],
  lastMove: [0, 0],
  moves: [],
  curMove: [2, 0],
  lastMove: [0, 1],
  board: [
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
  ],
  iterations: 0,
  timeout: {},
  speed: 80,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MOVE_KNIGHT:
      return Object.assign({}, state, {
        knight: [action.knight[1], action.knight[0]],
      });

    case UPDATE_BOARD:
      return Object.assign({}, state, {board: action.board});

    case FAILURE:
      alert('Failed to converge on a correct solution. Try again.');
      break;

    case RUN_SCRIPT:
      return;

    case STOP_SCRIPT:

      return state;

    default:
      console.log('Switch function error in board store');
      return initialState;
  }
}
