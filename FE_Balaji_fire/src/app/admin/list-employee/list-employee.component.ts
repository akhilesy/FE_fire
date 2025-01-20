import { Component ,OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent {
  employees: any[] = [];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort!: MatSort;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    // Columns to display

    displayedColumns: string[] = ['empId', 'fullName', 'phone', 'rate', 'address', 'Status'];

  
    constructor(private empService:EmployeeService,
    private router:Router,
    private spinner: NgxSpinnerService,
    private toastrService:ToastrService,
) {}
  
    ngOnInit(): void {
      this.loadEmployees();
    }
  

    loadEmployees(): void {
      this.spinner.show();
      this.empService.getEmployees().subscribe({
        next: (response) => {
          if (response.status === 'FOUND') {
            
            this.employees = response.data;
            this.dataSource.data = response.data;
          this.dataSource.paginator = this.paginator;
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

    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    // View employee details
    viewDetails(employee: any): void {
      console.log('Employee Details:', employee);
      alert(`Viewing details of ${employee.name}`);
    }
  
    // Delete employee
    deleteEmployee(id: number): void {
      this.employees = this.employees.filter(emp => emp.id !== id);
      alert(`Employee with ID ${id} deleted`);
    }
}
