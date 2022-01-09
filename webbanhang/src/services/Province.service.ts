import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/BaseConfig';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private http: HttpClient) { }
  private apiUrl = BaseCongif.UrlBase + "/Province/";
  SearchNotpagination(data: any): Promise<any> {
    return this.http.post(this.apiUrl + 'SearchNotpagination', data).toPromise();
  }
}
