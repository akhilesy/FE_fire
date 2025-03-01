import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {
  formData: FormGroup;
  attendanceRecords: any[] = [];
  displayedColumns: string[] = ['employeeName', 'siteName', 'date', 'isPresent', 'otHours'];
  employees: any[] = [];
 
  minDate = new Date();  // Current date
  maxDate: Date;

  dataSource!:MatTableDataSource<any>;
 // @ViewChild(MatSort) sort!: MatSort;
  
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
      empId: ['']
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadEmployees();
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

  loadEmployees(): void {
    this.spinner.show();
    this.empService.getEmployees().subscribe({
      next: (response) => {
        if (response.status === 'FOUND') {
          this.employees = response.data;
        }
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
    if (response.status === 'FOUND' && response.data?.length) {
      // Sort attendance records by date in ascending order
    

      this.attendanceRecords = response.data;
      this.attendanceRecords.sort((a, b) => {
        const dateA = new Date(a.attandanceDate); // Convert to Date object
        const dateB = new Date(b.attandanceDate); // Convert to Date object
        return dateA.getTime() - dateB.getTime(); 
      })
  
      // Set dataSource with sorted data
     // this.attendanceRecords = this.attendanceRecords;
      this.dataSource = new MatTableDataSource<any>(this.attendanceRecords);
      this.dataSource.paginator = this.paginator;
     
  
      // Success notification
      this.toastrService.success('Attendance details found successfully');
    } else {
      // Handle no data found scenario
      this.attendanceRecords = [];
      this.dataSource = new MatTableDataSource<any>();
      this.toastrService.warning('No attendance details found');
    }
  
    // Navigate to the report attendance page
    this.router.navigateByUrl('admin/report-attendance');
  }
  

  handleError(error: any): void {
    this.toastrService.error(error.error.message || 'An error occurred');
    this.router.navigateByUrl('admin/report-attendance');
  }

  resetForm(): void {
    this.formData.reset();
  }
}
