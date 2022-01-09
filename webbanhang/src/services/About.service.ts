import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/BaseConfig';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private apiUrl=BaseCongif.UrlBase+"/About/";

  constructor(public http: HttpClient) { }
  GetByIdItemFirst(): Promise<any>{
      return this.http.get(this.apiUrl+'GetByIdItemFirst').toPromise();
    }

}
