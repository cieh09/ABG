using System;
using System.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;

namespace ABG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendController
    {
        private readonly IConfiguration _configuration;

        public FriendController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // works
        /// <summary>
        /// 用于朋友圈的获取
        /// </summary>
        /// <param name="user_id"></param>
        /// <returns></returns>
        [HttpGet("GetFriends")]
        public JsonResult GetFriends(int user_id)
        {
            string query = @"
                select Friend_id from Friends where User_id = '" + user_id + "'";
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            
            DataTable table = new DataTable();
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
    }
}
