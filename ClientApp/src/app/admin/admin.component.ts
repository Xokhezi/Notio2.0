import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { TagsService } from '../services/tags.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
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
    let tagsNames = [];
    let results = [];
    let checks = 0;

    if (this.selectedTags.length != 0) {
      for (let a of this.articles) {
        for (let t of a.tags)
          tagsNames.push(t.name);

        for (let t of this.selectedTags) {
          if (tagsNames.includes(t))
            checks++;
        }

        if (checks === this.selectedTags.length)
          results.push(a);

        checks = 0;
        tagsNames = [];
      }

      this.articles = results;
      console.log(results)
    }
    else
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
    this.articlesService.GetArticles()
      .subscribe(r => this.articles = r);
  }
  removeArt(id: any) {
    if (confirm("Opravdu vymazat článek?"))
      this.articlesService.DeleteArticle(id)
        .subscribe({
          complete: () => {
            setTimeout(() => {
              this.deleted = true;
            }, 2000)
          }
        })
  }
}
