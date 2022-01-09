import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseCongif } from 'src/BaseConfig';
import { CategoryService } from 'src/services/Category.service';
import { HeaderService } from 'src/services/header.service';
import { ProductService } from 'src/services/product.service';
import { BreadCrum } from '../BreadCrum';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  category:string='';
  ItemRequest:any={
    page:1,
    take:10,
    code:'',
    keyword:'',
    order:''
  }
  lstBreadCrumb:Array<BreadCrum>=[];
  strNotFind:string="";
  lstProduct:any=[];
  urlHost:string=BaseCongif.UrlBaseHost;
  lstSearchBy:any=[];
  //pagination
  pageLast:number=0;
  totalArray:Array<number>=[];
  total:number=0;
  //danh sách các sản phẩm mua nhiều nhất
  lstProductIsMostBuy:Array<any>=[];

  constructor(private headerService:HeaderService,private productService:ProductService,private route: ActivatedRoute
    ,private spinner: NgxSpinnerService,private router:Router,private categoryService:CategoryService) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      };
    }

  ngOnInit() {
    this.spinner.show();

    this.lstSearchBy.push({id:'NAMEAZ',name:'Tên từ a -> z'});
    this.lstSearchBy.push({id:'NAMEZA',name:'Tên từ z -> a'});
    this.lstSearchBy.push({id:'PRICEASC',name:'Giá giảm dần'});
    this.lstSearchBy.push({id:'PRICEDES',name:'Giá tăng dần'});


    this.ItemRequest.code=this.route.snapshot.queryParamMap.get('c')||'';
    this.ItemRequest.keyword=this.route.snapshot.queryParamMap.get('k')||'';
    this.GetListProductIsMostBuy();
    if(this.ItemRequest.code){
      this.strNotFind='Sản phẩm đã hết, vui lòng quay lại vào đợt tới';
      this.CreateBreadCrumbCategory();
    }
    else if(this.ItemRequest.keyword){
      this.strNotFind='không tìm thấy sản phẩm với từ khóa '+this.ItemRequest.keyword+'';
      this.CreateBreadCrumb();

    }
    else{
      //lấy hết tất cả các sản phẩm
    }
    if(this.ItemRequest.code=='' && this.ItemRequest.keyword==''){
      this.GetListProductAll();
    }
    else{
      this.GetListProduct();
    }

    this.headerService.confirmMission('san-pham');

    this.spinner.hide();
  }

  GetListProductIsMostBuy(){
    this.productService.GetListProductIsMostBuy(this.ItemRequest).then((rs:any)=>{
      if(rs.status==0){
        this.lstProductIsMostBuy=rs.data;
      }

    })
  }

  GetProductSort($event:any){
    this.ItemRequest.order=$event.id;
    this.GetListProduct();
  }

  CreateBreadCrumb(){
    let itemBreadCrumb=new BreadCrum();
    itemBreadCrumb.name="Tìm kiếm";
    itemBreadCrumb.url='/';
    this.lstBreadCrumb.push(itemBreadCrumb);
  }
  CreateBreadCrumbCategory(){
    let itemBreadCrumb=new BreadCrum();
    this.categoryService.GetCategoryByCode(this.ItemRequest.code).then((rs:any)=>{
      itemBreadCrumb.name=rs.name;
      this.lstBreadCrumb.push(itemBreadCrumb);
    });

  }
  GetListProduct(){
    this.productService.GetListProduct(this.ItemRequest).then((rs:any)=>{
      if(rs.status==0){
        this.lstProduct=rs.data;
        this.total=rs.total;
        this.genArray();
      }
    })
  }
  GetListProductAll(){
    this.productService.GetListProductAll(this.ItemRequest).then((rs:any)=>{
      if(rs.status==0){
        this.lstProduct=rs.data;
        this.total=rs.total;
        this.genArray();
      }
    })
  }
  onPaginationChange(page:number){
    this.ItemRequest.page=page;
    if(this.ItemRequest.code=='' && this.ItemRequest.keyword==''){
      this.GetListProductAll();
    }
    else{
      this.GetListProduct();
    }

  }
  genArray()
  {
    this.pageLast=Math.ceil(this.total / this.ItemRequest.take);
    this.totalArray=[];
    let maxPageRender:number=this.ItemRequest.page + 2 > Math.ceil(this.total / this.ItemRequest.take) ? Math.ceil(this.total / this.ItemRequest.take) : this.ItemRequest.page + 2;
    let minPageRender:number=this.ItemRequest.page - 2 < 1 ? 1 : this.ItemRequest.page - 2;
    for(let i=minPageRender;i<=maxPageRender;i++){
      this.totalArray.push(i);
    }
  }
}
