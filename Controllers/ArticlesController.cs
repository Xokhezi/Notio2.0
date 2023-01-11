using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notio2._0.Controllers.Persistence;
using Notio2._0.Models;


namespace Notio2._0.Controllers
{
    [Route("/api/articles")]
    public class ArticlesController : Controller
    {

        private readonly NotioDbContext context;

        public ArticlesController(NotioDbContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public async Task<IEnumerable<Article>> GetArticles()
        {
            return await context.Articles.Include(a => a.Tags).ToListAsync();
        }

        public async Task<IActionResult> CreateArticle([FromBody] Article article)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            article.Date = DateTime.Now;
            context.Articles.Add(article);
            await context.SaveChangesAsync();

            return Ok(article);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArticle(int id)
        {
            var article = await context.Articles.SingleOrDefaultAsync(a => a.Id == id);
            return Ok(article);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(int id)
        {

            var article = await context.Articles
            .Include(a => a.Tags)
            .SingleOrDefaultAsync(a => a.Id == id);

            foreach (var a in article.Tags)
                context.Tags.Remove(a);

            await context.SaveChangesAsync();

            context.Articles.Remove(article);
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}