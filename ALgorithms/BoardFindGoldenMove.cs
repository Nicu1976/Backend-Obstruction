using System;
using Backend_Obstruction.Classes;
using Backend_Obstruction.Interfaces;

namespace Backend_Obstruction.ALgorithms
{
    public class BoardFindGoldenMove : BoardFindFirst
    {
        public BoardFindGoldenMove(int rows, int columns, string boardState, bool getFirst) : base(rows, columns, boardState, getFirst)
        {
        }

        public override string GetMessage(int i, int j, string message)
        {
            //just initiate the response with the first available cell
            //until now both algorithms are the same, only difference is that it isn't go out and continue to iterate
            //in a hope to find a better solution, a close solution

            //here we set the first viable cell ad continue to search for win solution if exist
            if (message == messageNotExist)
            {
                message = new Cell(i, j).ToString();
            }
            Board tempBoard = new Board(Board);
            tempBoard.setUnavailableBoardCells(i, j);            
            if (!tempBoard.checkAvailableMoves())
            {
                //here we find the win cell and we send it
                return new Cell(i, j).ToString() + messageFinal;
            }
            return message;
        }
    }
}
