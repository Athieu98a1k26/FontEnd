import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseCongif } from 'src/BaseConfig';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(public http: HttpClient) { }
private apiUrl=BaseCongif.UrlBase+"/Product/";
  GetListProductIsMostBuy(data:any): Promise<any>{
    return this.http.post(this.apiUrl+'GetListProductIsMostBuy',data).toPromise();
  }
  GetListProduct(data:any): Promise<any>{
    return this.http.post(this.apiUrl+'GetListProduct',data).toPromise();
  }
  GetProductByCode(Code:string){
    return this.http.get(this.apiUrl+'GetProductByCode?Code='+Code).toPromise();
  }
  GetListProductOrder(data:any){
    return this.http.post(this.apiUrl+'GetListProductOrder',data,{ headers: new HttpHeaders().set('Content-Type', 'application/json') }).toPromise();
  }
  //
  GetListProductAll(data:any): Promise<any>{
    return this.http.post(this.apiUrl+'GetListProductAll',data).toPromise();
  }
  CheckQuantity(data:any){
    return this.http.post(this.apiUrl+'CheckQuantity',data).toPromise();
  }
}
