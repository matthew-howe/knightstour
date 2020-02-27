const MOVE_KNIGHT = 'MOVE_KNIGHT';
const UPDATE_BOARD = 'UPDATE_BOARD';
const FAILURE = 'FAILURE';
const RUN_SCRIPT = 'RUN_SCRIPT';
const STOP_SCRIPT = 'STOP_SCRIPT';
const CHANGE_SPEED = 'CHANGE_SPEED';
const CHANGE_SCRIPT = 'CHANGE_SCRIPT';
const CHANGE_SIZE = 'CHANGE_SIZE';
const ADD_MOVE = 'ADD_MOVE';
const UPDATE_CURMOVE = 'UPDATE_CURMOVE';
const UPDATE_LASTMOVE = 'UPDATE_LASTMOVE';
const ITERATE = 'ITERATE';

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

export const addMove = (move) => ({
	type: ADD_MOVE,
	move
});

export const changeSpeed = speed => ({
		type: CHANGE_SPEED,
		speed
})

export const updateCurmove = (move) => ({
	type: UPDATE_CURMOVE,
	move
})

export const updateLastmove = (move) => ({
	type: UPDATE_LASTMOVE,
	move
})

export const iterate = () => ({
	type: ITERATE
})

export const modulateSpeed = speed => ({
		type: modulateSpeed,
		speed
})

const initialState = {
  knight: [0, 0],
  moves: [[0,0]],
  curMove: [0, 2],
  lastMove: [1, 0],
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
		case CHANGE_SPEED:
			return Object.assign({}, state, {
				speed: action.speed
			})
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

      return state;

    case STOP_SCRIPT:

      return state;

		case ITERATE:
			return Object.assign({}, state, {
				iterations: state.iterations + 1
			});
			
		case ADD_MOVE:
			return Object.assign({}, state, {
				moves: [...state.moves, action.move]
			});
			
		case UPDATE_CURMOVE:
			return Object.assign({}, state, {
				curMove: action.move
			});
		case UPDATE_LASTMOVE:
			return Object.assign({}, state, {
				lastMove: action.move
			});

    default:
      return initialState;
  }
}
