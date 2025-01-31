import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss']
})
export class AddAttendanceComponent {

  attendanceForm: FormGroup;
  attendanceList: any[] = [];
  attendanceList2: any[] = [];
  displayedColumns: string[] = ['siteName', 'employeeName', 'date', 'isPresent', 'otHours'];
  dataSource = new MatTableDataSource<any>();
  
  // Dummy Data for Dropdowns
  sites: any[] = [];
  employees:any[] = [];

  constructor(private fb: FormBuilder,
    private commonService:CommonServicesService,
          private router:Router,
          private spinner: NgxSpinnerService,
          private toastrService:ToastrService,
          private empService:EmployeeService
  ) {
    this.attendanceForm = this.fb.group({
      siteId: ['', Validators.required],
      empId: ['', Validators.required],
      date: ['', Validators.required],
      isPresent: [true],
      otHours: [0, Validators.min(0)]
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadSite();
  }

  // Add Attendance to List
  addAttendance(): void {
   
    const attendance = {
      employeeId: this.attendanceForm.value.empId, // Example static value, or you can get it from the form if needed
      attenDate: this.attendanceForm.value.date,
      siteCode: this.attendanceForm.value.siteId, // Assuming siteName maps to siteCode
      isPresent: this.attendanceForm.value.isPresent,
      otHours: this.attendanceForm.value.otHours
    };
    this.attendanceList.push(attendance);
    //add list to show attendance list
    const attendance2 = {
      employeeName: this.employees.find(emp => emp.empId === this.attendanceForm.value.empId)?.fullName || '',
      attenDate: this.attendanceForm.value.date,
      siteName: this.sites.find(site => site.siteId === this.attendanceForm.value.siteId)?.siteName || '',
      isPresent: this.attendanceForm.value.isPresent,
      otHours: this.attendanceForm.value.otHours
    };
    this.attendanceList2.push(attendance2);
    this.attendanceList2 = [...this.attendanceList2];
   // this.dataSource.data = this.attendanceList2;
    this.resetForm();
  }

  // Reset Form
  resetForm(): void {
    this.attendanceForm = this.fb.group({
      siteId: ['', Validators.required],
      empId: ['', Validators.required],
      date: ['', Validators.required],
      isPresent: [true],
      otHours: [0, Validators.min(0)]
    });
  }

  onSubmitAttendance(): void {
    if (this.attendanceList.length > 0) {
      // Logic for handling attendance submission
      console.log('Submitting attendance:', this.attendanceList);
  
      // Example: Send data to a service or API
      this.empService.addAttendance(this.attendanceList).subscribe({
        next: (response) => {
          if (response.status === 'OK') {
            this.router.navigateByUrl('admin/add-attendance');
            this.toastrService.success("Attendance submitted successfully ");
            this.attendanceList2= [];
            this.attendanceList= [];
            this.spinner.hide();

          }
        },
      
        error:(error)=>{
          this.router.navigateByUrl('admin/add-attendance');
          this.toastrService.error( error.error.message);
          this.spinner.hide();

        },complete: () => {
          this.spinner.hide(); 
          this.attendanceList2= [];
          this.attendanceList= [];
        }
      });
    }
  }

  loadSite(): void {
    this.spinner.show();
  
    this.commonService.getAllSite().subscribe({
      next: (response) => {
        if (response.status === 'OK') {
         
          this.sites = response.data;
        this.spinner.hide();
        }
      },
      
        error:(error)=>{
          this.router.navigateByUrl('admin/list-employee');
          this.toastrService.error( error.error);
      this.spinner.hide();

        },complete: () => {
          this.spinner.hide(); 
        }
    });
  }


  
  loadEmployees(): void {
    this.spinner.show();
    this.empService.getEmployees().subscribe({
      next: (response) => {
        if (response.status === 'FOUND') {
          
          this.employees = response.data;
        
        this.spinner.hide();
        }
      },
      
        error:(error)=>{
          this.router.navigateByUrl('admin/list-employee');
          this.toastrService.error( error.error);
      this.spinner.hide();

        },complete: () => {
          this.spinner.hide(); 
        }
    });
  }
  
}
