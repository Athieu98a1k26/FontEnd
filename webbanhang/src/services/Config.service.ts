import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/BaseConfig';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(public http: HttpClient) { }

  private apiUrl=BaseCongif.UrlBase+"/Config/";
  GetListConfigByListKey(data:any): Promise<any>{
      return this.http.post(this.apiUrl+'GetListConfigByListKey',data).toPromise();
    }
}
