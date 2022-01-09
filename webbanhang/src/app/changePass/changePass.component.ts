import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/services/Auth.service';
import { HeaderService } from 'src/services/header.service';
import { UserService } from 'src/services/User.service';
import Swal from 'sweetalert2';
import { BreadCrum } from '../BreadCrum';

@Component({
  selector: 'app-changePass',
  templateUrl: './changePass.component.html',
  styleUrls: ['./changePass.component.css']
})
export class ChangePassComponent implements OnInit {
  form: any;
  Item:any={
    passWord:'',
    newPassWord:'',
    reNewPassWord:''
  }
  lstBreadCrumb:Array<BreadCrum>=[];
  constructor(private spinner: NgxSpinnerService
    ,private headerService: HeaderService,private formBuilder: FormBuilder,private authService:AuthService
    ,private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.spinner.show();
    this.headerService.confirmMission('thay-doi-mat-khau');
    this.form = this.formBuilder.group({
      id: [this.Item.id],
      passWord: [this.Item.passWord, Validators.compose([Validators.required])],
      newPassWord: [this.Item.newPassWord,[Validators.required]],
      reNewPassWord: [this.Item.reNewPassWord,[Validators.required]]

    },{ validators: this.checkPasswords });
    this.CreateBreadCrumb();
    this.spinner.hide();
  }

  CreateBreadCrumb(){
    let itemBreadCrumb=new BreadCrum();
    itemBreadCrumb.name="thay đổi mật khẩu";
    itemBreadCrumb.url='/thay-doi-mat-khau';
    this.lstBreadCrumb.push(itemBreadCrumb);
  }
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {

    let pass = group.root.value.newPassWord;
    let confirmPass = group.root.value.reNewPassWord;
    return pass === confirmPass ? null : { notSame: true }
  }
  Save(){
    this.spinner.show();
    this.authService.ChangePass(this.Item).then((rs:any)=>{
      this.spinner.hide();
      if(rs.status==0){
        Swal.fire({
          icon: 'success',
          title: rs.message,
          showConfirmButton: false,
          timer: 3000
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: rs.message,
          showConfirmButton: false,
          timer: 3000
        });
      }

    })
  }
}
