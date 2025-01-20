import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private masterUrl = 'http://localhost:8083/master';  // API Endpoint
  private userUrl = 'http://localhost:8083/user';

  constructor(private http: HttpClient) { }

  createUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.userUrl+'/create', JSON.stringify(userData), { headers });
  }

  login(userData: any): Observable<any> {
    const body = userData;
    return this.http.post<any>(this.userUrl+'/login', body);
  }

  getUser(userId: number): Observable<any> {
   
    const url = `${this.userUrl}/getUser?userId=`+userId;
    return this.http.get<any>(url);
  }
}
