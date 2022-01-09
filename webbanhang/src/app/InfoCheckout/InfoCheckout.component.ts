import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseCongif } from 'src/BaseConfig';
import { BaseLocalStorage } from 'src/BaseLocalStorage';
import { HeaderService } from 'src/services/header.service';
import { PaymentService } from 'src/services/Payment.service';
import { ProductService } from 'src/services/product.service';
import { ProvinceService } from 'src/services/Province.service';
import Swal from 'sweetalert2';
import { BreadCrum } from '../BreadCrum';

@Component({
  selector: 'app-InfoCheckout',
  templateUrl: './InfoCheckout.component.html',
  styleUrls: ['./InfoCheckout.component.css']
})
export class InfoCheckoutComponent implements OnInit {

  form: any;
  Item:any= {
    id:'',
    userName: '',
    phoneNumber:'',
    email:'',
    provinceId:'',
    districtId:'',
    address:'',
    description:'',
    type:2,
    transId:''
  };
  //lưu trữ danh sách tỉnh
  lstProvinceId:any;
  //Lưu trưc huyện/
  lstDistrictId:any;
  // danh sách sản phẩm
  lstItemProductCart:any;
  //host
  urlHost: string = BaseCongif.UrlBaseHost;
  //tổng tiền
  countAllTotalPrice:number=0;

  @Input() lstItemShow:any;
  @Input() isHidentButton:boolean=false;
  @Input() isHidenLR:boolean=true;
  constructor(private formBuilder: FormBuilder,private provinceService:ProvinceService,
     private spinner: NgxSpinnerService,
     private productService: ProductService, private paymentService:PaymentService,private router:Router) { }

  ngOnInit() {
    this.spinner.show();

    this.form = this.formBuilder.group({
      id: [this.Item.id],
      userName: [this.Item.userName, Validators.compose([Validators.required])],
      phoneNumber: [this.Item.phoneNumber,[Validators.required,this.ValidNumberPhone]],
      email: [this.Item.email,[Validators.required,Validators.email]],
      address: [this.Item.address,[Validators.required]],
      provinceId:[this.Item.provinceId,[this.ValidSelect2]],
      districtId:[this.Item.districtId,[this.ValidSelect2]],
      description:[this.Item.description]
    });
    this.GetDataProvinceId();
    this.GetDataCart();
    this.spinner.hide();
  }

  GetObjectDetail(){
    if(this.lstItemShow!=undefined){
      this.Item.id=this.lstItemShow.id||'';
      this.Item.userName=this.lstItemShow.userName||'';

      this.Item.phoneNumber=this.lstItemShow.phoneNumber||'';
      this.Item.email=this.lstItemShow.email||'';
      this.Item.provinceId=this.lstItemShow.provinceId||'';
      this.Item.transId=this.lstItemShow.transId||'';
      this.Item.address=this.lstItemShow.address||'';
      this.Item.description=this.lstItemShow.description||'';
      this.Item.type=this.lstItemShow.type||2;
      this.getDistrictByProvince({id:this.Item.provinceId});
      this.Item.districtId=this.lstItemShow.districtId||'';
      this.lstItemProductCart=this.lstItemShow.listProductOrder;
      this.GetAllToTalPrice();
      //tạo data để lấy thông tin sản phẩm
      let ItemCart = BaseLocalStorage.GetItemCart();
    if (ItemCart != null) {
      this.productService.GetListProductOrder({DataJson:ItemCart}).then((rs:any)=>{
        this.lstItemProductCart=rs;
        this.GetAllToTalPrice();
      })
    }
    else{
      //thông báo với người dùng không có sản phẩm nào
    }
    }

  }

  ngOnChanges(): void {
    this.GetObjectDetail();
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
SetType(type:number){
  this.Item.type=type;
}
GetAllToTalPrice(){
  this.countAllTotalPrice=0;
  if(this.lstItemProductCart!=undefined){
    for(let i=0;i<this.lstItemProductCart.length;i++){
      let item=this.lstItemProductCart[i];
      this.countAllTotalPrice+=item.totalPrice;
    }
  }

}
GetDataCart(){
  //kiểm tra lấy data người dùng login hay không login

  let ItemCart = BaseLocalStorage.GetItemCart();
    if (ItemCart != null) {
      this.productService.GetListProductOrder({DataJson:ItemCart}).then((rs:any)=>{
        this.lstItemProductCart=rs;

        this.GetAllToTalPrice();
      })
    }
    else{
      //this.router.navigate(['/trang-chu']);
    }
}

  Save()
  {
    Swal.fire({
      title: 'Thông báo?',
      text: "Xác nhận thanh toán!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Quay lại',
    }).then((result) => {
      if (result.isConfirmed) {
        //lưu data
        let DataSend:any={};
        DataSend=this.Item;
        ////set trạng thái cho đơn hàng
        DataSend.status=1;
        //lấy thông tin đơn hàng
        let lstPaymentDetail:any=[];
        for(let i=0;i<this.lstItemProductCart.length;i++){
          let item=this.lstItemProductCart[i];
          lstPaymentDetail.push({productId:item.id,Quantily:item.count});
        }
        DataSend.lstPaymentDetail=lstPaymentDetail;

        if(this.Item.type==2){
          //thanh toán khi nhận hàng
          this.paymentService.AddOrUpdate(DataSend).then((rs:any)=>{
            if(rs.status==0){
              let paymentId=rs.data;
              this.router.navigate(["/hoan-thanh"],  { queryParams: { type: 2, status:0,paymentId:paymentId} });
            }
            else{
              this.router.navigate(['/hoan-thanh',{ queryParams: {type: 2, status:1}}]);
            }

          })
        }
        if(this.Item.type==1){
          //thanh toán momo
          this.paymentService.PaymentMoMo(DataSend).then((rs:any)=>{
            if(rs.status==0){
              window.open(rs.message,'_blank');
            }
          })
        }

      }
    })
  }
}
