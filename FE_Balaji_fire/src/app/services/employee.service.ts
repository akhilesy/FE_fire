import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  appUrl=environment.apiUrl;

  constructor(private http: HttpClient) { }

//create employee
createEmployee(userData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post(this.appUrl+'employee/create', JSON.stringify(userData), { headers });
}

getEmployees(): Observable<any> {
  return this.http.get(this.appUrl+'employee/getAllEmpl');
}

getAllSite(): Observable<any> {
  return this.http.get(this.appUrl+'master/allSite');
}


createSite(siteData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post(this.appUrl+'master/add-site', JSON.stringify(siteData), { headers });
}
}
