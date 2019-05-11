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

    [Table("role")]
    public class Role
    {
        [Key]
        public int id { get; set; }
        public string roleName { get; set; }
        public string menuIds { get; set; }
        public DateTime createTime { get; set; } = DateTime.Now;
        public int orgId { get; set; }
        public int companyId { get; set; }
        [NotMapped]
        public Org org { get; set; }

    }

    [Table("user")]
    public class User
    {
        public int id { get; set; }
        public string username { get; set; }
        public int orgId { get; set; } = 0;
        /// <summary>
        /// 昵称
        /// </summary>
        /// <value></value>
        public string nickname { get; set; }
        public string password { get; set; }
        [NotMapped]
        public Org org { get; set; }

        public DateTime createTime { get; set; } = DateTime.Now;


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