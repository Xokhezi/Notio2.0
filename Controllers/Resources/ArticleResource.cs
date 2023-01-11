using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Notio2._0.Models;

namespace Notio2._0.Controllers.Resources
{
    public class ArticleResource
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string User { get; set; }
        public string Text { get; set; }
        public string Summary { get; set; }
        public DateTime Date { get; set; }
        public bool Public { get; set; }

        public ICollection<Tag> Tags { get; set; }
        
    }
}