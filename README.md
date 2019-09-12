## Knight's Tour

A visual exploration of local search algorithms which generate solutions to the Knight's Tour Problem.

### VIEW LIVE: https://matthew-howe.github.io/knights-tour/

![screenshot](https://i.gyazo.com/95d962a1c73b8480d1002afce2b6f95a.png)


## Algorithms
  **Brute Force Backtracking**  
  Systematically enumerates over all possible tours. Backtracking when a knight runs out of valid moves

  **Warnsdorf's Algorithm**  
  Will move the knight so that it always proceeds to the square frm which the knight will have the fewest onward moves. (Not including squares already visited.)

  **Divide and Conquer**  
  Divides the board into smaller pieces, constructing tours on each piece, and patching the pieces together.

  **Nueral Network Solution**  
  Sets up a neural network where every legal knight's move is represented by a neuron. Neurons are initialized to be either 1 or 0, where 1 implies the neuron is part of the solution. When the network converges it encodes either a knight's tour or a series of two or more independent circuits within the same board.
