import { ArticlesService } from './../services/articles.service';
import { Component, OnInit } from '@angular/core';
import { any, forEach, indexOf } from 'underscore';
import { EMPTY, empty, of } from 'rxjs';

interface tag {
  name: string;
}
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
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



  constructor(private ariclesService: ArticlesService) { }

  ngOnInit(): void {
    this.tags = [];
    for (let t of this.article.tags) {
      if (t.name === "empty")
        this.removeTag(t);
    }
  }

  addTag() {
    if(this.inputTag!=null && this.inputTag!=""){
      let tagToUp = { name: this.inputTag?.toUpperCase() };
      let tagIncluded = 0;
  
      for (let t of this.article.tags)      
        {
          if(t.name == this.inputTag.toUpperCase())
            tagIncluded++;
        }
            
              
      if (tagIncluded!=1) {
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
  submit() {

        this.ariclesService.CreateArticle(this.article)
      .subscribe(r => {
        console.log(r);
        this.emptyForm();
      });
      
  }
  emptyForm()
  {
    this.article={
      topic: "",
      user: "CurrentUser",
      text: "",
      summary: "",
      public: true,
      tags: [{ name: "empty" }]
    };
  }

}


