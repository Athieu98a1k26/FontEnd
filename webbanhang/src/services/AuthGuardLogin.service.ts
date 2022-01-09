import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BaseLocalStorage } from 'src/BaseLocalStorage';
import { AuthService } from './Auth.service';

@Injectable({
  providedIn: 'root'
})
//đăng nhập thì được vào
export class AuthGuardLoginService implements CanActivate{

  constructor(private authService:AuthService,private router:Router) { }
    async canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Promise<boolean | UrlTree> {
      let refreshToken= BaseLocalStorage.GetrefreshToken();
        let token=BaseLocalStorage.GetToken();
        let strExpire=BaseLocalStorage.GetExpire();
        let dateExpire=new Date(strExpire||'');
        let dateNow=new Date();
        if(dateExpire>dateNow && token!=null){
          //vẫn còn hạn =>ko dc vào
          return true;
        }
        else{
          //refresh token
          return await this.authService.CheckAuthenticated().then((rs:any)=>{
            if(rs!=undefined){
              if(rs.data!=null){
                if(rs.status==1){
                  //lỗi đã hết token=> ko dc vào
                  this.router.navigate(['/trang-chu']);
                  return false;
                }
                else{
                  //được vào
                  return true;
                }
              }else{
                //ko được vào
                this.router.navigate(['/trang-chu']);
                return false;
              }
            }
            else{
              // thì dc vào
              this.router.navigate(['/trang-chu']);
              return false;
            }
          });
        }


    }

  }
