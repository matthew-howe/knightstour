## Knight's Tour



A visual exploration of local search algorithms which generate solutions to the Knight's Tour Problem. The paths are beautiful because of the symmetrical characteristics of the different algorithms.

### VIEW LIVE: https://matthew-howe.github.io/knights-tour/

![Gif of placing knight and warnsdorff's tour](https://github.com/matthew-howe/knights-tour/blob/master/img/kt.gif)

A **knight's tour** is a sequence of moves of a [knight](https://en.wikipedia.org/wiki/Knight_(chess)) on a [chessboard](https://en.wikipedia.org/wiki/Chessboard) such that the knight visits every square exactly once. If the knight ends on a square that is one knight's move from the beginning square (so that it could tour the board again immediately, following the same path), the tour is closed; otherwise, it is open.

![Gif of knight's tour](https://github.com/matthew-howe/knights-tour/blob/master/img/kt2.gif)

## Steps for running

```
git clone https://github.com/matthew-howe/knights-tour.git
cd knights-tour
npm install
npm run start
```

## Algorithms

**Warnsdorff's Rule**  
 [**Source**](https://github.com/matthew-howe/knights-tour/blob/master/src/algorithms/warnsdorf.tsx)  
 Warnsdorff's rule is a [heuristic](https://en.wikipedia.org/wiki/Heuristic) first described in 1823 by H. C. von Warnsdorff for finding a single knight's tour. The knight is moved so that it always proceeds to the square from which the knight will have the *fewest* onward moves. When calculating the number of onward moves for each candidate square, we do not count moves that revisit any square already visited.

**Divide and Conquer**  
 [**Source**](https://github.com/matthew-howe/knights-tour/blob/master/src/algorithms/divideandconquer.tsx)  
 By dividing the board into smaller pieces, constructing tours on each piece, and patching the pieces together, we construct tours on the board in [linear time](https://en.wikipedia.org/wiki/Time_complexity#Linear_time).

**Nueral Network Solution**  
 The neural network is designed such that each legal knight’s move on the chessboard is represented by a neuron. Therefore, the network basically takes the shape of the knight’s graph over an n×n chess board. (A knight’s graph is simply the set of all knight moves on the board)

![Neural Net image](https://upload.wikimedia.org/wikipedia/commons/c/c9/Knight's_Tour_24x24.svg)