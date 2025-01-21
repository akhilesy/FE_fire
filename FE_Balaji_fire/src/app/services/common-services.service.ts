import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {



    appUrl=environment.apiUrl;
  
    constructor(private http: HttpClient) { }

    //create employee
    createSite(siteData: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    
      return this.http.post(this.appUrl+'master/add-site', JSON.stringify(siteData), { headers });
    }

    getAllSite(): Observable<any> {
      return this.http.get(this.appUrl+'master/allSite');
    }
 
}
