import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/BaseConfig';
import { BaseLocalStorage } from 'src/BaseLocalStorage';
import { BaseService } from './BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService  extends BaseService{

  private apiUrl=BaseCongif.UrlBaseHost+"/Auth/";
    CaptchaImage(): Promise<any>{
      return this.http.get(this.apiUrl+'CaptchaImage',{ responseType: 'text' }).toPromise();
    }
    CheckAuthenticated(){
      let refreshToken= BaseLocalStorage.GetrefreshToken();
      let token=BaseLocalStorage.GetToken();
      return this.http.get(this.apiUrl+'CheckAuthenticated',{headers:this.GetHeader(token||'',refreshToken||'')}).toPromise();
    }
    ChangePass(data:any){
      return this.HttpPost(this.apiUrl+'ChangePass',data);
    }
}
