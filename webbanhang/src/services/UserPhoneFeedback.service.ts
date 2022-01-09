import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/BaseConfig';

@Injectable({
  providedIn: 'root'
})
export class UserPhoneFeedbackService {

  constructor(public http: HttpClient) { }

  private apiAuthUrl=BaseCongif.UrlBaseAuth+"/UserPhoneFeedback/";
  AddOrUpdate(data:any): Promise<any>{
      return this.http.post(this.apiAuthUrl+'AddOrUpdate',data).toPromise();
  }
}
