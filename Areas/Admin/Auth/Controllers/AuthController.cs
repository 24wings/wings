using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wings.Base.Common.DTO;
using Wings.Projects.Web;

namespace Wings.Areas.Admin.Auth.Controllers
{
    public class LoginBean
    {
        [Required(ErrorMessage = "用户名必填")]
        public string username { get; set; }
        [Required(ErrorMessage = "密码必填")]
        public string password { get; set; }
    }
    public class LoginSuccessOutput
    {
        public User user { get; set; }
    }
    [Route("api/admin/auth/[controller]/[action]")]
    public class AuthController : Controller
    {
        public DataContext dataContext { get; set; }




        public AuthController(DataContext _dataCtx)
        {
            this.dataContext = _dataCtx;
        }


        [HttpPost]
        public Rtn<User> login([FromBody]LoginBean input)
        {
            Console.WriteLine(input.username);
            var user = (from u in this.dataContext.users where u.username == input.username select u).FirstOrDefault();
            if (user != null)
            {
                if (user.password == input.password)
                {
                    user.roles = (from r in this.dataContext.roles where user.roleIds.Contains("," + r.id + ",") select r).ToList();
                    var menuIdList = new List<string>();
                    foreach (var r in user.roles)
                    {
                        var ids = r.menuIds.Split(",");
                        foreach (var id in ids)
                        {
                            menuIdList.Add(id);
                        }
                    }
                    user.menus = (from m in this.dataContext.menus where menuIdList.Distinct().Contains(m.id.ToString()) select m).ToList();
                    return Rtn<User>.Success(user, "登录成功");
                }
                else
                {
                    return Rtn<User>.Error("密码错误");
                }
            }
            else
            {
                return Rtn<User>.Error("用户不存在");
            }
        }

    }
}
