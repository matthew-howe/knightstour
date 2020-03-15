import actionQueue from '../queue/action-queue';
import utils from '../utils/utils';

// returns the coordinates of the next move as an array [x, y]
// @param {integer} x - x position of knight
// @param {integer} y - y position of knight
// @param {integer} lastX - last x position of knight
// @param {integer} lastY - last y position of knight
function getNextPoint(x: number, y: number, lastX: number, lastY: number) {
  const offsetTypeOriginArr = [3, 7, 6, 2, 7, 3, 2, 6];
  const offsetTypeSubstituteArr = [4, 3, 7, 4, 0, 7, 3, 0];
  const offsetDirArr = [
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
  ];

  // returns [gridSizeX, gridSizeY, gridLocX, gridLocY, pointAttribute]
  // @param {integer} x - x position of the knight
  // @param {integer} y - y position of the knight
  function getPointGridAttribute(x: number, y: number) {
    let gridSizeX = 12;
    let gridSizeY = 12;
    let gridLocX = x;
    let gridLocY = y;
    let blkChoiceX, blkChoiceY;

    let pointAttribute = 8;

    do {
      /* process x  */

      let halve = gridSizeX / 2;
      let mod_ = halve % 2;
      let left = halve - mod_;
      let right = halve + mod_;

      if (gridLocX < left) {
        gridSizeX = left;
        blkChoiceX = 1;
      } else {
        gridSizeX = right;
        gridLocX -= right;
        blkChoiceX = 2;
      }

      /* process y */
      halve = gridSizeY / 2;
      mod_ = halve % 2;
      left = halve - mod_;
      right = halve + mod_;

      if (gridLocY < left) {
        gridSizeY = left;
        blkChoiceY = 1;
      } else {
        gridSizeY = right;
        gridLocY -= left;
        blkChoiceY = 2;
      }

      pointAttribute =
        blkChoiceX === 1 &&
        blkChoiceY === 1 &&
        gridLocX === gridSizeX - 3 &&
        gridLocY === gridSizeY - 1
          ? 0
          : blkChoiceX === 1 &&
            blkChoiceY === 1 &&
            gridLocX === gridSizeX - 1 &&
            gridLocY === gridSizeY - 2
          ? 1
          : blkChoiceX === 2 &&
            blkChoiceY === 1 &&
            gridLocX === 1 &&
            gridLocY === gridSizeY - 3
          ? 2
          : blkChoiceX === 2 &&
            blkChoiceY === 1 &&
            gridLocX === 0 &&
            gridLocY === gridSizeY - 1
          ? 3
          : blkChoiceX === 2 &&
            blkChoiceY === 2 &&
            gridLocX === 2 &&
            gridLocY === 0
          ? 4
          : blkChoiceX === 2 &&
            blkChoiceY === 2 &&
            gridLocX === 0 &&
            gridLocY === 1
          ? 5
          : blkChoiceX === 1 &&
            blkChoiceY === 2 &&
            gridLocX === gridSizeX - 2 &&
            gridLocY === 2
          ? 6
          : blkChoiceX === 1 &&
            blkChoiceY === 2 &&
            gridLocX === gridSizeX - 1 &&
            gridLocY === 0
          ? 7
          : pointAttribute;
    } while (
      !(
        gridSizeX <= 12 &&
        gridSizeY <= 12 &&
        (gridSizeX < 12 || gridSizeY < 12)
      )
    );

    return [gridSizeX, gridSizeY, gridLocX, gridLocY, pointAttribute];
  }

  function getPossibleNextPointOffsetType(x: number, y: number) {
    const Grid6_6 = [
      [
        [4, 5],
        [5, 6],
        [4, 7],
        [4, 7],
        [5, 7],
        [6, 7],
      ],
      [
        [3, 4],
        [3, 6],
        [0, 3],
        [3, 5],
        [0, 6],
        [0, 7],
      ],
      [
        [2, 5],
        [1, 4],
        [0, 1],
        [3, 4],
        [2, 5],
        [1, 6],
      ],
      [
        [2, 5],
        [5, 6],
        [4, 7],
        [0, 2],
        [1, 5],
        [0, 6],
      ],
      [
        [3, 4],
        [1, 4],
        [4, 7],
        [4, 7],
        [0, 2],
        [1, 7],
      ],
      [
        [2, 3],
        [1, 3],
        [1, 0],
        [3, 0],
        [0, 2],
        [0, 1],
      ],
    ];

    let [
      gridSizeX,
      gridSizeY,
      gridLocX,
      gridLocY,
      pointAttribute,
    ] = getPointGridAttribute(x, y);

    const shouldReverse = gridSizeX < gridSizeY;

    if (shouldReverse) {
      /* swap gridSizeX and gridSizeY */
      let t = gridSizeX;
      gridSizeX = gridSizeY;
      gridSizeY = t;

      /* swap gridSizeX and gridSizeY */
      t = gridLocX;
      gridLocX = gridLocY;
      gridLocY = t;
    }

    const p = Grid6_6[gridLocY][gridLocX];
    let next_a_offsetType: any = p[0];
    let next_b_offsetType: any = p[1];

    if (shouldReverse) {
      next_a_offsetType = (9 - next_a_offsetType) % 8;
      next_b_offsetType = (9 - next_b_offsetType) % 8;
    }

    if (pointAttribute !== 8) {
      let pathOrigin = offsetTypeOriginArr[pointAttribute];
      let pathSubstitute = offsetTypeSubstituteArr[pointAttribute];
      if (next_a_offsetType === pathOrigin) {
        next_a_offsetType = pathSubstitute;
      } else if (next_b_offsetType === pathOrigin) {
        next_b_offsetType = pathSubstitute;
      } else {
        console.log(
          'pathOrigin must always be one of next_a_offsetType and next_b_offset',
        );
      }
    }

    return [
      gridSizeX,
      gridSizeY,
      gridLocX,
      gridLocY,
      pointAttribute,
      p,
      next_a_offsetType,
      next_b_offsetType,
    ];
  }

  function getPossibleNextPoint(x: number, y: number) {
    let [
      gridSizeX,
      gridSizeY,
      gridLocX,
      gridLocY,
      pointAttribute,
      p,
      next_a_offsetType,
      next_b_offsetType,
    ] = getPossibleNextPointOffsetType(x, y);

    let p_a = offsetDirArr[next_a_offsetType];
    let p_b = offsetDirArr[next_b_offsetType];
    let next_a_x_p = x + p_a[0];
    let next_a_y_p = y + p_a[1];
    let next_b_x_p = x + p_b[0];
    let next_b_y_p = y + p_b[1];

    return [p_b, next_a_x_p, next_a_y_p, next_b_x_p, next_b_y_p];
  }
  //

  let nextX: any, nextY: any;

  let [
    p_b,
    next_a_x_p,
    next_a_y_p,
    next_b_x_p,
    next_b_y_p,
  ] = getPossibleNextPoint(x, y);

  if (next_a_x_p === lastX && next_a_y_p === lastY) {
    nextX = next_b_x_p;
    nextY = next_b_y_p;
  } else if (next_b_x_p === lastX && next_b_y_p === lastY) {
    nextX = next_a_x_p;
    nextY = next_a_y_p;
  } else {
    nextX = next_a_x_p;
    nextY = next_a_y_p;
    console.log('Neither of the next pointers match the lastXY (getNextPoint');
  }

  console.log('\n', 'lastX: ', lastX, 'lastY: ', lastY, '\n');
  console.log('\n', 'nextX: ', nextX, 'nextY: ', nextY, '\n');
  return [nextX, nextY];
}

