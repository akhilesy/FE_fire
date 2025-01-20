import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { RegisterEmpComponent } from './register-emp/register-emp.component';
import { ListEmpComponent } from './list-emp/list-emp.component';
import { ViewDetailsComponent } from './view-details/view-details.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    RegisterEmpComponent,
    ListEmpComponent,
    ViewDetailsComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
