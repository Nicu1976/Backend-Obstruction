using System;
using Backend_Obstruction.Classes;

namespace Backend_Obstruction.ALgorithms
{
    public class BoardFirstCell : BoardFindFirst
    {
        public BoardFirstCell(int rows, int columns, string boardState, bool getFirst) : base(rows, columns, boardState, getFirst)
        {
        }

        public override string GetMessage(int i, int j, string message)
        {
            Board.setUnavailableBoardCells(i, j);
            if (!Board.checkAvailableMoves())
            {
                return message = new Cell(i, j).ToString() + messageFinal;
            }
            else
            {
                return message = new Cell(i, j).ToString();
            }
        }
    }
}
