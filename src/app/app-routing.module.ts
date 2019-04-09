import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';

const routes: Routes = [
  {
    path:'', component:HomecomponentComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
