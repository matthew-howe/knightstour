import actionQueue from "../queue/action-queue";

const warnsdorfAnime = (updateBoard, moveKnight) => {

  actionQueue.clear();

    const board = [
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
      ]
      const knight = [0, 0]

      actionQueue.startQueueing(80)

      for (let i = 1; i < 1000; i++) {


        

        knight[0] = Math.floor(Math.random() * 12);
        knight[1] = Math.floor(Math.random() * 12);
        
        
        board[Math.floor(Math.random() * 12)][Math.floor(Math.random() * 12)] = 1
        
        let newBoard = [[]];

        for (let i = 0; i < 12; i++) {
            newBoard[i] = board[i].slice();
        }

        let newKnight = knight.slice()
        
        actionQueue.enqueue(() => {         

            updateBoard(newBoard)
            moveKnight(newKnight)
        })
        
      }
    
      
}

export default warnsdorfAnime;