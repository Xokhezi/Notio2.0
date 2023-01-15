import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http:HttpClient) { }

  GetArticles()
  {
    return this.http.get('https://localhost:7036/api/articles');
  }
  GetArticle(id:any)
  {
    return this.http.get('https://localhost:7036/api/articles/'+id);
  }
  DeleteArticle(id:any)
  {
    return this.http.delete('https://localhost:7036/api/articles/'+id);
  }
  CreateArticle(article:any)
  {
    return this.http.post('https://localhost:7036/api/articles', article);
  }
}
