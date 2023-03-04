import { DummyComponent } from './dummy/dummy.component';
import { DashboardComponent } from './Page/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'/dashboard', pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent, },
  {path:'dummy',component:DummyComponent, },
  {path:'update',loadChildren:()=>import('./update/update.module').then(m=>m.UpdateModule)},
  {path:'**',redirectTo:'/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
