using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Notio2._0.Controllers.Persistence;
using Notio2._0.Models;

namespace Notio2._0.Controllers
{
    [Route("api/tags")]
    public class TagsController : Controller
    {
       private readonly NotioDbContext context;

        public TagsController(NotioDbContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public async Task<IEnumerable<Tag>> GetTags()
        {
            return await context.Tags.ToListAsync();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(int id)
        {
            var tag=await context.Tags.SingleOrDefaultAsync(a=>a.Id==id);
            context.Tags.Remove(tag);
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}