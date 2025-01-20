import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-register-emp',
  templateUrl: './register-emp.component.html',
  styleUrls: ['./register-emp.component.scss']
})
export class RegisterEmpComponent {

  employeeForm: FormGroup;
  employeeObject:any;

  constructor(private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastrService:ToastrService,
    private route:Router,
     private emplService:EmployeeService) {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      dateOfBirth: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^\\+?[0-9]+$')
      ]],
      email: ['', [Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      aadharNumber: ['', [
        Validators.required,
        Validators.maxLength(12),
        Validators.pattern('^[0-9]{12}$')
      ]],
      rate: ['']
    });
  }


  isFieldInvalid(fieldName: string, errorType: string): boolean {
    const field = this.employeeForm.get(fieldName);
    return !!(field?.hasError(errorType) && (field.dirty || field.touched));
  }
  

  onSubmit(): void {
    this.spinner.show();
    if (this.employeeForm.valid) {

      this.emplService.createEmployee(this.employeeForm.value).subscribe({
        next:(response)=>{
          console.log('Employee Data:', this.employeeForm.value);
          this.toastrService.success("Employee registed successfully");
          this.onClear();
          this.route.navigateByUrl('admin/regemp');
          this.spinner.hide();
        },
        error:(error)=>{
          this.route.navigateByUrl('admin/regemp');
          this.toastrService.error( error.error);
      this.spinner.hide();

        },complete: () => {
          this.spinner.hide(); 
        }
      })

      //setterObject(this.employeeForm);
      console.log('Employee Data:', this.employeeForm.value);
      this.toastrService.error("Employee data not correct");
      this.route.navigateByUrl('/admin/regemp');
      this.spinner.hide();
    } else {
      this.toastrService.error("Employee Not registed ");
      this.route.navigateByUrl('/admin/regemp');
      this.spinner.hide();

    }
    this.spinner.hide();
  }


  onClear() {
    this.employeeForm.reset();
  }
  
  
}




