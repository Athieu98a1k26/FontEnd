import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseCongif } from 'src/BaseConfig';
import { BaseLocalStorage } from 'src/BaseLocalStorage';
import { HeaderService } from 'src/services/header.service';
import { PaymentService } from 'src/services/Payment.service';
import { ProductService } from 'src/services/product.service';
import { ProvinceService } from 'src/services/Province.service';
import { UserService } from 'src/services/User.service';
import Swal from 'sweetalert2';
import { BreadCrum } from '../BreadCrum';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  lstBreadCrumb:Array<BreadCrum>=[];
  lstItemShow:any;
  hidenRL:boolean=false;
  constructor(private spinner: NgxSpinnerService,private headerService: HeaderService,private router:Router,
    private userService:UserService){

  }
  ngOnInit(): void {
    this.spinner.show();
    this.CreateBreadCrumb();
    this.GetUserByClaim();

    this.headerService.confirmMission('thanh-toan');
    this.spinner.hide();
  }
  GetUserByClaim(){
    this.userService.GetUserByClaim().then((rs:any)=>{
      if(rs.status==0){

        this.lstItemShow=rs.data;
        this.hidenRL=true;
      }
      else{
        this.hidenRL=false;
      }
    })
  }
  CreateBreadCrumb(){
    let itemBreadCrumb=new BreadCrum();
    itemBreadCrumb.name="Thanh toán";
    itemBreadCrumb.url='/thanh-toan';
    this.lstBreadCrumb.push(itemBreadCrumb);
  }
}
