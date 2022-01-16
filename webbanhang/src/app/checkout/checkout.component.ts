import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseLocalStorage } from 'src/BaseLocalStorage';
import { HeaderService } from 'src/services/header.service';
import { ProductService } from 'src/services/product.service';
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
  isHidenButton=false;
  hidenRL:boolean=false;
  constructor(private spinner: NgxSpinnerService,private headerService: HeaderService,private router:Router,
    private userService:UserService,private productService:ProductService){

  }
  ngOnInit(): void {
    this.spinner.show();
    this.CreateBreadCrumb();
    this.GetUserByClaim();
    this.CheckIsCheckOut();
    this.headerService.confirmMission('thanh-toan');
    this.spinner.hide();
  }

  CheckIsCheckOut() {
    let ItemCart = BaseLocalStorage.GetItemCart();
    this.productService.CheckQuantity({ DataJson: ItemCart }).then((rs: any) => {
      if (rs.status == 0) {
        //sản phẩm vẫn còn hàng


      }
      else {
        this.isHidenButton=true;
        Swal.fire({
          icon: 'error',
          title: "Đã có ít nhất một sản phẩm đã hết hàng, vui lòng kiểm tra lại trong giỏ hàng nhé",
          showConfirmButton: false,
          timer: 5000
        });
      }
    });
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
