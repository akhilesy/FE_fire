import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl = 'http://localhost:8083/master';  // API Endpoint

  constructor(private http: HttpClient) { }

  // Method to fetch all states
  getAllStates(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/allState', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

   // Method to get districts by state ID
   getDistricts(stateId: number): Observable<any> {
    // Setting up query parameters
    const params = new HttpParams().set('stateId', stateId.toString());
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Make the API call using HttpClient
    return this.http.get(`${this.apiUrl}/getDistrict`, { params ,headers});
  }

  // Method to fetch all states
  getAllSocialMedia(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/media', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
