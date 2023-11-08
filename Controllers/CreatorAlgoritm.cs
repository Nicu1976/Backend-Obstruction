using Backend_Obstruction.ALgorithms;
using Backend_Obstruction.Exceptions;
using Backend_Obstruction.Interfaces;

namespace Backend_Obstruction.Controllers
{
    abstract class CreatorAlgoritm
    {
        int rows; 
        int columns; 
        string boardString;

        public int Rows { get => rows; set => rows = value; }
        public int Columns { get => columns; set => columns = value; }
        public string BoardString { get => boardString; set => boardString = value; }

        protected CreatorAlgoritm(string boardState)
        {
            CheckIncorectTable(boardState);
            CheckIllegalPosition(boardState);
            IncorectBoardState(boardState);

            this.BoardString = boardState.Substring(2);
        }

        public abstract IBoardAlgorithm FactoryCreateBoard();

        public void CheckIncorectTable(string boardState)
        {
            if (!int.TryParse(boardState.Substring(0, 1), out rows))
            {
                throw new IncorectTableException();
            }
            if (!int.TryParse(boardState.Substring(1, 1), out columns))
            {
                throw new IncorectTableException();
            }
        }

        public void CheckIllegalPosition(string boardState)
        {
            string board = boardState.Substring(2);
            for (int i = 0; i < board.Length - 1; i++)
            {
                if ((board[i].ToString().ToUpper() == "X" ||
                    board[i].ToString().ToUpper() == "O" ||
                    board[i].ToString().ToUpper() == "0") &&

                    (board[i + 1].ToString().ToUpper() == "X" ||
                    board[i + 1].ToString().ToUpper() == "O" ||
                    board[i + 1].ToString().ToUpper() == "0"))
                {
                    throw new IllegalPositionException();
                }
            }
        }

        public void IncorectBoardState(string boardState)
        {
            string board = boardState.Substring(2);
            for (int i = 0; i < board.Length - 1; i++)
            {
                if (board[i] == board[i + 1] && (board[i].ToString().ToUpper() == "X" ||
                    board[i].ToString().ToUpper() == "O" ||
                    board[i].ToString().ToUpper() == "0"))
                {
                    throw new IncorectBoardStateException();
                }
            }
        }
    }

    class BoardFindGoldenMoveCreator : CreatorAlgoritm
    {
        public BoardFindGoldenMoveCreator(string boardString) : base(boardString)
        {
        }

        public override IBoardAlgorithm FactoryCreateBoard()
        {
            return new BoardFindGoldenMove(this.Rows, this.Columns, this.BoardString, false);
        }
    }

    class BoardFirstCellCreator : CreatorAlgoritm
    {
        public BoardFirstCellCreator(string boardString) : base(boardString)
        {
        }

        public override IBoardAlgorithm FactoryCreateBoard()
        {
            return new BoardFirstCell(Rows, Columns, BoardString, true);
        }
    }

    class AlgoritmMinMaxCreator : CreatorAlgoritm
    {
        public AlgoritmMinMaxCreator(string boardString) : base(boardString)
        {
        }

        public override IBoardAlgorithm FactoryCreateBoard()
        {
            return new BoardMinMax(Rows, Columns, BoardString, false);
        }
    }
}
