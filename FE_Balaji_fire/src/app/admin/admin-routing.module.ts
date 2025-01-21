import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RegisterEmpComponent } from './register-emp/register-emp.component';
import { RegisterSiteComponent } from './register-site/register-site.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { ListSiteComponent } from './list-site/list-site.component';

const routes: Routes = [{ path: '', component: AdminComponent,children:[
  { path: 'reg-emp', component: RegisterEmpComponent },
  { path: 'add-site', component: RegisterSiteComponent },
 { path: 'view-employee', component: ViewEmployeeComponent },
 { path: 'list-employee', component: ListEmployeeComponent },
 { path: 'add-attendance', component: AddAttendanceComponent },
 { path: 'report-attendance', component: AttendanceReportComponent },
 { path: 'site-list', component: ListSiteComponent }
] },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
