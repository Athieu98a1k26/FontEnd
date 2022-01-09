import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/BaseConfig';

@Injectable({
  providedIn: 'root'
})
export class MenuManagerService {
  constructor(public http: HttpClient) { }

  private apiUrl=BaseCongif.UrlBase+"/MenuManager/";
  Search(data:any): Promise<any>{
      return this.http.post(this.apiUrl+'Search',data).toPromise();
    }

}
