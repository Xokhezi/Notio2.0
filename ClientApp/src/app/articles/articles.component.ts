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
  query:any={page:1,size:2   
  };
  loading = true;
  constructor(private articlesService: ArticlesService, private tagsService: TagsService) { }

  ngOnInit(): void {
    this.selectedTags = [];
    this.getArticles();
    this.tagsService.getTags()
      .subscribe(r => {
        this.tags = this.tagsService.sortTags(r);
        this.loading = false;

      })
  }
  filterArticles() {
    this.articlesService.GetArticles(this.query).subscribe((r:any) => {
      this.articles = this.selectedTags.length 
        ? r.filter((a:any) => this.selectedTags.every((t:any) => a.tags.map((t:any) => t.name).includes(t)))
        : r;
    });
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
}



