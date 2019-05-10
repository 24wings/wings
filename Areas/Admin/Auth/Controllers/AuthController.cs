using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wings.Base.Common.DTO;
using Wings.Projects.Web;

namespace Wings.Areas.Admin.Auth.Controllers
{
    public class LoginBean
    {
        public string username { get; set; }
        public string password { get; set; }
    }
    public class LoginSuccessOutput
    {
        public User user { get; set; }
    }
    [Route("api/admin/[controller]")]
    public class AuthController : Controller
    {
        public DataContext dataContext { get; set; }




        public AuthController(DataContext _dataCtx)
        {
            this.dataContext = _dataCtx;
        }
        [HttpPost("[action]")]
        public Rtn<LoginSuccessOutput> login([FromBody] LoginBean input)
        {
            var user = (from u in this.dataContext.users where u.username == input.username select u).FirstOrDefault();
            return Rtn<LoginSuccessOutput>.Success(new LoginSuccessOutput { user = user });
        }
        [HttpGet("[action]")]
        public object list()
        {
            return this.dataContext.users.ToList();
        }


    }
}
