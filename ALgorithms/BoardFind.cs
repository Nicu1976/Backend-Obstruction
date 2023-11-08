using Backend_Obstruction.Classes;
using Backend_Obstruction.Interfaces;

namespace Backend_Obstruction.ALgorithms
{
    public abstract class BoardAlgorithm : IBoardAlgorithm
    {
        public const string messageNotExist = "NU_EXISTA";
        public const string messageFinal = ":FINAL";

        private readonly Board board;
        private readonly bool getFirst;

        public BoardAlgorithm(int rows, int columns, string boardState, bool getFirst)
        {
            this.getFirst = getFirst;
            board = new Board(rows, columns, boardState);
        }

        public Board Board => board;

        public bool GetFirst => getFirst;

        public abstract string FindCell();
    }
}
