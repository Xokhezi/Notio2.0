import { ArticlesService } from './../services/articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles:any;
  constructor(private articlesService:ArticlesService) { }

  ngOnInit(): void {
    this.articlesService.GetArticles()
    .subscribe(r=>{
      this.articles=r;
      console.log(this.articles);
    })
  }

}
