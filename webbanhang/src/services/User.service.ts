import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/BaseConfig';
import { BaseLocalStorage } from 'src/BaseLocalStorage';
import { BaseService } from './BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{


  private apiUrlAuth = BaseCongif.UrlBaseHost + "/Auth/";

  private apiUrlAPI = BaseCongif.UrlBaseAuth + "/Users/";
  RegisterFE(data: any): Promise<any> {
    return this.http.post(this.apiUrlAuth + 'RegisterFE', data).toPromise();
  }
  Login(data:any): Promise<any>{
    return this.http.post(this.apiUrlAuth + 'Login', data).toPromise();
  }
  Logout(){
    let refreshToken= BaseLocalStorage.GetrefreshToken();

    if(refreshToken==null){
      this.router.navigate(['/trang-chu']);
    }
    let url=this.apiUrlAuth+"Logout";
    return this.HttpPost(url,{"Token":refreshToken});
  }
  GetInfo(){
    return this.HttpGet(this.apiUrlAPI+'GetInfo');
  }

  GetUserByClaim(){
    return this.HttpGet(this.apiUrlAPI+'GetUserByClaim');
  }

  AddOrUpdate(data:any){
    return this.HttpPost(this.apiUrlAPI + 'AddOrUpdate', data);
  }
}
