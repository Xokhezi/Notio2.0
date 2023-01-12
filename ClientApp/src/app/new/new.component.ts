import { ArticlesService } from './../services/articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  article={"topic": "testForm",
  "user": "API",
  "text": "asda",
  "summary": "lorem ipsum testum jedum okejoum krasnum popisum",
  "public": true,    
  "tags": [{"name":"KArel"},{"name":"oj"}]    };
  inputTag:any;
  tags:any;

  constructor(private ariclesService:ArticlesService) {}

  ngOnInit(): void {
  }

  addTag()
  {
    let tagToUp = this.inputTag?.toUpperCase();
    console.log(tagToUp);
    if(!this.tags.includes(tagToUp))
      this.tags.push(tagToUp);
    

  }
  submit()
  {
    this.ariclesService.CreateArticle(this.article)
    .subscribe(r=>{
      console.log(r);
    });
  }

  }


