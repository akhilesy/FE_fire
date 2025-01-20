import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!: FormGroup;
   isAddressSame: boolean = false;
   states: any[] = [];
   districts: any[] = [];
   currDistricts: any[] = [];
   isSubmitEnable:boolean=false;
   isClearEnable:boolean=false;
   isSamePassword:boolean=false;

   isTermChecked:boolean=false;
   isConditionChecked:boolean=false;

  constructor(private fb: FormBuilder
    ,private commonService:CommonService,
    private userService:UserService,
    private spinner: NgxSpinnerService,
    private toastrService:ToastrService,
  private route:Router) { }

  ngOnInit(): void {
    this.getAllState();
    //rearrenging form of the register
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]{1,50}$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]{1,50}$')]],
      fatherName: ['', [Validators.required, Validators.pattern('^[A-Za-z ]{1,100}$')]],
      emailId: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.pattern('^[A-Za-z ]{1,20}$')]],
      state: [null, [Validators.required, Validators.min(1)]],
      district: [null, [Validators.required, Validators.min(1)]],
      block: ['', [Validators.required, Validators.pattern('^[A-Za-z ]{1,50}$')]],
      currAddress: ['', [ Validators.maxLength(100)]],
      currState: [null, [ Validators.min(1)]],
      currDistrict: [null, [ Validators.min(1)]],
      currBlock: ['', [Validators.required, Validators.pattern('^[A-Za-z ]{1,50}$')]],
      password1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      workingArea: ['', [Validators.required, Validators.maxLength(100)]],
      designation: ['', [Validators.required, Validators.pattern('^[A-Za-z ]{1,50}$')]]
    }
  );
  }

    onAddressCheckboxChange(event: MatCheckboxChange) {
      if (event.checked) {
        // Copy base address fields to current address fields
        this.registerForm.patchValue({
          currAddress: this.registerForm.get('address')?.value,
          currState: this.registerForm.get('state')?.value,
          currDistrict: this.registerForm.get('district')?.value,
          currBlock: this.registerForm.get('block')?.value,
       
          
        });
        this.isAddressSame=true;
      } else {
        // Clear the current address fields if checkbox is unchecked
        this.registerForm.patchValue({
          currAddress: '',
          currState: '',
          currDistrict: '',
          currBlock: '',
     
        });
        this.isAddressSame=false;
      }
    }
    
    getAllState():void{
      this.commonService.getAllStates().subscribe({
        next: (data) => {
          this.states = data.data;
          console.log(this.states);
        },
        error: (err) => {
          console.error('Error fetching states:', err);
        }
      });
    }
      // When a state is selected, fetch the corresponding districts
  onStateChange(stateId: number): void {
    this.fetchDistricts(stateId,1);
  }

  onCurrentStateChange(stateId: number): void {
    this.fetchDistricts(stateId,2);
  }

    fetchDistricts(stateId: number,type:number): void {
      this.commonService.getDistricts(stateId).subscribe(
        (data) => {
          if(type===1){
            this.districts = data.data;
            console.log('Districts: ', this.districts);

          }else{
            this.currDistricts = data.data;
            console.log('Districts: ', this.currDistricts);
          }
         
        },
        (error) => {
          console.error('Error fetching districts', error);
        }
      );
    }

    validatePassword(): void {
      const password1 = this.registerForm.get('password1')?.value;
      const password2 = this.registerForm.get('password2')?.value;
    console.log('password validation new ')
      // Check if passwords match
      if (password1 !== password2) {
        // If they don't match, set the error manually or handle it as needed
        this.registerForm.get('password2')?.setErrors({ notMatching: true });
        this.isSamePassword=true;
      } else {
        // Clear the error if passwords match
        this.registerForm.get('password2')?.setErrors(null);
        this.isSamePassword=false;
      }
    }

    onClear() {
      this.registerForm.reset();
    }

    onSubmit(): void {
      // Check if the form is valid before submission
      if (this.registerForm.invalid) {
        this.toastrService.error("Please fill out all required fields correctly.");
        return;
      }
    debugger
      console.log(this.registerForm.value);
      this.spinner.show();
    
      // Submitting form data
      this.userService.createUser(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('User created successfully:', response);
          this.spinner.hide();
          this.toastrService.success("User created successfully");
          this.onClear();
          this.route.navigateByUrl('/');

        },
        error: (error) => {
          console.error('Error creating user:', error);
          this.spinner.hide();
          this.toastrService.error("User not created. Please try again.");
        },
        complete: () => {
          this.spinner.hide(); // Always hide spinner when request completes
        }
      });
    }
    checkTerm(event: MatCheckboxChange): void {
      if(event.checked){
        this.isTermChecked=true;
      }else{
        this.isTermChecked=false;
      }
     
    } 

    checkAggrement(event: MatCheckboxChange): void {
      if(event.checked){
        this.isConditionChecked=true;
      }else{
        this.isConditionChecked=false;
      }
      
    } 
}
