import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // singleton service
})
export class MailgunAPIService {
  port = '3456';
  baseUrl = `http://localhost:${this.port}`;
  constructor(private http: HttpClient) {}

  sendMails(data): Observable<any> {
    console.log(data.split('\n'));
    /*return this.http.get<any>(`${this.baseUrl}/sendEmails?mailIds = ${data}`).pipe(
      catchError(err => {
        console.log('Handling service error locally and rethrowing it...', err);
        return throwError(err);
      })
    )};*/

    return this.http.post<any>(`${this.baseUrl}/sendMails`, data.split('\n')).pipe(
      catchError(err => {
        console.log('Handling service error locally and rethrowing it...', err);
        return throwError(err);
      })
    )};
}
