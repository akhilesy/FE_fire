import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RegisterEmpComponent } from './register-emp/register-emp.component';
import { RegisterSiteComponent } from './register-site/register-site.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';  // If you're using buttons too
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import Material form field module
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AdminmenuComponent } from './adminmenu/adminmenu.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { MatTableModule } from '@angular/material/table';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListSiteComponent } from './list-site/list-site.component';



@NgModule({
  declarations: [
    AdminComponent,
    RegisterEmpComponent,
    RegisterSiteComponent,
    AdminmenuComponent,
    ViewEmployeeComponent,
    ListEmployeeComponent,
    AddAttendanceComponent,
    AttendanceReportComponent,
    ListSiteComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ToastNoAnimationModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    MatMenuModule,
    MatTooltipModule,
    MatPaginatorModule

  ]
})
export class AdminModule { }
