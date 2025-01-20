import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-contect-us',
  templateUrl: './contect-us.component.html',
  styleUrls: ['./contect-us.component.scss']
})
export class ContectUsComponent {

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')  // Simple validation for a 10-digit mobile number
      ]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      // Handle form submission, for example, send to backend
      console.log('Form Submitted:', this.contactForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
