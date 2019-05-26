import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // singleton service
})
export class MailgunAPIService {
  port = '3456';
  baseUrl = `http://localhost:${this.port}`;
  numRetries = 3;
  errorOutput;

  constructor(private http: HttpClient) {}

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.errorOutput.emailIDsOutput = errorMessage;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  sendMails(data, model): Observable<any> {
    console.log('Request payload', data.split('\n'));
    this.errorOutput = model;
    return this.http.post<any>(`${this.baseUrl}/sendMails`, data.split('\n')).pipe(
      retry(this.numRetries), // Retry thrice before ending request
      catchError(err => this.handleError(err))
    )};
}
