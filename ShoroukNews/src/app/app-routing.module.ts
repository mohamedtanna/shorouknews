import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './settings/settings.module#SettingsPageModule'
  },
  {
    path: 'terms',
    loadChildren: './terms/terms.module#TermsPageModule'
  },
  {
    path: 'videos',
    loadChildren: './videos/videos.module#VideosPageModule'
  },
  { path: 'author/:columnist_id', loadChildren: './author/author.module#AuthorPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'list-of-news/:id/:sectionName', loadChildren: './list-of-news/list-of-news.module#ListOfNewsPageModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'news-details/:cdate/:id', loadChildren: './news-details/news-details.module#NewsDetailsPageModule' },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  {
    path: 'video-details/:videoId',
    loadChildren: './video-details/video-details.module#VideoDetailsPageModule',
    runGuardsAndResolvers: 'always'
  },
  { path: 'newsletter', loadChildren: './newsletter/newsletter.module#NewsletterPageModule' },
  { path: 'columns/:columnist_id', loadChildren: './columns/columns.module#ColumnsPageModule' },
  { path: 'column-details/:cdate/:column_id', loadChildren: './column/column.module#ColumnPageModule' },
  { path: 'privacy', loadChildren: './privacy/privacy.module#PrivacyPageModule' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
