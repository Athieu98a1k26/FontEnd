import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/BaseConfig';

@Injectable({
  providedIn: 'root'
})
export class MoMoService {
  private apiUrl=BaseCongif.UrlBase+"/MoMo/";
  constructor(private http: HttpClient) { }
  MomoSuccess(data:string){
    return this.http.get(this.apiUrl+'MomoSuccess?'+data).toPromise();
  }
}
