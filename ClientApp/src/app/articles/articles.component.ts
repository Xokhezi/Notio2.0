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
  selectedTags: any;
  inValidTag: any;
  loading=true;
  constructor(private articlesService: ArticlesService, private tagsService: TagsService) { }

  ngOnInit(): void {
    this.selectedTags = [];
    this.getArticles();
    this.tagsService.getTags()
      .subscribe(r =>{
        this.tags = this.tagsService.sortTags(r);
        this.loading=false;
        
      })
  }
  filterArticles() {
    let results = [];

    if (this.selectedTags.length != 0) {
      for (let a of this.articles) {
        let tagsNames = a.tags.map((t:any) => t.name); // extract tag names
        let match = this.selectedTags.every((t:any) => tagsNames.includes(t)); // check if all selected tags are included in article's tag names

        if (match) {
          results.push(a);
        }
      }

      this.articles = results;
      console.log(results)
    } else {
      this.getArticles();
    }
  }
  addTag() {
    let inputUp = this.inputTag.toUpperCase();
    if (inputUp != '' && inputUp != null) {
      if (!this.selectedTags.includes(inputUp)) {
        if (this.tags.includes(inputUp)) {
          this.selectedTags.push(inputUp);
          this.inValidTag = false;
          this.inputTag = '';
        }
        else
          this.inValidTag = true;
      }
    }
    this.filterArticles();
  }
  removeTag(t: any) {
    let index = this.selectedTags.indexOf(t);
    this.selectedTags.splice(index, 1);
    this.filterArticles();
  }
  getArticles() {
    this.articlesService.GetArticles()
      .subscribe(r => this.articles = r);
  }
}



