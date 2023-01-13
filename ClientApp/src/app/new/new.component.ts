import { ArticlesService } from './../services/articles.service';
import { Component, OnInit } from '@angular/core';
import { any, forEach, indexOf } from 'underscore';
import { EMPTY, empty, of } from 'rxjs';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  form: any;
  article = {
    topic: "",
    user: "CurrentUser",
    text: "",
    summary: "",
    public: true,
    tags: [{ name: "empty" }]
  };
  inputTag: any;
  tags: any
  complete = false;

  constructor(private ariclesService: ArticlesService) { }

  ngOnInit(): void {
    this.tags = [];
    for (let t of this.article.tags) {
      if (t.name === "empty")
        this.removeTag(t);
    }
  }

  addTag() {
    if (this.inputTag != null && this.inputTag != "") {
      let tagToUp = { name: this.inputTag?.toUpperCase() };
      let tagIncluded = 0;

      for (let t of this.article.tags) {
        if (t.name == this.inputTag.toUpperCase())
          tagIncluded++;
      }


      if (tagIncluded != 1) {
        if (this.article.tags.length <= 4)
          this.article.tags.push(tagToUp);
      }
      this.inputTag = "";

    }

  }

  switchPublic() {
    this.article.public = !this.article.public;
  }
  removeTag(tag: any) {
    let index = this.article.tags.indexOf(tag);
    this.article.tags.splice(index, 1);
  }
  submit(f: any) {

    this.ariclesService.CreateArticle(this.article)
      .subscribe(r => {
        console.log(r);
      });
    f.reset();
    this.article.tags = [];
    this.done();

  }
  done() {
    setTimeout(() => {
      this.complete = false;
    }, 3000)
    this.complete = true;
  }

}


