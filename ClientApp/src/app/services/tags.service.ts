import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http:HttpClient) { }

  getTags()
  {
    return this.http.get('https://localhost:7036/api/tags');
  }
  sortTags(tags:any) {
    let allTags: any[] = [];
    let tagsSorted: any[] = [];

    for (let t of tags)
      allTags.push(t.name);

    for (let t of allTags) {
      if (!tagsSorted.includes(t))
        tagsSorted.push(t);
    }
    return tagsSorted;
  }
}
