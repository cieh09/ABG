using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MySqlConnector;

namespace ABG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        
        private readonly ILogger<GameController> _logger;

        public GameController(IConfiguration configuration, ILogger<GameController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }
        
        /// <summary>
        /// 通过id获取某个游戏的详细数据，用于详细页面的展示
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("/game")]
        [HttpGet("{id}")]
        public JsonResult GetSingleGameContext(int id)
        {
            string query = @"
                select Title, Release_date, Price, ImageUrl from Game where Game_id = '"+ id +@"';
            ";
            
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            MySqlDataReader myReader;
            
            using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                connection.Open();
                using (MySqlCommand mySqlCommand = new MySqlCommand(query, connection))
                {
                    myReader = mySqlCommand.ExecuteReader();
                    table.Load(myReader);
                    
                    myReader.Close();
                    connection.Close();
                }
            }

            return new JsonResult(table);
        }
        
        /// <summary>
        /// 获取所有的游戏数据，用于首页展示
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select Game_id,Title, Release_date, Price, ImageUrl from Game
            ";
            
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            MySqlDataReader myReader;
            
            using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                connection.Open();
                using (MySqlCommand mySqlCommand = new MySqlCommand(query, connection))
                {
                    myReader = mySqlCommand.ExecuteReader();
                    table.Load(myReader);
                    
                    myReader.Close();
                    connection.Close();
                }
            }

            return new JsonResult(table);
        }

        // [HttpGet]
        // public IEnumerable<Game> Get()
        // {
        //     // TODO: Return list of games
        //     var rng = new Random();
        //     return null;
        // }
        //
        // [HttpPost]
        // public IActionResult Create()
        // {
        //     return RedirectToAction("");
        // }
    }
}

