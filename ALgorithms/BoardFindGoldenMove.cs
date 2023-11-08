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
            //set the first viable cell ad continue to search for win solution if exist
            if (message == messageNotExist)
            {
                message = new Cell(i, j).ToString();
            }
            //copy the board
            Board tempBoard = new Board(Board);
            //mark the cell as occupied and mark the neghboars the same
            tempBoard.setUnavailableBoardCells(i, j);
            //check to see if id doesn't have any available cells, if yes send the cell otherwise keep the first viable cell finded and keep looping
            if (!tempBoard.checkAvailableMoves())
            {
                //here we find the win cell and we send it
                return new Cell(i, j).ToString() + messageFinal;
            }
            return message;
        }
    }
}
