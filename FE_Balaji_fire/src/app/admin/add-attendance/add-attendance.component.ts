import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss']
})
export class AddAttendanceComponent {

  attendanceForm: FormGroup;
  attendanceList: any[] = [];
  displayedColumns: string[] = ['siteName', 'employeeName', 'date', 'isPresent', 'otHours'];
  
  // Dummy Data for Dropdowns
  sites = ['Site A', 'Site B', 'Site C'];
  employees = ['John Doe', 'Jane Smith', 'Alice Brown'];

  constructor(private fb: FormBuilder) {
    this.attendanceForm = this.fb.group({
      siteId: ['', Validators.required],
      empId: ['', Validators.required],
      date: ['', Validators.required],
      isPresent: [false],
      otHours: [0, Validators.min(0)]
    });
  }

  ngOnInit(): void {}

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
    this.attendanceForm.reset();
  }

  // Reset Form
  resetForm(): void {
    this.attendanceForm.reset();
  }

  onSubmitAttendance(): void {
    if (this.attendanceList.length > 0) {
      // Logic for handling attendance submission
      console.log('Submitting attendance:', this.attendanceList);
  
      // Example: Send data to a service or API
     /* this.attendanceService.submitAttendance(this.attendanceList).subscribe({
        next: (response) => {
          console.log('Attendance submitted successfully:', response);
          this.resetAttendanceList(); // Clear the list after submission
        },
        error: (error) => {
          console.error('Error submitting attendance:', error);
        }
      });*/
    }
  }
  
}
