import { PhotosService } from './../services/photos.service';
import { ArticlesService } from './../services/articles.service';
import { Component, OnInit } from '@angular/core';
import { any, forEach, indexOf } from 'underscore';
import { EMPTY, empty, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  form: any;
  subscription: any;
  progress = 0;
  photos: any;
  submitted = false;
  article = {
    id: 0,
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

  constructor(private ariclesService: ArticlesService, private photoService: PhotosService) { }

  ngOnInit(): void {
    this.photos = [];
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
  uploadPhoto(input: any) {
    this.progress=0;
    const file: File = input.files[0];
    this.subscription = this.photoService.upload(this.article.id, file)
      .subscribe((x: any) => {        
        if (x.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * x.loaded / x.total);
          this.refreshPhoto();
        }
      });
     
  }
  refreshPhoto() {
    this.photoService.getPhotos(this.article.id)
      .subscribe(p => this.photos = p);
  }
  submit(f: any) {
    
    this.ariclesService.CreateArticle(this.article)
      .subscribe((r: any) => {
        console.log(r.id);
        this.article.id = r.id;
      });    
    this.done();
    this.submitted = true;

  }
  
  done() {
    setTimeout(() => {
      this.complete = false;
    }, 3000)
    this.complete = true;
  }

}


