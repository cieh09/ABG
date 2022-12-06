using System;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ABG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("GetUserInfo")]
        public JsonResult GetUserInfo([FromBody] object userInput)
        {
            string str = userInput.ToString();
            JObject jObject = JObject.Parse(str);

            string name = (string)jObject.SelectToken("name");
            string password = (string)jObject.SelectToken("password");
            
            string query = @"
                select * from User where Name = '"+ name + @"' and User_password = '"+ password + @"'
            ";
            
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            
            var sqlcmd = new MySqlCommand(query);
            using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                sqlcmd.Connection = connection;
                connection.Open();
                User user = new User();
                using var reader = sqlcmd.ExecuteReader();
                
                if (reader.Read())
                {
                    user.User_id = Convert.ToInt32(reader[0]);
                    user.Name = reader[1].ToString();
                    user.User_email = reader[2].ToString();
                    user.User_password = reader[3].ToString();
                }
                connection.Close();
                return new JsonResult(user);
            }
        }

        // [HttpGet]
        // public JsonResult Get(User user)
        // {
        //     
        // }
    }
}
