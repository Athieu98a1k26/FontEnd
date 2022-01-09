import { Captcha } from "./Captcha";

export class User {
  public id:string='';
  public userName:string='';
  public email:string='';
  public passWord:string='';
  public repassWord:string='';
  public sex:string='1';
  public phoneNumber:string='';
  public provinceId:string='';
  public districtId:string='';
  public dateBirth:string='';
  public address:string='';
  public captcha:Captcha=new Captcha();
}
