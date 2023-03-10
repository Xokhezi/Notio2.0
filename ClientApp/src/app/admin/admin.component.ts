import { any } from 'underscore';
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { TagsService } from '../services/tags.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  query:any={page:0,size:5   
  };
  articles: any;
  inputTag: any;
  tags: any;
  selectedTags: any;
  inValidTag: any;
  deleted = false;
  constructor(private articlesService: ArticlesService, private tagsService: TagsService) { }

  ngOnInit(): void {
    this.selectedTags = [];
    this.getArticles();
    this.tagsService.getTags()
      .subscribe(r => this.tags = this.tagsService.sortTags(r))
  }
  filterArticles() {
    this.articlesService.GetArticles(this.query)
      .subscribe((r: any) => {
        this.articles = r.filter((a: any) => {
          let tagsNames = a.tags.map((t: any) => t.name);
          return this.selectedTags.every((t: any) => tagsNames.includes(t));
        });
      });
  }
  addNewItem(value: any) {   
    this.query.page=value.pageIndex;
    this.query.size=value.pageSize;
    this.getArticles();    
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
    this.articlesService.GetArticles(this.query)
      .subscribe(r => this.articles = r);
  }
  removeArt(id: any) {
    if (confirm("Opravdu vymazat článek?"))
      this.articlesService.DeleteArticle(id)
        .subscribe({
          complete: () => {
            this.getArticles();
            setTimeout(() => {
              this.deleted = true;
            }, 300)
          }
        })
  }
}
