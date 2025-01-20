import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  contactForm: FormGroup;
  isLoading: boolean = false;

constructor(private spinner: NgxSpinnerService,
  private toastr: ToastrService){

    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    
  }


  onSubmit() {
    this.spinner.show();
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
     
    }
    setTimeout(() => {
      // Hide spinner after the task is done
      this.spinner.hide();
    }, 5000); 
    this.toastr.success('Hello world!');
  }
}
