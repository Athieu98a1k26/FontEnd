import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/Auth.service';
import { HeaderService } from 'src/services/header.service';
import { ProvinceService } from 'src/services/Province.service';
import { UserService } from 'src/services/User.service';
import Swal from 'sweetalert2';
import { BreadCrum } from '../BreadCrum';
import { User } from '../User';

@Component({
  selector: 'app-ProfileUser',
  templateUrl: './ProfileUser.component.html',
  styleUrls: ['./ProfileUser.component.css']
})
export class ProfileUserComponent implements OnInit {

  form: any;
  lstDay:Array<any>=[];
  lstMonth:Array<any>=[];
  lstYear:Array<any>=[];
  lstSex:Array<any>=[];
  lstProvinceId:any;
  lstDistrictId:any;
  Item:User=new User();
  IshowForm=false;
  ItemBirth:any={
    day:1,
    month:1,
    year:(new Date()).getFullYear()
  };
  lstBreadCrumb:Array<BreadCrum>=[];
  constructor(private provinceService:ProvinceService,private spinner: NgxSpinnerService
    ,private headerService: HeaderService,private formBuilder: FormBuilder,private authService:AuthService
    ,private userService:UserService,private router:Router) { }

  async ngOnInit() {
    this.spinner.show();
    this.IshowForm=false;
    await this.headerService.confirmMission('thong-tin-tai-khoan');
    this.form = this.formBuilder.group({
      id: [this.Item.id],
      userName: [this.Item.userName, Validators.compose([Validators.required])],
      phoneNumber: [this.Item.phoneNumber,[this.ValidNumberPhone]],
      email: [this.Item.email,[Validators.required,Validators.email]],
      address: [this.Item.address],
      sex:[this.Item.sex],
      provinceId:[this.Item.provinceId],
      districtId:[this.Item.districtId],
      day:[this.ItemBirth.day],
      month:[this.ItemBirth.month],
      year:[this.ItemBirth.year]
    });
    await this.genDay();
    await this.genMonth();
    await this.genYear();
    await this.genSex();
    await this.GetDataProvinceId();
    await this.CreateBreadCrumb();
    await this.GetUserByClaim();
    this.spinner.hide();
  }
  GetUserByClaim(){
    this.userService.GetUserByClaim().then((rs:any)=>{
      if(rs.status==0){
        this.IshowForm=true;
        this.Item.id=rs.data.id;
        this.Item.userName=rs.data.userName;
        this.Item.email=rs.data.email;
        //this.Item.passWord=rs.data.passWord;
        this.Item.sex=rs.data.sex;
        this.Item.phoneNumber=rs.data.phoneNumber;
        this.Item.provinceId=rs.data.provinceId;


        var dateObj = new Date(rs.data.dateBirth);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        this.ItemBirth.day=day<10?'0'+day:day;
        this.ItemBirth.month=month<10?'0'+month:month;
        this.ItemBirth.year=year;
        this.getDistrictByProvince({id:this.Item.provinceId});
        this.Item.districtId=rs.data.districtId;
        this.Item.dateBirth=rs.data.dateBirth;
        this.Item.address=rs.data.address;
      }

    })
  }
  CreateBreadCrumb(){
    let itemBreadCrumb=new BreadCrum();
    itemBreadCrumb.name="Thông tin tài khoản";
    itemBreadCrumb.url='/thong-tin-tai-khoan';
    this.lstBreadCrumb.push(itemBreadCrumb);
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
    this.Item.dateBirth=this.ItemBirth.year+'-'+this.ItemBirth.month+'-'+this.ItemBirth.day;
        this.userService.AddOrUpdate(this.Item).then((rs:any)=>{
          if(rs.status==0){

            //lưu data
            Swal.fire({
              icon: 'success',
              title: 'Cập nhật thông tin thành công',
              showConfirmButton: false,
              timer: 3000
            }).then( () => {

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

            });
          }
        })
  }
}
