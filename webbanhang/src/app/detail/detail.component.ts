import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';

import { BaseCongif } from 'src/BaseConfig';
import { BaseLocalStorage } from 'src/BaseLocalStorage';
import { CartEnity } from 'src/CartEnity';
import { HeaderService } from 'src/services/header.service';
import { ProductService } from 'src/services/product.service';
import { RatingService } from 'src/services/Rating.service';
import { UserPhoneFeedbackService } from 'src/services/UserPhoneFeedback.service';
import Swal from 'sweetalert2';
import { BreadCrum } from '../BreadCrum';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  //tham số query
  productCode: string = '';
  //dữ liệu sản phẩm
  ProductItem: any = {};
  imgProductCurrent: string = '';
  urlHost: string = BaseCongif.UrlBaseHost;
  zoomMode: string = 'hover';
  countItem: number = 1;
  //lưu trữ số lượng sao và giá trị
  lstReportRating:any;
  //biến kiểm tra có dữ liệu comment sản phẩm hay không
  isEmtyReportRating:boolean=true;
  lstBreadCrumb:Array<BreadCrum>=[];
  nameDetail:string='';

  IsShowErrorPhone:boolean=false;

  lstCommentRating:any;
  ItemCallPhone:any={
    phone:'',
    productId:''
  }
  ItemRequest:any={
    page:1,
    take:5,
    code:'',
    keyword:'',
    order:''
  }
  lstProduct:Array<any>=[];
  //danh sách các sản phẩm mua nhiều nhất
  lstProductIsMostBuy:Array<any>=[];
  constructor(private route: ActivatedRoute, private spinner: NgxSpinnerService, private headerService: HeaderService,
    private productService: ProductService,private ratingService:RatingService,
    private userPhoneFeedbackService:UserPhoneFeedbackService,private routeNavigation:Router,private sanitizer: DomSanitizer,private router:Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      };
    }

  ngOnInit() {
    this.spinner.show();
    this.headerService.confirmMission('chi-tiet-san-pham');
    this.productCode = this.route.snapshot.queryParamMap.get('p') || '';
    if (this.productCode) {
      this.productService.GetProductByCode(this.productCode).then((rs: any) => {
        this.ProductItem = rs;
        this.ProductItem.content = this.sanitizer.bypassSecurityTrustHtml(this.ProductItem.content);
        this.ProductItem.description = this.sanitizer.bypassSecurityTrustHtml(this.ProductItem.description);
        this.CreateBreadCrumb(this.ProductItem.categoryName,this.ProductItem.categoryCode,this.ProductItem.name);
        this.imgProductCurrent = this.urlHost + '/' + this.ProductItem.productImage[0].urlFile;
        this.GetLstProductBySameCategory(this.ProductItem.categoryCode);
      })
    }
    this.GetListProductIsMostBuy();
    this.spinner.hide();
  }
  GetListProductIsMostBuy(){
    this.productService.GetListProductIsMostBuy(this.ItemRequest).then((rs:any)=>{
      if(rs.status==0){
        console.log(rs);
        this.lstProductIsMostBuy=rs.data;
      }

    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navSpeed: 900,
    lazyLoad:true,
    navText: ['', ''],
    responsive: { 0: { items: 1, }, 600: { items: 3 }, 1000: { items: 5 } },
    nav: false
  }
  GetLstProductBySameCategory(categoryCode:string){
    let ItemRequest:any={
      page:1,
      take:5,
      code:categoryCode,
      keyword:'',
      order:''
    }
    this.productService.GetListProduct(ItemRequest).then((rs:any)=>{
      if(rs.status==0){
        this.lstProduct=rs.data;
      }
    })
  }

  CreateBreadCrumb(name:string,code:string,nameDetail:string){
    let itemBreadCrumb=new BreadCrum();
    itemBreadCrumb.name=name;
    itemBreadCrumb.url='/san-pham';
    itemBreadCrumb.param={c:code};
    this.lstBreadCrumb.push(itemBreadCrumb);
    this.nameDetail=nameDetail;
  }

  OnChangeCouter($event:any){
    this.countItem=parseInt($event.countItem);
  }
  AddToCart() {
    //check cả ở productItem
    //kiểm tra nếu người dùng không đăng nhập thì lưu ở local storage, ngược lại thì lưu ở trong db
    if (BaseLocalStorage.IsUserNotLogin()) {
      //người dùng không đăng nhập; lúc đó lưu ở local
      let cartEntity=new CartEnity();
      cartEntity.id=this.ProductItem.id;
      cartEntity.name=this.ProductItem.name;
      cartEntity.count=this.countItem;
      BaseLocalStorage.SetItemCart(cartEntity);
      this.countItem = 1;
      this.headerService.TriggerNotificationCountCart();
      Swal.fire({
        icon: 'success',
        title: 'Thêm vào giỏ hàng thành công',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else {
      //lưu xuống server
    }

  }
  BuyProduct(){
    let cartEntity=new Array<CartEnity>();
    let itemCart=new CartEnity();
    itemCart.id=this.ProductItem.id;
    itemCart.name=this.ProductItem.name;
    itemCart.count=1;
    cartEntity.push(itemCart)
    BaseLocalStorage.SetListOverideItemCart(cartEntity);

    this.routeNavigation.navigate(['/thanh-toan'], { relativeTo: this.route });
  }
  AddOrUpdatePhone(){
    this.userPhoneFeedbackService.AddOrUpdate(this.ItemCallPhone).then((rs:any)=>{
      Swal.fire({
        icon: 'success',
        title: 'Shop sẽ gọi lại để tư vấn cho Quý khách hàng trong thời gian sớm nhất',
        showConfirmButton: false,
        timer: 3000
      }).then((rs:any)=>{
        this.ItemCallPhone.phone='';
        this.ItemCallPhone.productId='';
      });
    })
  }
  ValidNumberPhone(phone:string) {
    console.log(phone);
    if(phone==''){
      return this.IsShowErrorPhone=false;
    }
    return /(0[3|5|7|8|9])+([0-9]{8})\b/.test(phone) ? this.IsShowErrorPhone=false : this.IsShowErrorPhone=true
  }

  GetPhone($event:any,productId:string){
    this.ValidNumberPhone($event.target.value);
    if(!this.IsShowErrorPhone){
      this.ItemCallPhone.phone=$event.target.value;
      this.ItemCallPhone.productId=productId;
    }
    else{
      this.ItemCallPhone.phone='';
      this.ItemCallPhone.productId='';
    }
  }

  GetReportRating(ProductId:string){
    this.ratingService.GetReportRating(ProductId).then((rs:any)=>{
      if(rs.status==0){

        this.isEmtyReportRating=true;
        this.lstReportRating=rs.data;
        for(let i=0;i<this.lstReportRating.length;i++){
          if(this.lstReportRating[i].count>0){
            this.isEmtyReportRating=false;
          }
        }
        if(!this.isEmtyReportRating){
          this.GetComment(0);
        }
      }

    })
  }
  GetComment(star:number){
    let ItemStarRequest:any={
      Star:star,
      ProductId:this.ProductItem.id,
      page:1,
      take:10
    };
    this.ratingService.Search(ItemStarRequest).then((rs:any)=>{
      if(rs.status==0){
        this.lstCommentRating=rs.data;
      }
    })
  }
}
