import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
     private router: Router,
     private userService:UserService,
     private spinner: NgxSpinnerService,
     private toastrService:ToastrService,
   ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Adjust regex pattern for mobile number format
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    // Check if the form is valid before submission
    if (this.loginForm.invalid) {
      this.toastrService.error("Please fill out all required fields correctly.");
      return;
    }
  debugger
    console.log(this.loginForm.value);
    this.spinner.show();
  
    // Submitting form data
    this.userService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('User logined successfully:', response);
        this.spinner.hide();
        this.toastrService.success("User logined successfully");
       
        sessionStorage.removeItem("userDetails");
    
        sessionStorage.setItem("userDetails",JSON.stringify(response.data))
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error('Error creating user:', error);
        this.spinner.hide();
        this.toastrService.error("User not found. Please try again.");
      },
      complete: () => {
        this.spinner.hide(); // Always hide spinner when request completes
      }
    });
  }
}
