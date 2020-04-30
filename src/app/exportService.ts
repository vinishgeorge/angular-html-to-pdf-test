import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Url } from './url-constants';
@Injectable()
export class ExportService {


  constructor(private http: HttpClient) { }

  exportToPDF(dataUrl: String){
    const href = `${Url.EXPORTTOPDF}/plan/export?imgData=${dataUrl}`;
    console.log(href);
    return this.http.get<any>(href);
  }
}