const pointSerialize = (x: any, y: any) => x * 12 + y;

function getNextPointSerialize(
  x: number,
  y: number,
  lastX: number,
  lastY: number,
) {


  let [nextX, nextY] = getNextPoint(x, y, lastX, lastY);
  return pointSerialize(nextX, nextY);
}

const divideandconquer = async (
  board: any,
  curmove: Array<number>,
  lastmove: any,
  updateBoard: any,
  moveKnight: any,
  updateCurmove: any,
  updateLastmove: any,
  iterate: any,
  addMove: any,
  reset: any
) => {
  let visited = true;
  for (const row of board)
    for (const square of row) if (square === 0) visited = false;
  if (visited) return;

  let curBoard: number[][] = [];

  for (let i = 0; i < 12; i++) {
    curBoard[i] = board[i].slice();
  }

  if (Array.isArray(curmove[0])) curmove = curmove[0];

  if (lastmove === undefined) {
    lastmove = utils.findMoves(curmove)[0]
  }


  curBoard[curmove[0]][curmove[1]] = 1;

  const nextmove = getNextPoint(
    curmove[0],
    curmove[1],
    lastmove[0],
    lastmove[1],
  );
  if (curBoard[lastmove[0]][lastmove[1]] === 0) {
    curBoard[lastmove[0]][lastmove[1]] = 1;
  }


  if (curBoard[nextmove[0]] === undefined) {
    alert('Failed to converge on a solution, Please try again!')
    reset()
    return
  } else if (curBoard[nextmove[0]][nextmove[1]] === undefined) {
    alert('Failed to converge on a solution, Please try again!')
    reset()
    return
  }

  actionQueue.enqueue(() => {
    iterate();
    moveKnight(nextmove);
    updateBoard(curBoard);
    updateCurmove(curmove);
    updateLastmove(lastmove);
    addMove(curmove.slice())
  });

  curBoard[nextmove[0]][nextmove[1]] = 1;

  if (
    divideandconquer(
      curBoard,
      nextmove,
      curmove,
      updateBoard,
      moveKnight,
      updateCurmove,
      updateLastmove,
      iterate,
      addMove,
      reset
    )
  )
    return true;
  else return false;
};

export default divideandconquer;
