import { TagsService } from './../services/tags.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: any;
  searchInput: any;
  constructor(private service: TagsService) { }

  ngOnInit(): void {
    this.tags = [];
    this.getTags();
  }

  sortTags() {
    let allTags: any[] = [];
    let tagsSorted: any[] = [];

    for (let t of this.tags)
      allTags.push(t.name);

    for (let t of allTags) {
      if (!tagsSorted.includes(t))
        tagsSorted.push(t);
    }
    this.tags = tagsSorted;
  }
  searchTag() {
    let tagsToUp = [];
    let arrayTag = "";
    let results: any[] = [];
        
    if (this.searchInput != '' && this.searchInput != null) {
      for (let t of this.tags)
        tagsToUp.push(t.toUpperCase())

      for (let t of tagsToUp) {
        arrayTag = t.split('');

        for (let letter of arrayTag) {
          if (this.searchInput.toUpperCase().includes(letter))
            if (!results.includes(t))
              results.push(t)
        }
      }
      this.tags = results;
    }
    else
      this.getTags();
  }
  getTags() {
    this.service.getTags()
      .subscribe(t => {
        this.tags = t;
        this.sortTags();
      });
  }
}
