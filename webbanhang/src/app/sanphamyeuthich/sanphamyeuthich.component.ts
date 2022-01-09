import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { BaseCongif } from 'src/BaseConfig';
import { BaseLocalStorage } from 'src/BaseLocalStorage';
import { HeaderService } from 'src/services/header.service';
import { BreadCrum } from '../BreadCrum';

@Component({
  selector: 'app-sanphamyeuthich',
  templateUrl: './sanphamyeuthich.component.html',
  styleUrls: ['./sanphamyeuthich.component.css']
})
export class SanphamyeuthichComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService
    , private headerService: HeaderService) { }
    lstBreadCrumb: Array<BreadCrum> = [];
    lstWishList:Array<any>=[];
    urlHost:string=BaseCongif.UrlBaseHost;
  ngOnInit() {
    this.CreateBreadCrumb();
    this.GetWishList()
  }
  GetWishList(){
    let strData=BaseLocalStorage.GetWishList();
    if(strData!=null && (strData+'')!=''){
      this.lstWishList=JSON.parse(strData);
    }

  }

  RemoveItem(id:string){
    let strData=BaseLocalStorage.GetWishList();
    if(strData!=null){
      let data=JSON.parse(strData);
      for(let i=0;i<data.length;i++){
        if(data[i].id==id){
          data.splice(i, 1);
        }
      }
      let strDataSave=JSON.stringify(data);
      if(strDataSave=='[]')
      {
        BaseLocalStorage.RemoveWishList();
        this.lstWishList=[];
      }else{
        BaseLocalStorage.SetWishList(strDataSave);
        this.lstWishList=data;
      }


    }
  }

  CreateBreadCrumb() {
    let itemBreadCrumb = new BreadCrum();
    itemBreadCrumb.name = "Đơn hàng";
    itemBreadCrumb.url = '/don-hang';
    this.lstBreadCrumb.push(itemBreadCrumb);
  }
}
