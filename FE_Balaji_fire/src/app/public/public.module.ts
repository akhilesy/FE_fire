import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { HaderComponent } from './hader/hader.component';
import { FooterComponent } from './footer/footer.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ServicesComponent } from './services/services.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';  // If you're using buttons too
import { MatIconModule } from '@angular/material/icon';
import { ContectUsComponent } from './contect-us/contect-us.component';  
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import Material form field module
import { MatInputModule } from '@angular/material/input';
import { GallaryComponent } from './gallary/gallary.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    HaderComponent,
    FooterComponent,
    TestimonialComponent,
    ServicesComponent,
    AboutUsComponent,
    ContectUsComponent,
    GallaryComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    HaderComponent,FooterComponent
  ]
})
export class PublicModule { }
