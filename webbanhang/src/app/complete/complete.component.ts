import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { BaseLocalStorage } from 'src/BaseLocalStorage';
import { HeaderService } from 'src/services/header.service';
import { MoMoService } from 'src/services/MoMo.service';
import { PaymentService } from 'src/services/Payment.service';
import Swal from 'sweetalert2';
import { BreadCrum } from '../BreadCrum';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

  lstBreadCrumb:Array<BreadCrum>=[];
  Item:any={
    message:'',
    status:-1
  }
  lstItemShow:any;
  subGetParam:Subscription=Subscription.EMPTY;
  constructor(private spinner: NgxSpinnerService,private headerService: HeaderService,private router:Router
    ,private routeActivated: ActivatedRoute,private moMoService:MoMoService,private paymentService:PaymentService) { }
  async ngOnInit() {
    this.spinner.show();
    this.CreateBreadCrumb();
    if(Object.keys(this.routeActivated.snapshot.queryParams).length === 0){
      this.router.navigate(['/trang-chu']);
    }
    //kiểm tra trạng thái là thanh toán khi nhận hàng hay là momo
    let type= this.routeActivated.snapshot.queryParams['type'];
    if(type==undefined){
      //là momo
      let strquery=this.GetParam();
    this.moMoService.MomoSuccess(strquery).then((rs:any)=>{
      this.Item=rs;
      if(rs.status==0){
        //thấy thông tin của đơn hàng
        let paymentId=rs.data;
        if(paymentId!=undefined){
           this.paymentService.GetPaymentById(paymentId).then((rs:any)=>{
            if(rs.status==0){
              this.lstItemShow=rs.data;
            }
          });
        }
        Swal.fire({
          icon: 'success',
          title: this.Item.message,
          showConfirmButton: false,
          timer: 3000
        }).then( () => {
          BaseLocalStorage.ClearItemCart();
          this.headerService.TriggerNotificationCountCart();
        });
      }
      else{
        Swal.fire({
          icon: 'error',
          title: this.Item.message,
          showConfirmButton: false,
          timer: 3000
        }).then( () => {

        });
      }
    })
    }
    else{
      //là thanh toán khi nhận hàng
      let status=this.routeActivated.snapshot.queryParams['status'];
      if(status!=undefined){
        if(status==0){
          //set trạng thái hoàn thành
          this.Item.status=0;
          this.Item.message="Đơn hàng đã được xác nhận";
          //thấy thông tin của đơn hàng
          let paymentId=this.routeActivated.snapshot.queryParams['paymentId'];
          if(paymentId!=undefined){
             this.paymentService.GetPaymentById(paymentId).then((rs:any)=>{
              if(rs.status==0){
                this.lstItemShow=rs.data;
              }
            });
          }
          //là thành công
          BaseLocalStorage.ClearItemCart();
              Swal.fire({
                icon: 'success',
                title: 'Xác nhận đơn hàng thành công',
                showConfirmButton: false,
                timer: 3000
              }).then( () => {
                this.headerService.TriggerNotificationCountCart();

              });
        }
        else{
          //là thất bại
              Swal.fire({
                icon: 'error',
                title: 'Xác nhận đơn hàng thất bại',
                showConfirmButton: false,
                timer: 3000
              }).then( () => {

              });
        }
      }
    }
    //get thông tin của người
    this.headerService.confirmMission('hoan-thanh');
    this.spinner.hide();
  }

  GetParam(){
    let amount=this.routeActivated.snapshot.queryParams['amount'];
    let extraData=this.routeActivated.snapshot.queryParams['extraData'];
    let message=this.routeActivated.snapshot.queryParams['message'];
    let orderId=this.routeActivated.snapshot.queryParams['orderId'];
    let orderInfo=this.routeActivated.snapshot.queryParams['orderInfo'];
    let orderType=this.routeActivated.snapshot.queryParams['orderType'];
    let partnerCode=this.routeActivated.snapshot.queryParams['partnerCode'];
    let payType=this.routeActivated.snapshot.queryParams['payType'];
    let requestId=this.routeActivated.snapshot.queryParams['requestId'];
    let responseTime=this.routeActivated.snapshot.queryParams['responseTime'];
    let resultCode=this.routeActivated.snapshot.queryParams['resultCode'];
    let signature=this.routeActivated.snapshot.queryParams['signature'];
    let transId=this.routeActivated.snapshot.queryParams['transId'];
    return "amount="+amount+"&extraData="+extraData+"&message="+message
    +"&orderId="+orderId+"&orderInfo="+orderInfo+"&orderType="+orderType+"&partnerCode="+partnerCode
    +"&payType="+payType+"&requestId="+requestId+"&responseTime="+responseTime+"&resultCode="+resultCode
    +"&signature="+signature+"&transId="+transId ;
  }
  CreateBreadCrumb(){
    let itemBreadCrumb=new BreadCrum();
    itemBreadCrumb.name="Hoàn thành";
    itemBreadCrumb.url='/hoan thanh';
    this.lstBreadCrumb.push(itemBreadCrumb);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subGetParam.unsubscribe();
  }
}
