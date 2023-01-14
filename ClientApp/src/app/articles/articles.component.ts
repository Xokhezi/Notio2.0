import { TagsService } from './../services/tags.service';
import { ArticlesService } from './../services/articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: any;
  inputTag: any;
  tags: any;
  selectedtags: any;
  validTag: any;
  constructor(private articlesService: ArticlesService, private tagsService: TagsService) { }

  ngOnInit(): void {
    this.selectedtags = [];
    this.getArticles();
    this.tagsService.getTags()
      .subscribe(r => this.tags = this.tagsService.sortTags(r))
  }
  filterArticles() {
    let tagsNames = [];
    let results = [];
    let checks = 0;

    if(this.selectedtags.length!=0)
    {
      for (let a of this.articles) {
        for (let t of a.tags)
          tagsNames.push(t.name);      
  
        for (let t of this.selectedtags) {
          if (tagsNames.includes(t))
            checks++;        
        }
              
        if (checks === this.selectedtags.length)
            results.push(a);
        
        checks=0;
        tagsNames = [];      
      }
      
      this.articles=results;
      console.log(results)
    }
    else
      this.getArticles();
   
  }
  addTag() {
    let inputUp = this.inputTag.toUpperCase();
    if (inputUp != '' && inputUp != null) {
      if (!this.selectedtags.includes(inputUp)) {
        if (this.tags.includes(inputUp)) {
          this.selectedtags.push(inputUp);
          this.validTag = true;
          this.inputTag = '';
        }
        else
          this.validTag = false;
      }
    }
    this.filterArticles();
  }
  removeTag(t: any) {
    let index = this.selectedtags.indexOf(t);
    this.selectedtags.splice(index, 1);
    this.filterArticles();
  }
  getArticles()
  {
    this.articlesService.GetArticles()
      .subscribe(r => this.articles = r);
  }
}



