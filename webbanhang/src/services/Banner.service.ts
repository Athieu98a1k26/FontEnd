import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/BaseConfig';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(public http: HttpClient) { }

  private apiUrl=BaseCongif.UrlBase+"/ImageBanner/";
  GetListBanner(data:any): Promise<any>{
      return this.http.post(this.apiUrl+'GetListBanner',data).toPromise();
    }

}
