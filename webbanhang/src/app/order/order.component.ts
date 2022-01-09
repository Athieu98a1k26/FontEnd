import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseCongif } from 'src/BaseConfig';
import { BaseLocalStorage } from 'src/BaseLocalStorage';
import { CartEnity } from 'src/CartEnity';
import { HeaderService } from 'src/services/header.service';
import { ProductService } from 'src/services/product.service';
import Swal from 'sweetalert2';
import { BreadCrum } from '../BreadCrum';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  urlHost: string = BaseCongif.UrlBaseHost;
  lstBreadCrumb:Array<BreadCrum>=[];
  lstItemProductCart:any;
  countAllTotalPrice:number=0;
  constructor(private route: ActivatedRoute, private spinner: NgxSpinnerService, private headerService: HeaderService,
    private productService: ProductService,private routerNavigation: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.headerService.confirmMission('gio-hang');
    this.GetDataCart();
    this.CreateBreadCrumb();
    this.spinner.hide();
  }
  CreateBreadCrumb(){
    let itemBreadCrumb=new BreadCrum();
    itemBreadCrumb.name="Giỏ hàng";
    itemBreadCrumb.url='/gio-hang';
    this.lstBreadCrumb.push(itemBreadCrumb);
  }
  OnChangeCouter($event:any){
    let countItem=parseInt($event.countItem);
    for(let i=0;i<this.lstItemProductCart.length;i++){
      let item=this.lstItemProductCart[i];
      if(item.id==$event.identity){
        item.count=countItem;
        item.totalPrice=item.count*item.price;
      }
    }
    this.GetAllToTalPrice();
  }

  GetAllToTalPrice(){
    this.countAllTotalPrice=0;
    for(let i=0;i<this.lstItemProductCart.length;i++){
      let item=this.lstItemProductCart[i];
      this.countAllTotalPrice+=item.totalPrice;
    }
  }
  removeItemCart(id:string){
    Swal.fire({
      title: 'Thông báo?',
      text: "Bạn có muốn xóa bản phẩm này khỏi giỏ hàng!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
      cancelButtonText:"Không đồng ý"
    }).then((result) => {
      if (result.isConfirmed) {
        //kiểm tra xóa ở local storage hay trong db
        for(let i=0;i<this.lstItemProductCart.length;i++){
          let item=this.lstItemProductCart[i];
          if(item.id==id){
            this.lstItemProductCart.splice(i, 1);
          }
        }
      let cartEntity=new Array<CartEnity>();
      for(let i=0;i<this.lstItemProductCart.length;i++){
        let item=this.lstItemProductCart[i];
        let itemCart=new CartEnity();
        itemCart.id=item.id;
        itemCart.name=item.name;
        itemCart.count=item.count;
        cartEntity.push(itemCart)
      }
      BaseLocalStorage.SetListOverideItemCart(cartEntity);
      this.GetAllToTalPrice();
      this.headerService.TriggerNotificationCountCart();
      }
    })

  }

  CheckoutItem(){

    let cartEntity=new Array<CartEnity>();
      for(let i=0;i<this.lstItemProductCart.length;i++){
        let item=this.lstItemProductCart[i];
        let itemCart=new CartEnity();
        itemCart.id=item.id;
        itemCart.name=item.name;
        itemCart.count=item.count;
        cartEntity.push(itemCart)
      }
      BaseLocalStorage.SetListOverideItemCart(cartEntity);

    this.routerNavigation.navigate(['/thanh-toan'], { relativeTo: this.route });
  }
  GetDataCart(){
    //kiểm tra lấy data người dùng login hay không login

    if (BaseLocalStorage.IsUserNotLogin()) {
      //lấy dữ liệu người dùng không đăng nhập
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
}
