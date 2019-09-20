class utils {

    findMoves(pos) {
        // findmoves takes the [x, y] coordinates
        // of the knight and returns an array of valid
        // positions for the knight to move

        let movesArr = [
            [pos[0] - 1, pos[1] - 2],
            [pos[0] - 2, pos[1] - 1],
            [pos[0] + 1, pos[1] - 2],
            [pos[0] + 2, pos[1] - 1],
            [pos[0] - 2, pos[1] + 1],
            [pos[0] - 1, pos[1] + 2],
            [pos[0] + 1, pos[1] + 2],
            [pos[0] + 2, pos[1] + 1],
        ];
        let posMoves = movesArr.filter(move => {
            return move[0] >= 0 && move[1] >= 0 && move[0] < 12 && move[1] < 12;
        });
        return posMoves;
    }

    
    validMove(board, pos) {
        // validmove checks if the target square 
        // hasn't been visited yet
        return board[pos[0]][pos[1]] !== 1;
    }

        
    boardVisited(moves) {
        // checks if every square has been visited
        return moves.length === 143;
    }

    boardVisitedWarnsdorf(moves) {
        // adjusted for warnsdorf's moves length
        return moves.length === 145;
    }


    shuffle(array) {
        // shuffling utility
        var currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    numOfEmpty( board, pos ) {
        let count = 0;
        let moves = this.findMoves(pos); 

        for (const move of moves) {
            if (this.validMove(board, move)) count++;
        }

        return count;
    }

    mapNumToCoords(num) {
        let y = Math.floor(num / 12);
        let x = num % 12;
        return [x, y]
    }

}

let util = new utils();


// import utils from '../utils/utils'

const board = [
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
]

const knight = [0,1]

const divideAndConquer = async (board, moves, updateBoard, moveKnight, speed, iterate) => {
  await setTimeout(async () => {

    const grid = [
      [[4,5], [5,6], [4,7], [4,7], [5,7], [6,7]],
      [[3,4], [3,6], [0,3], [3,5], [0,6], [0,7]],
      [[2,5], [1,4], [0,1], [3,4], [2,5], [1,6]],
      [[2,5], [5,6], [4,7], [0,2], [1,5], [0,6]],
      [[3,4], [1,4], [4,7], [4,7], [0,2], [1,7]],
      [[2,3], [1,3], [1,0], [3,0], [0,2], [0,1]]
    ]

    const offSetTypeOriginArr = [3, 7, 6, 2, 7, 3, 2, 6]
    const offsetTypeSubstitueArr = [4, 3, 7, 4, 0, 7, 3, 0]
    const offsetDirArr = [
      [-2,-1], [-1,-2], [1,-2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1]
    ]
  
    let gridSizeX, gridSizeY, gridLocX, gridLocY, blkChoiceX, blkChoiceY // outputs
    let pointAttribute_p, gridSizeX_p, gridSizeY_p, gridLocX_p, gridLocY_p // outputs
    

    
    const getPointGridAttribute = (n, x, y, pointAttribute_p, gridSizeX_p, gridSizeY_p, gridLocX_p, gridLocY_p) => {
      if (n < 12) {

        pointAttribute_p = 8
        gridSizeX_p = n
        gridSizeY_p = n
        gridLocX_p = x
        gridLocY_p = y

      } else {

        gridSizeX = n 
        gridSizeY = n
        gridLocX = x
        gridLocY = y

        pointAttribute_p = 8

        do {

          /* Process X */ {
      
            const halve = gridSizeX / 2
            const mod_ = halve % 2
            const left = halve - mod_
            const right = halve + mod_

            if (gridLocX < left) {

              gridSizeX = left
              blkChoiceX = 1

            } else {

              gridSizeX = right
              gridLocX -= left
              blkChoiceX = 2

            }
          }

          /* Process Y */ {

            const halve = gridSizeY / 2
            const mod_ = halve % 2
            const left = halve - mod_
            const right = halve + mod_

            if (gridLocY < left) {
              gridSizeY = left
              blkChoiceY = 1
            } else {
              gridSizeY = right
              gridLocY -= left;
              blkChoiceY = 2
            }
          }

          pointAttribute_p = 
            blkChoiceX === 1 && blkChoiceY === 1 && gridLocX === gridSizeX - 3 && gridLocY === gridSizeY - 1 ? 0 :
            blkChoiceX === 1 && blkChoiceY === 1 && gridLocX === gridSizeX - 1 && gridLocY === gridSizeY - 2 ? 1 :
            blkChoiceX === 2 && blkChoiceY === 1 && gridLocX === 1             && gridLocY === gridSizeY - 3 ? 2 :
            blkChoiceX === 2 && blkChoiceY === 1 && gridLocX === 0             && gridLocY === gridSizeY - 1 ? 3 :
            blkChoiceX === 2 && blkChoiceY === 2 && gridLocX === 2             && gridLocY === 0             ? 4 :
            blkChoiceX === 2 && blkChoiceY === 2 && gridLocX === 0             && gridLocY === 1             ? 5 :
            blkChoiceX === 1 && blkChoiceY === 2 && gridLocX === gridSizeX - 2 && gridLocY === 2             ? 6 :
            blkChoiceX === 1 && blkChoiceY === 2 && gridLocX === gridSizeX - 1 && gridLocY === 0             ? 7 : pointAttribute_p

          } while (!((gridSizeX <= 12 && gridSizeY <= 12) && (gridSizeX < 12 || gridSizeY < 12)))

          gridSizeX_p = gridSizeX
          gridSizeY_p = gridSizeY
          gridLocX_p = gridLocX
          gridLocY_p = gridLocY
      }
    }

    let next_a_offsetType_p, next_b_offsetType_p
    const getPossibleNextPointOffsetType = (n, x, y) => {
  
      let pointAttribute, gridSizeX, gridSizeY, gridLocX, gridLocY
      getPointGridAttribute(n, x, y, pointAttribute, gridSizeX, gridSizeY, gridLocX, gridLocY)

      const shoudReverse = gridSizeX < gridSizeY

      if (shouldReverse) {
        /* Swap gridSizeX and gridSizeY */ {
            const t = gridSizeX
            gridSizeX = gridSizeY
            gridSizeY = t
        }

        /* Swap gridSizeX and gridSizeY */ {
          const t = gridLocX
          gridLocX = gridLocY
          gridLocY = t
        }
      }

      let p;

      if (gridSizeX == 6 && gridSizeY == 6) p = Grid6_6[gridLocY][gridLocX];
      else if (gridSizeX == 8 && gridSizeY == 6) p = Grid6_8[gridLocY][gridLocX];
      else if (gridSizeX == 8 && gridSizeY == 8) p = Grid8_8[gridLocY][gridLocX];
      else if (gridSizeX == 10 && gridSizeY == 8) p = Grid8_10[gridLocY][gridLocX];
      else if (gridSizeX == 10 && gridSizeY == 10) p = Grid10_10[gridLocY][gridLocX];
      else if (gridSizeX == 12 && gridSizeY == 10)  p = Grid10_12[gridLocY][gridLocX];
      else console.log('error in getPontGridAttribute grid size')


      let next_a_offsetType = p[0];
      let next_b_offsetType = p[1]

      if (shouldReverse) {
          next_a_offsetType = (9 - next_a_offsetType) % 8
          next_b_offsetType = (9 - next_b_offsetType) % 8
      } 


      if (pointAttribute !== 8) {

        let pathOrigin = offsetTypeOriginArr[pointAttribute]
        let pathSubstitut = offsetTypeSubstituteArr[pointAttribute]
        if (next_a_offsetType === paathOrigin) next_a_offsetType === pathSubstitute
        else if (next_b_offsetType === pathOrigin) next_b_offsetType = pathSubstitute
        else console.log('pathOrigin must always be one of next_a_offsetType and next_b_offset')
      }

      next_a_offsetType_p = next_a_offsetType
      next_b_offsetType_p = next_b_offsetType
    }




    let next_b_x_p, next_a_y_p, next_a_x_p, next_b_y_p
    const getPossibleNextPoint = (n, x, y, next_a_x_p, next_a_y_p, next_b_x_p, next_b_y_p) => {

      let next_a_offsetType, next_b_offsetType
      getPossibleNextPointOffsetType(n, x, y, next_a_offsetType, next_b_offsetType)

      let p_a = offsetDirArr[next_a_offsetType]
      let p_b = offsetDir[next_b_offsetType]

      next_a_x_p = x + p_a[0]
      next_a_y_p = y + p_a[1]
      next_b_x_p = x + p_b[0]
      next_b_y_p = y + p_b[1]
    }







    let last_x, last_y, next_x_p, next_y_p
    const getNextPoint = (n, x, y, last_x, last_y, next_x_p, next_y_p) => {

      let next_a_x, next_a_y, next_b_x, next_b_y 
      getPossibleNextPoint(n, x, y, next_a_x, next_a_y, next_b_x, next_b_y)

      if (next_a_x === last_x && next_a_y === last_y) {
        next_x_p = next_b_x
        next_y_p = next_b_y
      } else if (next_b_x === last_x && next_b_y === last_y) {
        next_x_p = next_a_x
        next_y_p = next_a_y
      } else { console.log('error in getNextPoint') }
    }





    const pointSerialize = (n, x, y) => x * n + y



    const getNextPointSerialize = (n, x, y, last_x, last_y) => {

      let next_x, next_y;
      getNextPoint(n, x, y, last_x, last_y, next_x, next_y)

      return pointSerialize(n, next_x, next_y)
    }
      
     

  }, 80)
}

// export default divideAndConquer
