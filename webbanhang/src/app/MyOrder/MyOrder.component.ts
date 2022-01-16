import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { HeaderService } from 'src/services/header.service';
import { PaymentService } from 'src/services/Payment.service';
import { RatingService } from 'src/services/Rating.service';
import Swal from 'sweetalert2';
import { BreadCrum } from '../BreadCrum';

@Component({
  selector: 'app-MyOrder',
  templateUrl: './MyOrder.component.html',
  styleUrls: ['./MyOrder.component.css']
})
export class MyOrderComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,private formBuilder: FormBuilder
    , private headerService: HeaderService, private paymentService: PaymentService,private ratingService:RatingService) { }
  lstBreadCrumb: Array<BreadCrum> = [];
  ItemRequest: any = {
    status: 1,
    page: 1,
    take: 10
  };
  lstItemShow: any;
  lstData: any;
  clClass: string = '';
  form: any;
  isDisableBtnReview:boolean=true;
  ItemStar:any={
    id:'',
    star:5,
    content:'',
    productId:'',
    userId:'',
  }
  ngOnInit() {
    this.spinner.show();
    this.form = this.formBuilder.group({
      id: [this.ItemStar.id],
      star: [this.ItemStar.star],
      content: [this.ItemStar.content,[Validators.required]],
    });
    this.headerService.confirmMission('don-hang');
    this.CreateBreadCrumb();
    this.getlstPayment();

    this.spinner.hide();
  }
  CreateBreadCrumb() {
    let itemBreadCrumb = new BreadCrum();
    itemBreadCrumb.name = "Đơn hàng";
    itemBreadCrumb.url = '/don-hang';
    this.lstBreadCrumb.push(itemBreadCrumb);
  }
  getlstPayment() {
    this.setClass();
    this.lstData = null;

    this.paymentService.GetPaymentSimpleInfo(this.ItemRequest).then((rs: any) => {

      if (rs.status == 0) {

        this.lstData = rs.data;
      }
    })
  }
  //hủy đơn hàng
  CancelPayment(id: string) {
    this.paymentService.CancelPayment({ id: id }).then((rs: any) => {
      if (rs.status == 0) {
        Swal.fire({
          icon: 'success',
          title: rs.message,
          showConfirmButton: false,
          timer: 3000
        }).then(() => {
          //this.headerService.TriggerNotificationCountCart();
          this.getlstPayment();
        });
      }
      else {

      }
    });
  }
  ShowDetail(id: string) {
    this.spinner.show();
    this.paymentService.GetPaymentById(id).then((rs: any) => {
      if (rs.status == 0) {
        this.lstItemShow = rs.data;
        document.getElementById('btnShowPaymentDetail')?.click();
      }
      this.spinner.hide();
    })
  }
  setCheckItem($event:any,productId:string){
    if($event.target.checked){
      for(let i=0;i<this.ItemStar.lstProduct.length;i++){
        if(this.ItemStar.lstProduct[i].id==productId){

          this.ItemStar.lstProduct[i].isCheck=true;
          this.ItemStar.productId=this.ItemStar.lstProduct[i].id;
          this.ratingService.GetRatingByUserIdAndProduct(this.ItemStar.lstProduct[i].id).then((rs:any)=>{
          if(rs.status==0){
            this.ItemStar.id=rs.data.id;
            this.ItemStar.star=rs.data.star;
            this.ItemStar.content=rs.data.content;
            this.ItemStar.productId=rs.data.productId;
            this.ItemStar.userId=rs.data.userId;
            }
            else{
              this.ItemStar.id='';
              this.ItemStar.star=5;
              this.ItemStar.content='';
              //this.ItemStar.productId='';
              this.ItemStar.userId='';
            }
          })
        }

      }
    }
    else{
      for(let i=0;i<this.ItemStar.lstProduct.length;i++){
        if(this.ItemStar.lstProduct[i].id==productId){
          this.ItemStar.lstProduct[i].isCheck=false;
        }
      }
    }
    //check disable
    this.isDisableBtnReview=true;
    for(let i=0;i<this.ItemStar.lstProduct.length;i++){
      if(this.ItemStar.lstProduct[i].isCheck==true){
        this.isDisableBtnReview=false;
      }

    }
  }

  setClass() {
    switch (this.ItemRequest.status) {
      case 1:
        this.clClass = 'cho-xac-nhan';
        break;
      case 2:
        this.clClass = 'da-xac-nhan';
        break;
      case 3:
        this.clClass = 'dang-giao-hang';
        break;
      case 4:
        this.clClass = 'da-giao-hang';
        break;
      case 5:
        this.clClass = 'don-hang-huy';
        break;
      default:
        break;
    }
  }

  ChangeStatus(status: number) {
    this.ItemRequest.status = status;
    this.getlstPayment();
  }

  ShowReview(lstProduct:any){

    this.ItemStar.lstProduct=lstProduct;
      document.getElementById('btnRatingReview')?.click();
  }
  ClearItem(){
    this.ItemStar.id='';
    this.ItemStar.star=5;
    this.ItemStar.content='';
    this.ItemStar.productId='';
    this.ItemStar.userId='';

    for(let i=0;i<this.ItemStar.lstProduct.length;i++){
      this.ItemStar.lstProduct[i].isCheck=false;
    }
  }
  Save(){
    Swal.fire({
      title: 'Thông báo?',
      text: "Xác nhận bình luận sản phẩm!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Quay lại',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ratingService.AddOrUpdate(this.ItemStar).then((rs:any)=>{
          if(rs.status==0){
            Swal.fire({
              icon: 'success',
              title: this.ItemStar.id!=''?'Cập nhật đánh giá sản phẩm thành công':'sản phẩm đã được đánh giá thành công',
              showConfirmButton: false,
              timer: 3000
            }).then(()=>{
              this.ClearItem();
              document.getElementById('ModalbtnRatingReviewClose')?.click();
            });
          }
          else{
            Swal.fire({
              icon: 'error',
              title: this.ItemStar.id!=''?'Cập nhật thất bại':'Thêm mới thất bại',
              showConfirmButton: false,
              timer: 3000
            });
          }
        })
      }
    })
  }
  ChangeStar(star:number){
    this.ItemStar.star=star;
  }
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '300px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Nội dung...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',

  };
}
