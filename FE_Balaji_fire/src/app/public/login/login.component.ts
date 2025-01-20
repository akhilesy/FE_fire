import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the Reactive Form with FormBuilder
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // 10-digit mobile number
      password: ['', [Validators.required, Validators.minLength(6)]], // Password with at least 6 characters
    });
  }

  // Form Submit Handler
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);
      alert('Login successful!');
    } else {
      console.log('Form is invalid');
    }
  }
}
