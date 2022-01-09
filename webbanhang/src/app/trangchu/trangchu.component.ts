import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseCongif } from 'src/BaseConfig';
import { BannerService } from 'src/services/Banner.service';
import { HeaderService } from 'src/services/header.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-trangchu',
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.css']
})
export class TrangchuComponent implements OnInit {

  //danh sách các sản phẩm mua nhiều nhất
  lstProductIsMostBuy:Array<any>=[];

  lstProduct:Array<any>=[];
  lstBannerTrangChu:Array<any>=[];
  lstBannerTrangChuRight:Array<any>=[];
  urlHost:string=BaseCongif.UrlBaseHost;
  constructor(private spinner: NgxSpinnerService,private productService:ProductService,private headerService:HeaderService,
    private bannerService:BannerService) {
      this.spinner.show();
      this.GetListBanner();
      this.GetListProduct('');
  }

  ngOnInit() {

    this.headerService.confirmMission('trang-chu');
    //lấy danh sách sản phẩm mua nhiều nhất
    this.GetListProductIsMostBuy();

    this.spinner.hide();
  }
  ItemRequest:any={
    page:1,
    take:15,
    code:''
  }
  ItemBannerRequest:any={
    page:1,
    take:5

  }

  GetListProduct(code:string){
    this.spinner.show();
    this.ItemRequest.code=code;
    this.productService.GetListProduct(this.ItemRequest).then((rs:any)=>{
      this.spinner.hide();
      if(rs.status==0){

        this.lstProduct=rs.data;
      }
    })
  }
  GetListBanner(){
    this.bannerService.GetListBanner(this.ItemBannerRequest).then((rs:any)=>{
      if(rs.status==0){
        for(let i=0;i<rs.data.length;i++){
          if(rs.data[i].position=='TRANGCHU'){
            this.lstBannerTrangChu.push(rs.data[i]);
          }
          else if(rs.data[i].position=='TRANGCHU_RIGHT'){
            this.lstBannerTrangChuRight.push(rs.data[i]);
          }
        }
      }

    })
  }
  GetListProductIsMostBuy(){
    this.productService.GetListProductIsMostBuy(this.ItemRequest).then((rs:any)=>{
      if(rs.status==0){
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

  customOptionsBanner: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    dots: false,
    lazyLoad:true,
    navSpeed: 900,
    navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    nav: true,
    items:1
  }
}
