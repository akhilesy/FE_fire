import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';  // Import MatSidenavModule
import { MatListModule } from '@angular/material/list';        // Import MatListModule
import { MatExpansionModule } from '@angular/material/expansion';  // Import MatExpansionModule



@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule
  ]
})
export class AdminModule { }
