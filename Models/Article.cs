using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace Notio2._0.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string User { get; set; }
        public string Text { get; set; }
        public string Summary { get; set; }
        public DateTime Date { get; set; }
        public bool Public { get; set; }

        public ICollection<Tag> Tags { get; set; }
        public ICollection<Photo>Photos { get; set; }
        public Article()
        {
            Tags = new Collection<Tag>();
            Photos =new Collection<Photo>();
        }

    }
}