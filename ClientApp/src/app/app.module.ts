import { TagsService } from './services/tags.service';
import { ArticlesService } from './services/articles.service';
import { FormsModule } from '@angular/forms';
import { NewComponent } from './new/new.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';


import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { TagsComponent } from './tags/tags.component';
import { AdminComponent } from './admin/admin.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    NewComponent,
    ArticlesComponent,
    ArticleComponent,
    TagsComponent,
    AdminComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'articles', component: ArticlesComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'articles/new', component: NewComponent },
      { path: 'article/:id', component: ArticleComponent },
      { path: 'admin', component: AdminComponent },
    ]), BrowserAnimationsModule
  ],
  providers: [
    ArticlesService,
    TagsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
