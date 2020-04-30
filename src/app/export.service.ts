import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Url } from './url-constants';
@Injectable()
export class ExportService {


  constructor(private http: HttpClient) { }
  exportToPDF(categoryId: number): Observable<Array<any>> {
    const href = `${Url.EXPORTTOPDF}/plan/export`;
    return this.http.get<any>(href);
  }
}