import { ArticlesService } from './services/articles.service';
import { FormsModule } from '@angular/forms';
import { NewComponent } from './new/new.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    NewComponent,    
    ArticlesComponent,
     ArticleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,    
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'articles', component: ArticlesComponent},
      { path: 'articles/new', component: NewComponent},        
      {path:'article/:id',component:ArticleComponent},
    ])
  ],
  providers: [
    ArticlesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
