using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Wings.Projects.Web
{
    [Table("subject")]
    public class Subject
    {
        public int id { get; set; }
        public string name { get; set; }
        public string summary { get; set; }
        public DateTime startTime { get; set; } = DateTime.Now;
        public DateTime endTime { get; set; } = DateTime.Now;
        public DateTime createTime { get; set; } = DateTime.Now;
        public int companyId { get; set; }
        public SubjectStatus status { get; set; } = SubjectStatus.Active;

    }

    public enum SubjectStatus
    {
        Active,
        Deprecated
    }



    [Table("menu")]
    public class Menu
    {
        public int id { get; set; }
        public string text { get; set; }
        public string link { get; set; }
        public int level { get; set; } = 0;
        public string path { get; set; } = "";
        /// <summary>
        /// 权限编码
        /// </summary>
        /// <value></value>
        public string code { get; set; }
        public int parentId { get; set; } = 0;
        public DateTime createTime { get; set; } = DateTime.Now;

    }




    [Table("role")]
    public class Role
    {
        [Key]
        public int id { get; set; }
        public string roleName { get; set; }
        public string menuIds { get; set; } = "";
        public DateTime createTime { get; set; } = DateTime.Now;
        public int orgId { get; set; }
        public int companyId { get; set; }
        [NotMapped]
        public Org org { get; set; }

    }

    [Table("user")]
    public class User
    {
        [Key]
        public int id { get; set; }
        public string username { get; set; }
        public int orgId { get; set; } = 0;
        /// <summary>
        /// 昵称
        /// </summary>
        /// <value></value>
        public string nickname { get; set; }
        /// <summary>
        /// 角色列表
        /// </summary>
        /// <value></value>
        public string roleIds { get; set; } = "";
        public string password { get; set; }
        [NotMapped]
        public Org org { get; set; }

        public DateTime createTime { get; set; } = DateTime.Now;
        /// <summary>
        /// 公司Id
        /// </summary>
        /// <value></value>
        public int companyId { get; set; }
        [NotMapped]
        public List<Role> roles { get; set; } = new List<Role>();
        [NotMapped]
        public List<Menu> menus { get; set; } = new List<Menu>();


    }
    [Table("org")]
    public class Org
    {

        public int orgId { get; set; }
        public string orgName { get; set; }
        public DateTime? createTime { get; set; } = DateTime.Now;
        public int? companyId { get; set; }
        public int parentId { get; set; } = 0;
        /// <summary>
        /// 存储上级id路径
        /// </summary>
        /// <value></value>
        public string path { get; set; }
        /// <summary>
        /// 级别
        /// </summary>
        /// <value></value>
        public int level { get; set; } = 0;

        [NotMapped]

        public int roleNum { get; set; } = 0;
        [NotMapped]
        public int userNum { get; set; } = 0;


    }
    [Table("company")]
    public class Company
    {

        public int id { get; set; }
        public string name { get; set; }
        public DateTime? createTime { get; set; }
    }

    /// <summary>
    /// 航空数据环境
    /// </summary>
    public partial class DataContext : DbContext
    {
        /// <summary>
        /// 
        /// </summary>
        public DataContext() { }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="options"></param>
        /// <returns></returns>

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        /// <summary>
        /// 用户表
        /// </summary>
        /// <value></value>
        public DbSet<User> users { get; set; }

        public DbSet<Org> orgs { get; set; }

        public DbSet<Company> companys { get; set; }
        public DbSet<Role> roles { get; set; }
        public DbSet<Menu> menus { get; set; }
        public DbSet<Subject> subjects { get; set; }





        /// <summary>
        /// 
        /// </summary>
        /// <param name="optionsBuilder"></param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }
        /// <summary>
        /// 数据库实体创建时
        /// 1.null 扫描Wings.Hk 命名空间下的所有表
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }

}