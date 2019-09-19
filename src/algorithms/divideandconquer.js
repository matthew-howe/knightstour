import utils from '../utils/utils'

const divideAndConquer = async (board, moves, updateBoard, moveKnight, speed, iterate) => {
  await setTimeout(async () => {
    console.log('hello world')

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

  }, 80)
}

export default divideAndConquer
