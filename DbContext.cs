using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Wings.Projects.Web
{
    [Table("user")]
    public class User
    {
        public int id { get; set; }
        public string username { get; set; }
    }
    [Table("org")]
    public class Org
    {

        public int orgId { get; set; }
        public string orgName { get; set; }
        public DateTime? createTime { get; set; }

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