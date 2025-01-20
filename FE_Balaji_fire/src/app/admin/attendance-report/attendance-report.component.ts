import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent {

  filterForm: FormGroup;
  attendanceRecords: any[] = []; // Replace with actual type for attendance records
  displayedColumns: string[] = ['employeeName', 'siteName', 'date', 'isPresent', 'otHours'];
  sites: string[] = ['Site A', 'Site B', 'Site C']; // Replace with actual sites

  defaultMonth = new Date(); // Default to the current month

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      month: [this.defaultMonth],
      siteName: ['']
    });
  }

  ngOnInit(): void {
    this.loadAttendanceRecords();
  }

  loadAttendanceRecords(): void {
    // Load attendance records from API or service
    this.attendanceRecords = [
      { employeeName: 'John Doe', siteName: 'Site A', date: new Date(), isPresent: true, otHours: 2 },
      { employeeName: 'Jane Smith', siteName: 'Site B', date: new Date(), isPresent: false, otHours: 0 },
      // Add more records
    ];
  }

  filterAttendance(): void {
    const { month, siteName } = this.filterForm.value;

    // Implement filter logic (e.g., API call or local filtering)
    console.log('Filters applied:', month, siteName);

    // Example filtering logic
    this.attendanceRecords = this.attendanceRecords.filter(record => {
      const recordDate = new Date(record.date);
      const recordMonth = recordDate.getMonth();
      const selectedMonth = month.getMonth();
      return recordMonth === selectedMonth && (!siteName || record.siteName === siteName);
    });
  }

}
