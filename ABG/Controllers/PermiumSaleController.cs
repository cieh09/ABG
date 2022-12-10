using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace ABG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermiumSaleController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly ILogger<GameController> _logger;

        public PermiumSaleController(IConfiguration configuration, ILogger<GameController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        [HttpGet("GetGameGenre")]
        [EnableCors("default")]
        public IActionResult GetGameGenre(int id)
        {
            if (id != 0)
            {
                string q = @"SELECT * FROM Gamedb.Game G JOIN Gamedb.Game_Genre GG ON G.Game_id = GG.Game_id JOIN Genre R ON R.Genre_id = R.Genre_id where G.Game_id = '" + id + @"';
 ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
                MySqlDataReader myReader;

                using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
                {
                    connection.Open();
                    using (MySqlCommand mySqlCommand = new MySqlCommand(q, connection))
                    {
                        myReader = mySqlCommand.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        connection.Close();
                    }
                }

                return new JsonResult(table);
            }
            else
            {
                return null;
            }
        }

        // works
        [HttpGet("GetAllGamesByUserId")]
        public JsonResult GetAllGamesByUserId(int user_id)
        {
            if (user_id != 0) { 
            string query = @"SELECT Game.Game_id, Title, Release_date, Price, ImageUrl FROM Game JOIN User_Buy_Game
                        ON User_Buy_Game.Game_id = Game.Game_id
                        WHERE User_Buy_Game.User_id = '" + user_id + "'";

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
            }else
            {
                return null;
            }
        }
    }
}

