using System;
using System.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System.Net;

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
            if (user_id != 0) { 
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

            }else
            {
                return null;
            }
        }

        [HttpPut("DeleteFriend")]
        public HttpStatusCode DeleteFriend(Friend friendship)
        {
            try
            {
                string query = @"
                 DELETE FROM Friends WHERE Friend_id = '" + friendship.Friend_id + "' and User_id = '" + friendship.User_id +"'";

                var sqlcmd = new MySqlCommand(query);
                string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");

                using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
                {
                    sqlcmd.Connection = connection;
                    connection.Open();
                    Friend friend = new Friend();
                    using var reader = sqlcmd.ExecuteReader();

                    if (reader.Read())
                    {
                        friend.User_id = Convert.ToInt32(reader[0]);
                        friend.Friend_id = Convert.ToInt32(reader[1]);
                    }
                    connection.Close();
                }

                return HttpStatusCode.Accepted;
            }
            catch (Exception ex)
            {
                return HttpStatusCode.BadRequest;
            }
        }

    }
}
