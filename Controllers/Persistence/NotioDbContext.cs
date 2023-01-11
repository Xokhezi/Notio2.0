using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Notio2._0.Models;

namespace Notio2._0.Controllers.Persistence
{
    public class NotioDbContext:DbContext
    {
        public NotioDbContext(DbContextOptions<NotioDbContext>options):base(options)
        {
        }
            public DbSet<Article> Articles { get; set; }
            public DbSet<Tag> Tags { get; set; }
        
    }
}