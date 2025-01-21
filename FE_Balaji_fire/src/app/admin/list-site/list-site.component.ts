import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-site',
  templateUrl: './list-site.component.html',
  styleUrls: ['./list-site.component.scss']
})
export class ListSiteComponent {

    site: any[] = [];
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatSort) sort!: MatSort;
    
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    
      // Columns to display
  
      displayedColumns: string[] = ['SiteId', 'SiteName', 'Owner', 'Mobile', 'Action'];
  
    
      constructor(private commonService:CommonServicesService,
      private router:Router,
      private spinner: NgxSpinnerService,
      private toastrService:ToastrService,
  ) {}


  ngOnInit(): void {
    this.loadSite();
  }


  loadSite(): void {
    this.spinner.show();
  
    this.commonService.getAllSite().subscribe({
      next: (response) => {
        if (response.status === 'OK') {
          debugger
          this.site = response.data;
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
  viewDetails(site: any): void {
    console.log('Site Details:', site);
    alert(`Viewing details of ${site.name}`);
  }

  // Delete employee
  deleteEmployee(id: number): void {
    this.site = this.site.filter(emp => emp.id !== id);
    alert(`Site with ID ${id} deleted`);
  }
}
