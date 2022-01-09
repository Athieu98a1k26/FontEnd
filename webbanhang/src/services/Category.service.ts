import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/BaseConfig';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public http: HttpClient) { }

  private apiUrl=BaseCongif.UrlBase+"/Category/";
  GetCategoryByCode(code:string): Promise<any>{
      return this.http.get(this.apiUrl+'GetCategoryByCode?code='+code).toPromise();
    }

}
