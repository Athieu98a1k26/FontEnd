import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuProfileUser',
  templateUrl: './menuProfileUser.component.html',
  styleUrls: ['./menuProfileUser.component.css']
})
export class MenuProfileUserComponent implements OnInit {

  @Input() lstIdShow: Array<number> = [];
  @Input() pageActive:number=0;
  lstPage:Array<any>=[];
  lstPageShow:Array<any>=[];
  constructor(private router:Router) {
    this.lstPage=[];
    this.lstPageShow=[];
    this.lstPage.push({id:1,name:'Thông tin tài khoản',link:'/thong-tin-tai-khoan',icon:'fa fa-user',active:false});
    this.lstPage.push({id:2,name:'Đơn hàng của tôi',link:'/don-hang',icon:'fa fa-list-alt',active:false});
    this.lstPage.push({id:3,name:'Sản phẩm yêu thích',link:'/san-pham-yeu-thich',icon:'fa fa-shopping-cart',active:false});
    this.lstPage.push({id:4,name:'Thay đổi mật khẩu',link:'/thay-doi-mat-khau',icon:'fa fa-key',active:false});
    this.lstPage.push({id:5,name:'Đăng nhập',link:'/dang-nhap',icon:'fa fa-sign-in',active:false});
    this.lstPage.push({id:6,name:'Đăng ký',link:'/dang-ky',icon:'fa fa-key',active:false});
    this.lstPage.push({id:7,name:'Quên mật khẩu',link:'/quen-mat-khau',icon:'fa fa-key',active:false});
    //this.lstPage.push({id:8,name:'Đăng xuất',link:'#',icon:'fa fa-sign-out',active:false});


   }

  Containt(id:number){
    for(let i=0;i<this.lstIdShow.length;i++){
      if(id==this.lstIdShow[i]){
        //return true, và kiểm tra nó có active hay không
        if(this.lstIdShow[i]==this.pageActive){
          return {show:true,active:true};
        }
        return {show:true,active:false};
      }
    }
    return {show:false,active:false};
  }
  ngOnInit() {
    for(let i=0;i<this.lstPage.length;i++){
      let check=this.Containt(this.lstPage[i].id);
      let show=check.show;
      let active=check.active;
      if(show){
        this.lstPage[i].active=active;
        this.lstPageShow.push(this.lstPage[i]);
      }
    }
  }
}
