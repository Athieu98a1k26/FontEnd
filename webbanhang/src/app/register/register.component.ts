import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseLocalStorage } from 'src/BaseLocalStorage';
import { AuthService } from 'src/services/Auth.service';
import { HeaderService } from 'src/services/header.service';
import { ProvinceService } from 'src/services/Province.service';
import { UserService } from 'src/services/User.service';
import Swal from 'sweetalert2';
import { BreadCrum } from '../BreadCrum';
import { User } from '../User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any;
  lstDay:Array<any>=[];
  lstMonth:Array<any>=[];
  lstYear:Array<any>=[];
  lstSex:Array<any>=[];
  lstProvinceId:any;
  lstDistrictId:any;
  Item:User=new User();
  ItemBirth:any={
    day:1,
    month:1,
    year:(new Date()).getFullYear()
  };
  strCaptCha:string='';
  lstBreadCrumb:Array<BreadCrum>=[];
  constructor(private provinceService:ProvinceService,private spinner: NgxSpinnerService
    ,private headerService: HeaderService,private formBuilder: FormBuilder,private authService:AuthService
    ,private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.spinner.show();
    this.headerService.confirmMission('dang-ky');
    this.form = this.formBuilder.group({
      id: [this.Item.id],
      userName: [this.Item.userName, Validators.compose([Validators.required])],
      phoneNumber: [this.Item.phoneNumber,[this.ValidNumberPhone]],
      email: [this.Item.email,[Validators.required,Validators.email]],
      address: [this.Item.address],
      sex:[this.Item.sex],
      passWord:[this.Item.passWord,[Validators.required]],
      captcha:[this.Item.captcha,[Validators.required]],
      repassWord:[this.Item.repassWord,[Validators.required]],
      provinceId:[this.Item.provinceId],
      districtId:[this.Item.districtId],
      day:[this.ItemBirth.day],
      month:[this.ItemBirth.month],
      year:[this.ItemBirth.year]
    },{ validators: this.checkPasswords });
    this.genDay();
    this.genMonth();
    this.genYear();
    this.genSex();
    this.GetDataProvinceId();
    this.CaptchaImage();
    this.CreateBreadCrumb()
    this.spinner.hide();
  }

  CaptchaImage(){
    this.authService.CaptchaImage().then((rs:any)=>{
      rs=JSON.parse(rs);
      this.strCaptCha=rs.imgcaptcha;
      this.Item.captcha.id=rs.id;
    })
  }

  RefreshCaptCha(){
    this.CaptchaImage();
  }
  CreateBreadCrumb(){
    let itemBreadCrumb=new BreadCrum();
    itemBreadCrumb.name="Đăng ký";
    itemBreadCrumb.url='/dang-ky';
    this.lstBreadCrumb.push(itemBreadCrumb);
  }
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {

    let pass = group.root.value.PassWord;
    let confirmPass = group.root.value.RePassWord;
    return pass === confirmPass ? null : { notSame: true }
  }
  ValidSelect2: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    return group.value!='' && typeof(group.value)=='string'?null:{ required: true };
  }

  ValidNumberPhone: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    if(group.value==''){
      return null;
    }
    return /(0[3|5|7|8|9])+([0-9]{8})\b/.test(group.value) ? null : { PhoneError: true }
  }
  genDay(){
    this.lstDay=[];
    for(let i=1;i<=31;i++){
      if(i<10){
        this.lstDay.push({id:'0'+i,name:'0'+i});
      }
      else{
        this.lstDay.push({id:i,name:i});
      }
    }
  }
  genMonth(){
    this.lstMonth=[];
    for(let i=1;i<=12;i++){
      if(i<10){
        this.lstMonth.push({id:'0'+i,name:'0'+i});
      }
      else{
        this.lstMonth.push({id:i,name:i});
      }

    }
  }
  genYear(){
    this.lstYear=[];
    let to=(new Date()).getFullYear();
    let from=to-150;
    for(let i=from;i<=to;i++){
      this.lstYear.push({id:i,name:i});
    }
  }
  //lấy danh sách thành phố
GetDataProvinceId(){
  let data={
    "depth": 0
  }
  this.provinceService.SearchNotpagination(data).then((rs:any)=>{
    this.lstProvinceId=rs.data;
  })

}
//lấy quận huyện
getDistrictByProvince(event:any){
  this.Item.districtId='';
  let data={
    "parentId": event.id,
    "depth": 1
  }
  this.provinceService.SearchNotpagination(data).then((rs:any)=>{
    this.lstDistrictId=rs.data;

  })
}
  genSex(){
    this.lstSex=[];
    this.lstSex.push({id:1,name:"Nam"});
    this.lstSex.push({id:2,name:"Nữ"});
    this.lstSex.push({id:3,name:"Khác"});
  }

  Save(){
    Swal.fire({
      title: 'Thông báo?',
      text: "Xác nhận đăng ký!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Quay lại',
    }).then((result) => {
      if (result.isConfirmed) {
        this.Item.dateBirth=this.ItemBirth.year+'-'+this.ItemBirth.month+'-'+this.ItemBirth.day;
        this.userService.RegisterFE(this.Item).then((rs:any)=>{
          if(rs.status==0){

            //lưu data
            Swal.fire({
              icon: 'success',
              title: 'Đăng ký thành tài khoản thành công',
              showConfirmButton: false,
              timer: 3000
            }).then( () => {
              //set token và refreshtoken vào
              // BaseLocalStorage.SetToken(rs.token);
              // BaseLocalStorage.SetrefreshToken(rs.refreshToken);
              // this.headerService.TriggerLoadCurrentUser();
              this.router.navigate(['/dang-nhap']);
            });
          }
          else{
            //lưu data
            Swal.fire({
              icon: 'error',
              title: rs.message,
              showConfirmButton: false,
              timer: 3000
            }).then( () => {
              this.RefreshCaptCha();
            });
          }
        })

      }
    })
  }
}

