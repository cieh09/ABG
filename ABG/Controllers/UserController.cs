using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MySqlConnector;

namespace ABG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController
    {
        private readonly IConfiguration _configuration;
        
        private readonly ILogger<GameController> _logger;

        public UserController(IConfiguration configuration, ILogger<GameController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        // [HttpGet]
        // public JsonResult Get(User user)
        // {
        //     
        // }
    }
}
