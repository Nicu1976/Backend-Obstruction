namespace Backend_Obstruction.Exceptions
{
    public class IncorectTableException : Exception
    {
        public IncorectTableException() : base("EROARE_TABLA")
        {
        }
    }

    public class IllegalPositionException : Exception
    {
        public IllegalPositionException() : base("EROARE_TABLA")
        {
        }
    }

    public class IncorectBoardStateException : Exception
    {
        public IncorectBoardStateException() : base("EROARE_TABLA")
        {
        }
    }

    public class NotExistException : Exception
    {
        public NotExistException() : base("NU_EXISTA")
        {
        }
    }
}
