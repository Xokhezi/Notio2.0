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
  validTag:any;
  constructor(private articlesService: ArticlesService, private tagsService: TagsService) { }

  ngOnInit(): void {
    this.selectedtags = [];
    this.articlesService.GetArticles()
      .subscribe(r => this.articles = r);
    this.tagsService.getTags()
      .subscribe(r => this.tags = this.tagsService.sortTags(r))
  }
  addTag() {
    let inputUp = this.inputTag.toUpperCase();
    if (inputUp != '' && inputUp != null) {
      if (!this.selectedtags.includes(inputUp)) {
        if (this.tags.includes(inputUp)) {
          this.selectedtags.push(inputUp);
          this.validTag = true;
          this.inputTag='';
        }
        else
          this.validTag = false;
      }
    }
  }
  removeTag(t: any) {
    let index = this.selectedtags.indexOf(t);
    this.selectedtags.splice(index, 1);
  }
}



