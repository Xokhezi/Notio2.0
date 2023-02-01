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

  searchTag() {
    let results = [];
  
    if (this.searchInput != '' && this.searchInput != null) {
      let searchInput = this.searchInput.toUpperCase();
      for (let t of this.tags) {
        if (t.toUpperCase().includes(searchInput)) {
          results.push(t);
        }
      }
      this.tags = results;
    } else {
      this.getTags();
    }
  }
  
  getTags() {
    this.service.getTags()
      .subscribe(t => {
        this.tags = t;
        this.tags=this.service.sortTags(this.tags);
      });
  }
}
