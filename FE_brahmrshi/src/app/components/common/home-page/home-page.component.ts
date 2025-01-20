import { Component } from '@angular/core';
import { HaderComponent } from '../hader/hader.component';
import { MenuDetail } from '../../model/MenuDetail';
import { UserDetails } from '../../model/UserDetails';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  isLogin:boolean=false;
  userDetails: UserDetails | null = null;
  menuList:MenuDetail[]=[];
  
  
  ngOnInit(): void {
    this.loadUserDetails();
  }
  
  loadUserDetails(): void {
    const userDetailsJson = sessionStorage.getItem('userDetails');
    console.log(userDetailsJson);
    debugger
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
    
  
}
