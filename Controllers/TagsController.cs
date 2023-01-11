using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Notio2._0.Controllers.Persistence;
using Notio2._0.Models;
using Notio2._0.Controllers.Resources;

namespace Notio2._0.Controllers
{
    [Route("api/tags")]
    public class TagsController : Controller
    {
       private readonly NotioDbContext context;
       private readonly IMapper mapper;

        public TagsController(NotioDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IEnumerable<TagResource>> GetTags()
        {
            var tags = await context.Tags.ToListAsync();
            return mapper.Map<IEnumerable<Tag>,IEnumerable<TagResource>>(tags);
        }
       
    }
}