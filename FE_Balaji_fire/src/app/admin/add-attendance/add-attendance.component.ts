import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { formatDate } from '@angular/common';

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
      empIds: [[], Validators.required]  ,
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
    const formValues = this.attendanceForm.value;
debugger
    
    const attObjData = formValues.empIds.map((empId: number) => {
      const selectedDate = new Date(this.attendanceForm.value.date);
      const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000)
                    .toISOString()
                    .split('T')[0];
      return { employeeId: empId,               // Dynamically assign employee ID
      attenDate: localDate,      // Attendance date from the form
      siteCode: formValues.siteId,     // Site code from the form
      isPresent: formValues.isPresent, // Present status
      otHours: formValues.otHours || 0, // Default OT hours to 0 if not provided
    };
  });
  this.attendanceList.push(...attObjData);
debugger
    //add list to show attendance list
   // Create attendance objects for each selected employee
const listData = formValues.empIds.map((empId: number) => {
  const employee = this.employees.find(emp => emp.empId === empId);
  const site = this.sites.find(site => site.siteId === formValues.siteId);
  const selectedDate = new Date(this.attendanceForm.value.date);
      const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000)
                    .toISOString()
                    .split('T')[0];
  return {
    employeeId: empId,                             // Employee ID
    employeeName: employee?.fullName || '',        // Get employee name
    attenDate: localDate,                    // Attendance date
    siteId: formValues.siteId,                     // Site ID
    siteName: site?.siteName || '',                // Get site name
    isPresent: formValues.isPresent,               // Present status
    otHours: formValues.otHours || 0,              // Overtime hours (default 0)
   
  };
});

// Push the generated objects to the attendance list
this.attendanceList2.push(...listData);
    this.attendanceList2 = [...this.attendanceList2];
   // this.dataSource.data = this.attendanceList2;
    this.resetForm();
  }

  resetForm(): void {
    this.attendanceForm.reset({
      siteId: '',                 // Resets the site selection
      empIds: [],                 // Corrected from empId to empIds for multi-select
      date: '',                   // Clears the date
      isPresent: true,            // Default value set to true
      otHours: 0                  // Resets OT hours to 0
    });
  }

  onSubmitAttendance(): void {
    debugger
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
            this.resetForm();
            this.spinner.hide();

          }
        },
      
        error:(error)=>{
          this.router.navigateByUrl('admin/add-attendance');
          this.toastrService.error( error.message);
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
          this.sites.sort((a, b) => {
            return a.siteName.localeCompare(b.siteName);
          });
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
          this.employees.sort((a, b) => {
            return a.fullName.localeCompare(b.fullName);
          });
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
