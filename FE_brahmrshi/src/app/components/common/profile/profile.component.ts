import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDetails } from '../../model/UserDetails';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
usedDetails!:any
user: any;



  constructor(private fb: FormBuilder,
    private userService:UserService,
  private spiner:NgxSpinnerService) {}

  ngOnInit(): void {
    this.loadUserDetails();
    this.getUserDetailsById(this.usedDetails.userId);
    // Proper form initialization
    
  }

  onSubmit():void{
  
}
uploadPhoto():void{
  
}

getUserDetailsById(userId: number): void {
  this.spiner.show();
  this.userService.getUser(userId).subscribe(
    (data) => {
      console.log('User Details:', data);
      this.user = data.data;
      console.log(this.user)
      this.spiner.hide();
    },
    (error) => {
      this.spiner.hide();
      console.error('Error fetching user details:', error);
    }
  );
  this.spiner.hide();
}
submit():void{
  
}


loadUserDetails(): void {
  const userDetailsJson = sessionStorage.getItem('userDetails');

  console.log(userDetailsJson);
  if (userDetailsJson) {
    try {
      this.usedDetails = JSON.parse(userDetailsJson) as UserDetails;
         
    } catch (error) {
    
      console.error('Error parsing user details:', error);
    }
  } else {
   
    console.warn('No user details found in sessionStorage');
  }
}




}
