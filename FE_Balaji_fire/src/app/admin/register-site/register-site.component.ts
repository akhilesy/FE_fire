import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-site',
  templateUrl: './register-site.component.html',
  styleUrls: ['./register-site.component.scss']
})
export class RegisterSiteComponent {

  siteForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.siteForm = this.fb.group({
      siteName: ['', [Validators.required, Validators.maxLength(100)]],
      workDescription: ['', [Validators.required, Validators.maxLength(500)]],
      ownerName: ['', [Validators.required, Validators.maxLength(100)]],
      ownerMobile: ['', [
        Validators.required,
        Validators.pattern('^\\+?[0-9]{10,15}$')
      ]]
    });
  }

  onSubmit(): void {
    if (this.siteForm.valid) {
      console.log(this.siteForm.value);
      // You can now send the form data to your backend to save the site details
    }
  }

  clearForm(): void {
    this.siteForm.reset();
  }
}
