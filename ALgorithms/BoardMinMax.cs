using System;
using Backend_Obstruction.Classes;

namespace Backend_Obstruction.ALgorithms
{
    public class BoardMinMax : BoardFindFirst
    {
        private static int maxDepth = 3;

        public BoardMinMax(int rows, int columns, string boardState, bool getFirst) : base(rows, columns, boardState, getFirst)
        {
        }

        public override string FindCell()
        {
            string message = messageNotExist;

            int bestMoveScore = int.MinValue;
            int bestMoveRow = -1;
            int bestMoveCol = -1;

            for (int row = 0; row < Board.Rows; row++)
            {
                for (int col = 0; col < Board.Columns; col++)
                {
                    if (Board.BoardArray[row, col] == Board.availableCell)
                    {
                        Board.BoardArray[row, col] = Board.blockedCell;
                        int moveScore = Minimax(Board, false, maxDepth, int.MinValue, int.MaxValue);
                        Board.BoardArray[row, col] = Board.availableCell; // Undo the move

                        if (moveScore > bestMoveScore)
                        {
                            bestMoveScore = moveScore;
                            bestMoveRow = row;
                            bestMoveCol = col;
                            Board.setUnavailableBoardCells(row, col);

                            message = bestMoveRow.ToString() + bestMoveCol.ToString();
                            message = Board.checkAvailableMoves() ? message : message + messageFinal;
                        }
                    }
                }
            }

            return message;
        }

        private int Minimax(Board currentBoard, bool maximizingPlayer, int depth, int alpha, int beta)
        {
            if (depth == 0 || !currentBoard.checkAvailableMoves())
            {
                return EvaluateBoard(currentBoard);
            }

            if (maximizingPlayer)
            {
                int maxEval = int.MinValue;

                for (int i = 0; i < currentBoard.Rows; i++)
                {
                    for (int j = 0; j < currentBoard.Columns; j++)
                    {
                        if (currentBoard.BoardArray[i, j] == Board.availableCell)
                        {
                            currentBoard.BoardArray[i, j] = Board.blockedCell;
                            int moveValue = Minimax(currentBoard, false, depth - 1, alpha, beta);
                            currentBoard.BoardArray[i, j] = Board.availableCell;

                            maxEval = Math.Max(maxEval, moveValue);

                            // Implement Alpha-Beta Pruning
                            alpha = Math.Max(alpha, moveValue);
                            if (beta <= alpha)
                            {
                                break; // Prune the remaining nodes
                            }
                        }
                    }
                }

                return maxEval;
            }
            else
            {
                int minEval = int.MaxValue;

                for (int i = 0; i < currentBoard.Rows; i++)
                {
                    for (int j = 0; j < currentBoard.Columns; j++)
                    {
                        if (currentBoard.BoardArray[i, j] == Board.availableCell)
                        {
                            currentBoard.BoardArray[i, j] = Board.blockedCell;
                            int moveValue = Minimax(currentBoard, true, depth - 1, alpha, beta);
                            currentBoard.BoardArray[i, j] = Board.availableCell;

                            minEval = Math.Min(minEval, moveValue);

                            // Implement Alpha-Beta Pruning
                            beta = Math.Min(beta, moveValue);
                            if (beta <= alpha)
                            {
                                break; // Prune the remaining nodes
                            }
                        }
                    }
                }

                return minEval;
            }
        }

        private int EvaluateBoard(Board currentBoard)
        {
            // Define your evaluation criteria and assign weights to them
            int maximizingPlayerScore = 0;
            int minimizingPlayerScore = 0;

            // Example: Count the number of available cells and blocked cells
            for (int row = 0; row < currentBoard.Rows; row++)
            {
                for (int col = 0; col < currentBoard.Columns; col++)
                {
                    if (currentBoard.BoardArray[row, col] == Board.availableCell)
                    {
                        maximizingPlayerScore++;
                    }
                    else if (currentBoard.BoardArray[row, col] == Board.blockedCell)
                    {
                        minimizingPlayerScore++;
                    }
                }
            }

            // Assign a value to the game state based on the evaluation criteria
            int evaluation = maximizingPlayerScore - minimizingPlayerScore;

            return evaluation;
        }
    }
}
