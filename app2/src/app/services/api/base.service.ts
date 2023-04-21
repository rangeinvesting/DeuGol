import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  url:string = 'http://pay.betin.me/api'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}

  // Headers
  _httpOptions:any = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
	
  public get(path: string, options?: Object, httpOptions?: HttpHeaders): Observable<any> {
    return this.httpClient.get(`${this.url}${path}`, httpOptions?httpOptions:this._httpOptions).pipe(catchError(this.handleError));
  }
	
  public post(path: string, options?: Object, httpOptions?: HttpHeaders): Observable<any> {
    return this.httpClient.post<any>(`${this.url}${path}`, options, httpOptions?httpOptions:this._httpOptions).pipe(catchError(this.handleError));
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}