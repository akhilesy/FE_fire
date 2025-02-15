import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-att-month-report',
  templateUrl: './att-month-report.component.html',
  styleUrls: ['./att-month-report.component.scss']
})
export class AttMonthReportComponent {

  formData: FormGroup;
    attendanceRecords: any[] = [];
    displayedColumns: string[] = ['Name', 'Present', 'Over time', 'Total Prasent', 'Rate','Salary','Advance','Remaining'];
    employees: any[] = [];
   
    minDate = new Date();  // Current date
    maxDate: Date;
  
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatSort) sort!: MatSort;
    
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private spinner: NgxSpinnerService,
      private toastrService: ToastrService,
      private empService: EmployeeService
    ) {
      // Initialize maxDate to today's date (with zero time)
      this.maxDate = new Date();
      this.maxDate.setHours(0, 0, 0, 0);
  
      this.formData = this.fb.group({
        atdDate: ['', Validators.required],
        empId: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
      this.dataSource.paginator = this.paginator;
     
    }

    loadAttendanceRecords(): void {
      this.spinner.show();
      const { atdDate, empId } = this.formData.value;
  
      this.empService.getEmployeeAttendance(atdDate, empId).subscribe({
        next: (response) => {
          this.handleAttendanceResponse(response);
        },
        error: (error) => {
          this.handleError(error);
        },
        complete: () => {
          this.spinner.hide();
        }
      });
    }

    handleAttendanceResponse(response: any): void {
      if (response.status === 'FOUND') {
        this.attendanceRecords = response.data;
        this.attendanceRecords.sort((a, b) => {
          const dateA = new Date(a.attandanceDate); // Convert to Date object
          const dateB = new Date(b.attandanceDate); // Convert to Date object
          return dateA.getTime() - dateB.getTime(); // Compare the dates in ascending order
        });
        this.dataSource.data = this.attendanceRecords;
        this.dataSource.paginator = this.paginator;
        this.toastrService.success('Attendance details found successfully');
        this.router.navigateByUrl('admin/report-attendance');
      } else {
        this.attendanceRecords = [];
        this.dataSource.data = [];
        this.toastrService.warning('No attendance details found');
        this.router.navigateByUrl('admin/report-attendance');
      }
    }

    handleError(error: any): void {
      this.toastrService.error(error.error.message || 'An error occurred');
      this.router.navigateByUrl('admin/report-attendance');
    }
  
    resetForm(): void {
      this.formData.reset();
    }

}
