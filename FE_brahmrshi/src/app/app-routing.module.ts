import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HaderComponent } from './components/common/hader/hader.component';
import { HomePageComponent } from './components/common/home-page/home-page.component';
import { ContactUsComponent } from './components/common/contact-us/contact-us.component';
import { ServicesComponent } from './components/common/services/services.component';
import { AboutUsComponent } from './components/common/about-us/about-us.component';
import { RegisterComponent } from './components/common/register/register.component';
import { LoginComponent } from './components/common/login/login.component';
import { ProfileComponent } from './components/common/profile/profile.component';
import { SocialMediaComponent } from './components/common/social-media/social-media.component';


const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'services',component:ServicesComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path:'media',component:SocialMediaComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },


];

@NgModule({
 
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
