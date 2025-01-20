import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [{ path: 'core', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
 


{ path: 'public', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
 


{ path: 'emp', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
 


{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
 


];

@NgModule({
 
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
