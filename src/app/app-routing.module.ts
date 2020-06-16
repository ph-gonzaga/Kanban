import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './views/about/about.component';
import { CardComponent } from './views/card/card.component';
import { TagComponent } from './views/tag/tag.component';

const routes: Routes = [
  { path: '', redirectTo: 'card', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'card', component: CardComponent },
  { path: 'tag', component: TagComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
