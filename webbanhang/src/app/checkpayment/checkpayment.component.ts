import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseCongif } from 'src/BaseConfig';
import { HeaderService } from 'src/services/header.service';
import { PaymentService } from 'src/services/Payment.service';
import { BreadCrum } from '../BreadCrum';

@Component({
  selector: 'app-checkpayment',
  templateUrl: './checkpayment.component.html',
  styleUrls: ['./checkpayment.component.css']
})
export class CheckpaymentComponent implements OnInit {
  lstBreadCrumb:Array<BreadCrum>=[];
  data: any;
    //host
  urlHost: string = BaseCongif.UrlBaseHost;
  constructor(private spinner: NgxSpinnerService,private paymentService:PaymentService) { }
  transId:string='';
  ngOnInit() {
    this.spinner.show();
    this.CreateBreadCrumb();

    this.spinner.hide()
  }

  GetValue($event:any){
    this.transId=$event.target.value;
  }
  GetPaymentBytranId(){
    this.spinner.show();
    this.paymentService.GetPaymentBytranId(this.transId).then((rs:any)=>{
      this.spinner.hide();
      if(rs.status==0){
        this.data=rs.data;
      }
    })
  }
  removeModal(){
    document.getElementById('openmodalInfoPayment')?.click();
  }
  CreateBreadCrumb(){
    let itemBreadCrumb=new BreadCrum();
    itemBreadCrumb.name="Kiểm tra đơn hàng";
    itemBreadCrumb.url='/kiem-tra-don-hang';
    this.lstBreadCrumb.push(itemBreadCrumb);
  }
  Search(){
    if(this.transId!=''){
      this.GetPaymentBytranId();
    }
  }


  // setClass() {
  //   switch (this.ItemRequest.status) {
  //     case 1:
  //       this.clClass = 'cho-xac-nhan';
  //       break;
  //     case 2:
  //       this.clClass = 'da-xac-nhan';
  //       break;
  //     case 3:
  //       this.clClass = 'dang-giao-hang';
  //       break;
  //     case 4:
  //       this.clClass = 'da-giao-hang';
  //       break;
  //     case 5:
  //       this.clClass = 'don-hang-huy';
  //       break;
  //     default:
  //       break;
  //   }
  // }
}
