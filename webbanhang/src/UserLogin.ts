import { Captcha } from "./app/Captcha";

export class UserLogin {
  public id:string='';
  public email:string='';
  public passWord:string='';
  public captcha:Captcha=new Captcha();
}
