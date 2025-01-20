import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ServicesComponent } from './services/services.component';
import { ContectUsComponent } from './contect-us/contect-us.component';
import { GallaryComponent } from './gallary/gallary.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: '', component: PublicComponent },
  { path: 'about', component: AboutUsComponent },
  {path: 'services', component: ServicesComponent },
  {path: 'contact', component: ContectUsComponent },
  {path: 'gallary', component: GallaryComponent },
  {path: 'login', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
