using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Wings.Base.Common.DTO;
using Wings.Projects.Web;

namespace Wings.Areas.Admin.Study.Controllers
{
    [Route("api/admin/study/[controller]/[action]")]
    public class SubjectController : Controller
    {
        public DataContext dataContext { get; set; }
        public SubjectController(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }
        [HttpPost]
        public object insert(DevExtremInput bodyData)
        {
            var newSubject = new Subject();
            JsonConvert.PopulateObject(bodyData.values, newSubject);
            this.dataContext.subjects.Add(newSubject);
            this.dataContext.SaveChanges();
            return true;
        }
        [HttpGet]
        public object load(DataSourceLoadOptions options)
        {
            var query = from r in this.dataContext.subjects select r;
            return DataSourceLoader.Load(query, options);
        }

        [HttpPut]
        public object update(DevExtremInput bodyData)
        {
            var subject = this.dataContext.subjects.Find(bodyData.key);
            JsonConvert.PopulateObject(bodyData.values, subject);
            this.dataContext.SaveChanges();
            return true;
        }


        /// <summary>
        /// 删除记录
        /// </summary>
        /// <param name="key"></param>
        /// <param name="table"></param>
        /// <returns></returns>
        public bool delete(int key)
        {

            var subject = this.dataContext.subjects.Find(key);
            this.dataContext.subjects.Remove(subject);
            this.dataContext.SaveChanges();
            return true;
        }
    }
}