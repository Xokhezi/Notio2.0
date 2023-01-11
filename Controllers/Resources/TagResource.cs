using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notio2._0.Controllers.Resources
{
    public class TagResource
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int ArticleId { get; set; }

    }
}