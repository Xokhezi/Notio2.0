import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http:HttpClient) { }
  upload(articleId: any, file: any) {
    var formData = new FormData();
    formData.append('file', file);
    return this.http.post('https://localhost:7036/api/articles/' + articleId + '/photos', formData,
        {
            reportProgress: true,
            observe: 'events'
        })
}
getPhotos(articleId: any) {
    return this.http.get('https://localhost:7036/api/articles/' + articleId + '/photos')
}
}
