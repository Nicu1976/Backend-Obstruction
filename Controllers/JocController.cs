using Backend_Obstruction.ALgorithms;
using Backend_Obstruction.Exceptions;
using Backend_Obstruction.Interfaces;
using Microsoft.AspNetCore.Mvc;
#if ADICOMSOFT
using ObstructionGameLib;
#endif
using System.Reflection;

namespace Backend_Obstruction.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class JocController : ControllerBase
    {


#if !ADICOMSOFT
        // Este necesar sa furnizati implementarea acestei metode, cu respectarea indicatiilor din documentatie.
        // Retineti va rugam:
        // - Algoritmul implementat va fi comparat cu algoritmul "Random" din implementarea Cloud. Algoritmul implementat
        //   trebuie de catre dumneavoastra trebuie sa fie mai bun decat algoritmul "Random" din implementarea Cloud pe toate
        //   dimensiunile de tabla de joc. Acesta este un criteriu minimal - pentru maximum de puncte algoritmul implementat
        //   de catre dumneavoastra trebuie sa fie mai bun decat algoritmul "Easy" din implementarea cloud.
        // - Se evalueza implementarea algoritmului, nu doar rezultatul. Ne dorim sa vedem structuri de date eficiente, algoritmi
        //   implementati eficient si cod bine organizat.

        [HttpGet("AlgoritmFindFirstViableCell"), AlgoritmJoc("Algorithm Find First Viabile Cell")]
        public Task<string> AlgoritmFindFirstViableCell(string formula)
        {
            // Find First Viable Cell Algoritm is designed by me, no inspiration.
            try
            {
                CreatorAlgoritm algoritm = new BoardFirstCellCreator(formula);

                IBoardAlgorithm _board = algoritm.FactoryCreateBoard();
                string message = _board.FindCell();
                return Task.FromResult(message);

            }
            catch (IncorectTableException ex)
            {
                return Task.FromResult(ex.Message);
            }
            catch (IllegalPositionException ex)
            {
                return Task.FromResult(ex.Message);
            }
            catch (IncorectBoardStateException ex)
            {
                return Task.FromResult(ex.Message);
            }
            catch (NotExistException ex)
            {
                return Task.FromResult(ex.Message);
            }
        }

        [HttpGet("AlgoritmFindGoldenMove"), AlgoritmJoc("Algorithm Find Golden Move")]
        public Task<string> AlgoritmFindGoldenMove(string formula)
        {
            // Find Golden Move Algorithm is designed by me (the name of algorithm also), no inspiration
            //The same with AlgoritmFindFirstViableCell, only difference is that it isn't go out and continue to iterate in a hope to find a better solution
            try
            {
                CreatorAlgoritm algoritm = new BoardFindGoldenMoveCreator(formula);

                IBoardAlgorithm _board = algoritm.FactoryCreateBoard();
                string message = _board.FindCell();
                return Task.FromResult(message);

            }
            catch (IncorectTableException ex)
            {
                return Task.FromResult(ex.Message);
            }
            catch (IllegalPositionException ex)
            {
                return Task.FromResult(ex.Message);
            }
            catch (IncorectBoardStateException ex)
            {
                return Task.FromResult(ex.Message);
            }
            catch (NotExistException ex)
            {
                return Task.FromResult(ex.Message);
            }
        }


        [HttpGet("AlgoritmMinMax"), AlgoritmJoc("Implement MinMax")]
        public Task<string> AlgoritmMinMax(string formula)
        {
            try
            {
                CreatorAlgoritm algoritm = new AlgoritmMinMaxCreator(formula);

                IBoardAlgorithm _board = algoritm.FactoryCreateBoard();
                string message = _board.FindCell();
                return Task.FromResult(message);

            }
            catch (IncorectTableException ex)
            {
                return Task.FromResult(ex.Message);
            }
            catch (IllegalPositionException ex)
            {
                return Task.FromResult(ex.Message);
            }
            catch (IncorectBoardStateException ex)
            {
                return Task.FromResult(ex.Message);
            }
            catch (NotExistException ex)
            {
                return Task.FromResult(ex.Message);
            }
        }
#endif

#if ADICOMSOFT
        // Acest fisier de cod sursa face parte din implementarea AdiComSoft a jocului Obstruction. Observati cum accesul la implementarea
        // ACS este limitata prin utilizarea directivelor de precompilare.

        [HttpGet("MutareRandom"), AlgoritmJoc("Random")]
        public Task<string> MutareRandom(string formula)
        {
            return (new VariantaAlgoritm_Random(0)).Mutare(formula);
        }

        [HttpGet("MutareRandomCuGreseli"), AlgoritmJoc("Returneaza intentionat mutari gresite")]
        public Task<string> MutareRandomCuGreseli(string formula)
        {
            return (new VariantaAlgoritm_Random(33)).Mutare(formula);
        }

        [HttpGet("MutareEasy"), AlgoritmJoc("Easy - ceva simplu")]
        public Task<string> MutareEasy(string formula)
        {
            return (new VariantaAlgoritm_Easy()).Mutare(formula);
        }

        [HttpGet("Mutare"), AlgoritmJoc("Complet? Complet sa fie.")]
        public Task<string> Mutare(string formula)
        {
            return (new VariantaAlgoritm_Random(33)).Mutare(formula);
        }
#endif

        /// <summary>
        /// Aceasta metoda identifica toate implementarile algoritmului de joc disponibile in solutia curenta. Metoda este utilizata de UI pentru
        /// a identifia solutiile disponibile in backend; Metoda nu necesita nici un fel de corectii, poate fi utilizata ca atare.
        /// </summary>
        /// <returns></returns>
        [HttpGet("FelAlgoDisponibil")]
        public List<DescriereAlgoritm> FelAlgoDisponibil()
        {
            var raspuns = new List<DescriereAlgoritm>();
            string prefix = $"{Request.Scheme}://{Request.Host}{Request.Path}";
            int i = prefix.LastIndexOf('/');
            prefix = prefix.Substring(0, i);

            foreach(var m in typeof(JocController).GetMethods(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public))
            {
                var a = m.GetCustomAttribute<AlgoritmJocAttribute>();
                if (a != null)
                {
                    var h = m.GetCustomAttribute<HttpGetAttribute>();
                    if (h != null)
                    {
                        if (h.Template != null && !h.Template.Any(x => !(char.IsAscii(x) && char.IsLetterOrDigit(x))))
                        {
                            raspuns.Add(new DescriereAlgoritm
                            {
                                Descriere = "LOCALHOST: " + a.DenumireAlgoritm,
                                URL = prefix + "/" + h.Template
                            });
                        }
                    }
                }
            }

            return raspuns;
        }
    }
}