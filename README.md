## Knight's Tour

A visual exploration of local search algorithms which generate solutions to the Knight's Tour Problem. The paths are beautiful because of the symmetrical characteristics of the different algorithms.

### VIEW LIVE: https://matthew-howe.github.io/knights-tour/

![screenshot](https://github.com/matthew-howe/knights-tour/blob/master/img/kt.gifg)

## Steps for running

```
git clone https://github.com/matthew-howe/knights-tour.git
cd knights-tour
npm install
npm run start
```

## Algorithms

**Warnsdorf's Rule**  
 [**Source**](https://github.com/matthew-howe/knights-tour/blob/master/src/algorithms/warnsdorf.tsx)  
 Will move the knight so that it always proceeds to the square form which the knight will have the fewest onward moves. (Not including squares already visited.)

**Divide and Conquer**  
 [**Source**](https://github.com/matthew-howe/knights-tour/blob/master/src/algorithms/divideandconquer.tsx)  
 Divides the board into smaller pieces, constructing tours on each piece, and patching the pieces together.

**Nueral Network Solution**  
 The neural network is designed such that each legal knight’s move on the chessboard is represented by a neuron. Therefore, the network basically takes the shape of the knight’s graph over an n×n chess board. (A knight’s graph is simply the set of all knight moves on the board)
