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
using Newtonsoft.Json.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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
        [HttpGet("GetSingleGameContext")]
        [EnableCors("default")]
        public JsonResult GetSingleGameContext(int id)
        {
            string query = @"
                select * from Game where Game_id = '" + id + "'";
            var sqlcmd = new MySqlCommand(query);
            
            
            //DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            
            using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                sqlcmd.Connection = connection;

                connection.Open();
                Game obj = new Game();
                using var reader = sqlcmd.ExecuteReader();
                if (reader.Read())
                {

                    obj.Game_id = Convert.ToInt32(reader[0]);
                    obj.Title = reader[1].ToString();
                    obj.Release_date = Convert.ToInt32(reader[2]);
                    obj.Price = Convert.ToDouble(reader[3]);
                    obj.ImageUrl = reader[4].ToString();
                }
                connection.Close();
                return new JsonResult(obj);
            }
        }

        /// <summary>
        /// 获取所有的游戏数据，用于首页展示
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [EnableCors("default")]
        public JsonResult GetAllGames()
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

        [HttpGet("GetGameGenre")]
        public Genre GetGameGenre(int id)
        {
            string query = @"
                SELECT R.* FROM Gamedb.Genre R join Gamedb.Game_Genre G on G.Genre_id = R.Genre_id join Gamedb.Game A on A.Game_id = G.Game_id where A.Game_id = '" + id + "'";
            var sqlcmd = new MySqlCommand(query);

            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");

            using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                sqlcmd.Connection = connection;

                connection.Open();
                Genre obj = new Genre();
                using var reader = sqlcmd.ExecuteReader();
                if (reader.Read())
                {

                    obj.Genre_id = Convert.ToInt32(reader[0]);
                    obj.Mode_type = reader[1].ToString();
                    obj.Genre_name = reader[2].ToString();
                }
                connection.Close();
                return obj;
            }
        }

        // works
        [HttpGet("GetAllGamesByUserId")]
        public JsonResult GetAllGamesByUserId(int user_id)
        {
            // string query = @"
            //     select * from User_Buy_Game where User_id = '" + user_id + "'";

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
        }
        
        
        [HttpPost("Checkout")]
        public JsonResult Checkout(UserBuyGame userBuy)
        {
            // JObject jObject = JObject.Parse(userBuy.ToString());
            //
            // int u_id = (int)jObject.SelectToken("User_id");
            // int g_id = (int)jObject.SelectToken("Game_id");
            //
            // string query = @"
            //      INSERT INTO User_Buy_Game(Game_id, User_id) VALUES('" + g_id + "', '" + u_id + "') ";
            
            string query = @"
                 INSERT INTO User_Buy_Game(Game_id, User_id) VALUES('" + userBuy.Game_id + "', '" + userBuy.User_id + "') ";

            // DataTable table = new DataTable();
            // string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            // MySqlDataReader myReader;
            //
            // using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            // {
            //     connection.Open();
            //     using (MySqlCommand mySqlCommand = new MySqlCommand(query, connection))
            //     {
            //         myReader = mySqlCommand.ExecuteReader();
            //         table.Load(myReader);
            //         
            //         myReader.Close();
            //         connection.Close();
            //     }
            // }
            //
            // return new JsonResult("Successfully inserted data to the database!!");
            
            var sqlcmd = new MySqlCommand(query);
            
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            
            using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                sqlcmd.Connection = connection;
            
                connection.Open();
                UserBuyGame u_user = new UserBuyGame();
                using var reader = sqlcmd.ExecuteReader();
                if (reader.Read())
                {
                    u_user.Game_id = Convert.ToInt32(reader[0]);
                    u_user.User_id = Convert.ToInt32(reader[1]);
                }
                connection.Close();
                return new JsonResult(u_user);
            }
        }
    }
}

