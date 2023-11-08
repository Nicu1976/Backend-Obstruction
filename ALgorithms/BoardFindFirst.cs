using System;
using Backend_Obstruction.Classes;

namespace Backend_Obstruction.ALgorithms
{
    public class BoardFindFirst : BoardAlgorithm
    {
        public BoardFindFirst(int rows, int columns, string boardState, bool getFirst) : base(rows, columns, boardState, getFirst)
        {
        }

        public override string FindCell()
        {
            string message = messageNotExist;

            if (Board.checkAvailableMoves())
            {
                for (int i = 0; i < Board.Rows; i++)
                {
                    for (int j = 0; j < Board.Columns; j++)
                    {
                        if (Board.isCellEmpty(i, j))
                        {
                            message = GetMessage(i, j, message);
                            if (GetFirst)
                            {                                
                                return message;
                            }
                        }
                    }
                }
            }

            return message;
        }

        public virtual string GetMessage(int i, int j, string message) {
            return message;
        }
    }
}
