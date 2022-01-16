import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/BaseConfig';
import { BaseLocalStorage } from 'src/BaseLocalStorage';
import { BannerService } from './Banner.service';
import { BaseService } from './BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService {

  private apiUrl = BaseCongif.UrlBase + "/Payment/";
  private apiMoMoUrl = BaseCongif.UrlBase + "/MoMo/";
  AddOrUpdate(data: any): Promise<any> {
    let refreshToken= BaseLocalStorage.GetrefreshToken();
    let token=BaseLocalStorage.GetToken();
    return this.http.post(this.apiUrl + 'AddOrUpdate', data,{headers:this.GetHeader(token||'',refreshToken||'')}).toPromise();
  }
  PaymentMoMo(data: any): Promise<any> {
    let token=BaseLocalStorage.GetToken();
    let refreshToken=BaseLocalStorage.GetrefreshToken();
    return this.http.post(this.apiMoMoUrl + 'PaymentMoMo', data,{headers:this.GetHeader(token||'',refreshToken||'')}).toPromise();
  }
  GetPaymentById(paymentId:string){
    return this.http.get(this.apiUrl + 'GetPaymentById?paymentId='+paymentId).toPromise();
  }
  GetPaymentBytranId(TransId:string){
    return this.http.get(this.apiUrl + 'GetPaymentBytranId?TransId='+TransId).toPromise();
  }
  GetPaymentSimpleInfo(data:any){
    return this.HttpPost(this.apiUrl + 'GetPaymentSimpleInfo',data);
  }
  CancelPayment(data:any){
    return this.HttpPost(this.apiUrl + 'CancelPayment',data);
  }
  SearchPaymentSimpleInfo(data:any){
    return this.http.post(this.apiUrl + 'SearchPaymentSimpleInfo',data).toPromise();
  }
}
