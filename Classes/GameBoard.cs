using System.Text;
using System;
using Backend_Obstruction.Exceptions;

namespace Backend_Obstruction.Classes
{
    public class Board
    {
        private int rows;
        private int columns;
        private char[,] boardArray;

        private string boardState;

        public char availableCell = '_';
        public char blockedCell = '|';

        public int Rows { get => rows; set => rows = value; }
        public int Columns { get => columns; set => columns = value; }
        public char[,] BoardArray { get => boardArray; set => boardArray = value; }

        public Board(int rows, int columns, string boardState)
        {
            Rows = rows;
            Columns = columns;
            this.boardState = boardState;
            BoardArray = new char[rows, columns];

            createBoard(boardState);
        }

        public Board(Board boardArray)
        { //copy
            boardState = boardArray.boardState;

            Rows = boardArray.Rows;
            Columns = boardArray.Columns;
            BoardArray = new char[rows, columns];
            copyBoard(boardArray.BoardArray, BoardArray);
        }

        private void createBoard(string inputBoard)
        {
            int index = 0;

            for (int i = 0; i < Rows; i++)
            {
                for (int j = 0; j < Columns; j++)
                {
                    char cellValue = inputBoard[index];

                    if (cellValue != availableCell)
                    {
                        if(BoardArray[i, j] != blockedCell)
                        {
                            BoardArray[i, j] = cellValue;
                            setUnavailableBoardCells(i, j);
                        }
                        else
                        {
                            throw new NotExistException();
                        }
                    }
                    else if (BoardArray[i, j] != blockedCell)
                    {
                        BoardArray[i, j] = cellValue;
                    }

                    index++;
                }
            }
        }

        private void copyBoard(char[,] sourceArray, char[,] targetArray)
        {
            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < columns; j++)
                {
                    targetArray[i, j] = sourceArray[i, j];
                }
            }
        }

        public void setUnavailableBoardCells(int y, int x)
        {
            for (int deltaY = -1; deltaY <= 1; deltaY++)
            {
                for (int deltaX = -1; deltaX <= 1; deltaX++)
                {
                    int newY = y + deltaY;
                    int newX = x + deltaX;

                    if (newY >= 0 && newY < Rows && newX >= 0 && newX < Columns)
                    {
                        BoardArray[newY, newX] = blockedCell;
                    }
                }
            }
        }

        public bool checkAvailableMoves()
        {
            for (int i = 0; i < Rows; i++)
            {
                for (int j = 0; j < Columns; j++)
                {
                    if (BoardArray[i, j] == availableCell)
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        public bool isCellEmpty(int y, int x)
        {
            if (boardArray[y, x] == availableCell)
            {
                return true;
            }
            return false;
        }
    }
}

