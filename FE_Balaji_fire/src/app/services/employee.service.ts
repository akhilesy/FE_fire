import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl=environment.apiUrl;

  constructor(private http: HttpClient) { }

//create employee
createEmployee(userData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post(this.apiUrl+'employee/addEmployee', JSON.stringify(userData), { headers });
}

getEmployees(): Observable<any> {
  return this.http.get(this.apiUrl+'employee/getAllEmpl');
}

getAllSite(): Observable<any> {
  return this.http.get(this.apiUrl+'master/allSite');
}


createSite(siteData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post(this.apiUrl+'master/add-site', JSON.stringify(siteData), { headers });
}

addAttendance(attendanceList: any[]): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const body = { attendanceList };
  debugger
  console.log(body);
  return this.http.post<any>(this.apiUrl+'attendance/add', attendanceList, { headers });
}

getEmployeeAttendance(atdDate: Date, empId: number): Observable<any> {
  // Set query parameters
  const formattedDate = atdDate.toISOString().split('T')[0];
  const params = new HttpParams()
    .set('atdDate', formattedDate)
    .set('empId', empId.toString());
debugger
  return this.http.get(`${this.apiUrl}attendance/getEmployeeAttendance`, { params });
}
}
