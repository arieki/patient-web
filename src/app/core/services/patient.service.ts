import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  saveUrl = environment.apiUrl + "/api/v1/save";
  updateUrl = environment.apiUrl + "/api/v1/update/";
  getAllByPagingUrl = environment.apiUrl + "/api/v1/patients";
  deleteUrl = environment.apiUrl + "/api/v1/delete";

  constructor(
    private http: HttpClient,
  ) { }

  save(patient: any): Observable<any> {
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.saveUrl, JSON.stringify(patient), {headers: header});
  }

  update(id: string, patient: any): Observable<any> {
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.put(this.updateUrl + id, JSON.stringify(patient), {headers: header})
  }

  findNextData(page: any, size: any): Observable<any> {
    let param: HttpParams = new HttpParams();
    param = param.append('page', page);
    param = param.append('size', size);
    return this.http.get(this.getAllByPagingUrl, {params: param});
  }

  delete(id: any): Observable<any> {
    let param: HttpParams = new HttpParams();
    param = param.append('id', id);
    return this.http.delete(this.deleteUrl, {params: param});
  }
}
