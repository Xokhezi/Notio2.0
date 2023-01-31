using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Notio2._0.Controllers.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notio2._0.Controllers.Resources;
using Notio2._0.Models;

namespace Notio2._0.Controllers
{
    [Route("api/articles/{articleId}/photos")]
    public class PhotosController : Controller
    {

        private readonly IMapper mapper;
        private readonly NotioDbContext context;
        private readonly IWebHostEnvironment host;

        public PhotosController(NotioDbContext context, IMapper mapper, IWebHostEnvironment host)
        {
            this.host = host;
            this.context = context;
            this.mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> Upload(int articleId, IFormFile file)
        {
            var article = await context.Articles.SingleOrDefaultAsync(a => a.Id == articleId);
            if (article == null)
                return NotFound();
            if (file == null) return BadRequest("Null file");

            //empty or higher than 10mb
            if (file.Length == 0) return BadRequest("Empty file");
            //if(file.Length<photoSettings.MaxBytes) return BadRequest("Too big");

            //zda přípona obsžena f accepted files types
            //if(!photoSettings.IsSupported(file.FileName)) return BadRequest("Invalid File type.");

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo { Name = fileName };
            article.Photos.Add(photo);
            await context.SaveChangesAsync();

            return Ok(mapper.Map<Photo, PhotoResource>(photo));



        }
        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int articleId)
        {
            var photos = await context.Photos.Where(p=>p.ArticleId==articleId).ToListAsync();
            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
        }

    }
}