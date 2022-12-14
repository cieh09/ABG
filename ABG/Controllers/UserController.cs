using System;
using System.Data;
using System.Net;
using System.Xml.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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

        /// <summary>
        /// 验证用户账号密码是否正确的函数
        /// 前端传过来的object内包含name, password等信息，去sql内查是否有对应的信息
        /// </summary>
        /// <param name="userInput"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetUserInfo")]
        public JsonResult GetUserInfo([FromBody] object userInput)
        {
            string str = userInput.ToString();
            JObject jObject = JObject.Parse(str);
        
            string name = (string)jObject.SelectToken("name");
            string password = (string)jObject.SelectToken("password");
        
            string query = @"
                select * from User where Name = '" + name + @"' and User_password = '" + password + @"'
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

        // works
        /// <summary>
        /// 通过user_id查这个user的所有信息
        /// 用于朋友圈内显示某个user的所有朋友的信息（朋友也是用户，用friend_id当user_id查询就好了）
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("GetUserInfoById")]
        public JsonResult GetUserInfoById(int id)
        {
            string query = @"
                select * from User where User_id = '" + id + "'";
            var sqlcmd = new MySqlCommand(query);

            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");

            using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                sqlcmd.Connection = connection;

                connection.Open();
                User obj = new User();
                using var reader = sqlcmd.ExecuteReader();
                if (reader.Read())
                {

                    obj.User_id = Convert.ToInt32(reader[0]);
                    obj.Name = reader[1].ToString();
                    obj.User_email = reader[2].ToString();
                    obj.User_password = reader[3].ToString();
                }
                connection.Close();
                return new JsonResult(obj);
            }
        }

        /// <summary>
        /// 注册函数，insert数据进数据库
        /// </summary>
        /// <param name="userInput"></param>
        /// <returns></returns>
        [HttpPost("WriteNewUserInfo")]
        public int WriteNewUserInfo(User userInput)
        {
            string query = @"insert into User (Name, User_email, User_password) values ('" + userInput.Name + @"', '" + userInput.User_email + @"', '" + userInput.User_password + @"')";
        
            var sqlcmd = new MySqlCommand(query);
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
        
            using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                sqlcmd.Connection = connection;
        
                connection.Open();
                // User obj = new User();
                using var reader = sqlcmd.ExecuteReader();
                // if (reader.Read())
                // {
                //
                //     obj.User_id = Convert.ToInt32(reader[0]);
                //     obj.Name = reader[1].ToString();
                //     obj.User_email = reader[2].ToString();
                //     obj.User_password = reader[3].ToString();
                // }
                connection.Close();
                return GetCurrentMaxUserId(userInput);
            }
        }

        public int GetCurrentMaxUserId(User userInput)
        {
             string query = @"select MAX(User_id) from Gamedb.User where Name = '" + userInput.Name + "' and User_password = '" + userInput.User_password + @"'";
        
            var sqlcmd = new MySqlCommand(query);
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
        
            using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                sqlcmd.Connection = connection;
        
                connection.Open();
                User obj = new User();
                using var reader = sqlcmd.ExecuteReader();
                if (reader.Read())
                {
                    obj.User_id = Convert.ToInt32(reader[0]);
                }
                connection.Close();
                return obj.User_id;
            }
        }

        [HttpPut("UpdateUser")]
        public HttpStatusCode UpdateUser(User userInfo)
        {
            try
            {
                String query = @"
                    update User set Name = '" + userInfo.Name + "', User_email = '" + userInfo.User_email + "', User_password = '" + userInfo.User_password
                            + "' WHERE User_id = '" + userInfo.User_id + "'";

                var sqlcmd = new MySqlCommand(query);
                string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");

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
                }

                return HttpStatusCode.Accepted;
            }
            catch (Exception ex)
            {
                return HttpStatusCode.BadRequest;
            }
        }

        [HttpGet("VerifyUserRegister")]
        public int VerifyUserRegister(string name)
        {
            string query = @"
                select count(*) from Gamedb.User where Name = '" + name + "'";
            var sqlcmd = new MySqlCommand(query);

            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");

            using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                sqlcmd.Connection = connection;

                connection.Open();
                int i = 0;
                using var reader = sqlcmd.ExecuteReader();
                if (reader.Read())
                {

                    i = Convert.ToInt32(reader[0]);
                }
                connection.Close();
                return i;
            }
        }


        [HttpGet("GetUserPremiumId")]
        public JsonResult GetUserPremiumId(int id)
        {

            string query = @"
                 SELECT PremiumSale_id, User_id, Purchase_date, Expire_date FROM PermiumSale WHERE User_id = '" + id + "'";

            var sqlcmd = new MySqlCommand(query);

            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");

            using (MySqlConnection connection = new MySqlConnection(sqlDataSource))
            {
                sqlcmd.Connection = connection;

                connection.Open();
                PremiumSale p_user = new PremiumSale();
                using var reader = sqlcmd.ExecuteReader();
                if (reader.Read())
                {
                    p_user.PremiumSale_id = Convert.ToInt32(reader[0]);
                    p_user.User_id = Convert.ToInt32(reader[1]);
                    p_user.Purchase_date = DateTime.Parse(reader[2].ToString());
                    p_user.Expire_date = DateTime.Parse(reader[3].ToString());
                }
                connection.Close();
                return new JsonResult(p_user);
            }
        }

      
    }
}
