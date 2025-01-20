import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomePageComponent } from './components/common/home-page/home-page.component';
import { HaderComponent } from './components/common/hader/hader.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { AboutUsComponent } from './components/common/about-us/about-us.component';
import { ServicesComponent } from './components/common/services/services.component';
import { ContactUsComponent } from './components/common/contact-us/contact-us.component';
import { RegisterComponent } from './components/common/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule ,ToastNoAnimationModule} from 'ngx-toastr';
import { MatListModule } from '@angular/material/list';
import { SideMenuComponent } from './components/common/side-menu/side-menu.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoginComponent } from './components/common/login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { HomeCorosoulComponent } from './components/common/home-corosoul/home-corosoul.component';
import { ProfileComponent } from './components/common/profile/profile.component';
import { SocialMediaComponent } from './components/common/social-media/social-media.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EventsComponent } from './components/common/events/events.component';





@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HaderComponent,
    FooterComponent,
    AboutUsComponent,
    ServicesComponent,
    ContactUsComponent,
    RegisterComponent,
    SideMenuComponent,
    LoginComponent,
    HomeCorosoulComponent,
    ProfileComponent,
    SocialMediaComponent,
    EventsComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ToastNoAnimationModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    MatMenuModule,
    MatTooltipModule
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
