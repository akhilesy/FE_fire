import { Component, ViewChild } from '@angular/core';
import { UserDetails } from '../../model/UserDetails';
import { MenuDetail } from '../../model/MenuDetail';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-hader',
  templateUrl: './hader.component.html',
  styleUrls: ['./hader.component.scss']
})
export class HaderComponent {

isLogin:boolean=false;
userDetails: UserDetails | null = null;
menuList:MenuDetail[]=[];

constructor(private router:Router,
private spiner:NgxSpinnerService){

}


ngOnInit(): void {
  this.loadUserDetails();
}

loadUserDetails(): void {
  const userDetailsJson = sessionStorage.getItem('userDetails');
  console.log(userDetailsJson);
  if (userDetailsJson) {
    try {
      this.userDetails = JSON.parse(userDetailsJson) as UserDetails;
      this.isLogin=true;
      this.loadMenuList();
      console.log(this.userDetails);
    } catch (error) {
      this.isLogin=false;
      console.error('Error parsing user details:', error);
    }
  } else {
    this.isLogin=false;
    console.warn('No user details found in sessionStorage');
  }
}

  logOut() :void{
   
    sessionStorage.removeItem("userDetails");
    this.isLogin=false;
  }

  loadMenuList(): void {
    if (this.userDetails && this.userDetails.menudetails) {
      this.menuList = this.userDetails.menudetails;
      console.log('Menu list loaded:', this.menuList);
    } else {
      console.warn('No menu details available');
    }
  }

  onLogin():void{
    this.spiner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spiner.hide();
      this.router.navigateByUrl("/login");
    }, 300);

  }

  contactUs():void{
    this.spiner.show();
   
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spiner.hide();
      this.router.navigateByUrl("/contact-us");
    }, 300);

  }

  services():void{
    this.spiner.show();
  
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spiner.hide();
      this.router.navigateByUrl("/services");
    }, 300);

  }

  aboutus():void{
    this.spiner.show();
   
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spiner.hide();
      this.router.navigateByUrl("/about-us");
    }, 300);

  }
  

  home():void{
    this.spiner.show();
   
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spiner.hide();
      this.router.navigateByUrl("/");
    }, 300);

  }

  media():void{
    this.spiner.show();
   
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spiner.hide();
      this.router.navigateByUrl("/media");
    }, 300);

  }


}
