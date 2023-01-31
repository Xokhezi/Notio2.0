using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Notio2._0.Controllers.Resources;
using Notio2._0.Models;

namespace Notio2._0.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            //mapping from domain to API resources
            CreateMap<Article, ArticleResource>();
            CreateMap<Tag, TagResource>();
            CreateMap<Photo, PhotoResource>();

            //api resource to domain
            CreateMap<ArticleResource, Article>();
            CreateMap<TagResource, Tag>();
            CreateMap<PhotoResource, Photo>();
        }
    }
}