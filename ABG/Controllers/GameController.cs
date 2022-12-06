﻿using System;
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
                using (MySqlCommand mySqlCommand = new MySqlCommand(query, connection))
                {
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
                   
                    
                    //table.Load(myReader);
                    
                    //myReader.Close();
                    connection.Close();
                    return new JsonResult(obj);

                }
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
        [EnableCors("default")]
        public IActionResult GetGameGenre(int id)
        {
            string q = @"SELECT * FROM Gamedb.Game G JOIN Gamedb.Game_Genre GG ON G.Game_id = GG.Game_id JOIN Genre R ON R.Genre_id = R.Genre_id where G.Game_id = '"+ id + @"';
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

