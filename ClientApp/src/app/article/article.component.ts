import { ArticlesService } from './../services/articles.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article:any;
  id:any;
  cursorOn=false;
  constructor( private active:ActivatedRoute,private service:ArticlesService) { }

  ngOnInit(): void {
    this.active.paramMap.subscribe(params=>{
      this.id = params.get('id');
      this.article=this.service.GetArticle(this.id)
      .subscribe(a=>{
        this.article=a;
        console.log(this.article);
      });        
  });   
  }
  switchCursorOn()
  {
    this.cursorOn=!this.cursorOn;
  }
}
