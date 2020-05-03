import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Url } from './url-constants';
@Injectable({
  providedIn: 'root'
})
export class ExportService {


  constructor(private http: HttpClient) { }
  exportToPDF(dataUrl: String): Observable<any> {
    const href = `${Url.EXPORTTOPDF}/plan/export`;
    console.log(href);
    const data = {'imgData':dataUrl};
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'blob' as 'json', observe: 'response' as 'body' };
    return this.http.post<any>(href, data, config);
  }
}