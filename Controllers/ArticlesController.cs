using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notio2._0.Controllers.Persistence;
using Notio2._0.Controllers.Resources;
using Notio2._0.Models;


namespace Notio2._0.Controllers
{
    [Route("/api/articles")]
    public class ArticlesController : Controller
    {
        private readonly IMapper mapper;
        private readonly NotioDbContext context;

        public ArticlesController(NotioDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IEnumerable<ArticleResource>> GetArticles(VehicleQuery query)
        {
            var articles = await context.Articles.Include(a => a.Tags).ToListAsync();
            var queryObj = mapper.Map<IEnumerable<Article>, IEnumerable<ArticleResource>>(articles);

            if (query.Size <= 0)
                query.Size = 5;

            if (query.Page == 0)
                return queryObj.Take(query.Size);
            else if (query.Page == 1)
                return queryObj.Skip(query.Size).Take(query.Size);
            else
                return queryObj.Skip((query.Page) * query.Size).Take(query.Size);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArticle(int id)
        {
            var article = await context.Articles.Include(a => a.Tags).SingleOrDefaultAsync(a => a.Id == id);
            var articleResource = mapper.Map<Article, ArticleResource>(article);

            return Ok(articleResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateArticle([FromBody] ArticleResource articleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var article = mapper.Map<ArticleResource, Article>(articleResource);

            article.Date = DateTime.Now;
            context.Articles.Add(article);
            await context.SaveChangesAsync();

            return Ok(article);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateArticle([FromBody] ArticleResource articleResource)
        {
            if (!ModelState.IsValid)
                return NotFound(ModelState);

            var article = await context.Articles.Include(a => a.Tags).SingleOrDefaultAsync(a => a.Id == articleResource.Id);
            var test = mapper.Map<ArticleResource, Article>(articleResource);

            foreach (var a in article.Tags)
                context.Tags.Remove(a);

            await context.SaveChangesAsync();

            article.Topic = test.Topic;
            article.User = test.User;
            article.Text = test.Text;
            article.Summary = test.Summary;
            article.Public = test.Public;
            article.Tags = test.Tags;
            article.Date = DateTime.Now;

            await context.SaveChangesAsync();


            return Ok(test);

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