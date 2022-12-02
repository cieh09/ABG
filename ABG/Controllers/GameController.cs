using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ABG.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {

        private readonly ILogger<GameController> _logger;

        public GameController(ILogger<GameController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Game> Get()
        {
            // TODO: Return list of games
            var rng = new Random();
            return null;
        }

        [HttpPost]
        public IActionResult Create()
        {
            return RedirectToAction("");
        }
    }
}

