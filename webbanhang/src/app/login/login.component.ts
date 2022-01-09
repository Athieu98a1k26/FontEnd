import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseLocalStorage } from 'src/BaseLocalStorage';

import { HeaderService } from 'src/services/header.service';
import { UserService } from 'src/services/User.service';
import { UserLogin } from 'src/UserLogin';
import Swal from 'sweetalert2';
import { BreadCrum } from '../BreadCrum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  lstBreadCrumb:Array<BreadCrum>=[];
  constructor(private spinner: NgxSpinnerService
    ,private headerService: HeaderService,private formBuilder: FormBuilder
    ,private userService:UserService,private router:Router) { }

  form: any;
  Item:UserLogin=new UserLogin();
  strCaptCha:string='';
  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      id: [this.Item.id],
      email: [this.Item.email,[Validators.required,Validators.email]],
      passWord:[this.Item.passWord,[Validators.required]],
      captcha:[this.Item.captcha,[Validators.required]]
    });
    this.headerService.confirmMission('dang-ky');
    this.CreateBreadCrumb();
    //this.CaptchaImage();
    this.spinner.hide();
  }
  // CaptchaImage(){
  //   this.authService.CaptchaImage().then((rs:any)=>{
  //     rs=JSON.parse(rs);
  //     this.strCaptCha=rs.imgcaptcha;
  //     this.Item.captcha.id=rs.id;
  //   })
  // }

  // RefreshCaptCha(){
  //   this.CaptchaImage();
  // }
  CreateBreadCrumb(){
    let itemBreadCrumb=new BreadCrum();
    itemBreadCrumb.name="Đăng nhập";
    itemBreadCrumb.url='/dang-nhap';
    this.lstBreadCrumb.push(itemBreadCrumb);
  }
  Save(){
    this.spinner.show();
    this.userService.Login(this.Item).then((rs:any)=>{
      if(rs.status==0){
        this.spinner.hide();
        // set token và refreshtoken vào
          BaseLocalStorage.SetToken(rs.data.token);
          BaseLocalStorage.SetrefreshToken(rs.data.refreshToken);
          BaseLocalStorage.SetExpire(rs.data.expire);
          this.headerService.TriggerLoadCurrentUser();
          this.router.navigate(['/trang-chu']);
      }
      else{
        //lưu data
        Swal.fire({
          icon: 'error',
          title: rs.message,
          showConfirmButton: false,
          timer: 3000
        }).then( () => {
          //this.RefreshCaptCha();
        });
      }
    })
  }
}
