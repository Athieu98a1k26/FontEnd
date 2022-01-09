import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/services/header.service';
import { PaymentService } from 'src/services/Payment.service';
import { ProductService } from 'src/services/product.service';
import { BreadCrum } from '../BreadCrum';

@Component({
  selector: 'app-checkpayment',
  templateUrl: './checkpayment.component.html',
  styleUrls: ['./checkpayment.component.css']
})
export class CheckpaymentComponent implements OnInit {
  lstBreadCrumb:Array<BreadCrum>=[];
  constructor(private spinner: NgxSpinnerService,private headerService: HeaderService,
    private productService: ProductService, private paymentService:PaymentService,private router:Router) { }
    ItemRequest:any={
      transId:''
    }
  ngOnInit() {
    this.spinner.show();
    this.CreateBreadCrumb();

    this.spinner.hide()
  }

  GetValue($event:any){
    this.ItemRequest.transId=$event.target.value;
  }


  CreateBreadCrumb(){
    let itemBreadCrumb=new BreadCrum();
    itemBreadCrumb.name="Kiểm tra đơn hàng";
    itemBreadCrumb.url='/kiem-tra-don-hang';
    this.lstBreadCrumb.push(itemBreadCrumb);
  }
  Search(){
    if(this.ItemRequest.transId!=''){

    }
  }
}
