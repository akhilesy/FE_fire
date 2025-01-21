import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonServicesService } from 'src/app/services/common-services.service';

@Component({
  selector: 'app-register-site',
  templateUrl: './register-site.component.html',
  styleUrls: ['./register-site.component.scss']
})
export class RegisterSiteComponent {

  siteForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private spinner: NgxSpinnerService,
      private toastrService:ToastrService,
      private route:Router,
    private commonService: CommonServicesService) {}

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
    this.spinner.show();
    if (this.siteForm.valid) {

      this.commonService.createSite(this.siteForm.value).subscribe({
        next:(response)=>{
          debugger
          console.log('Site Data:', this.siteForm.value);
          this.toastrService.success("Site  added successfully");
          this.clearForm();
          this.route.navigateByUrl('admin/add-site');
          this.spinner.hide();
        },
        error:(error)=>{
          debugger
          this.route.navigateByUrl('admin/add-site');
          this.toastrService.error( error.error);
      this.spinner.hide();

        },complete: () => {
          this.spinner.hide(); 
        }
      })

    } else {
      this.toastrService.error("Site Not registed ");
      this.route.navigateByUrl('/admin/add-site');
      this.spinner.hide();

    }
    this.spinner.hide();
  }

  clearForm(): void {
    this.siteForm.reset();
  }
}
