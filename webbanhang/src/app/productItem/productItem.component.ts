import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseCongif } from 'src/BaseConfig';
import { BaseLocalStorage } from 'src/BaseLocalStorage';
import { CartEnity } from 'src/CartEnity';
import { HeaderService } from 'src/services/header.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productItem',
  templateUrl: './productItem.component.html',
  styleUrls: ['./productItem.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() item:any;
  @Input() typeItem:string='';
  urlHost:string=BaseCongif.UrlBaseHost;
  constructor(private headerService:HeaderService,private router:Router) { }

  ngOnInit() {
  }
  AddItemCart(id:string,name:string){
    let cartEntity=new CartEnity();
      cartEntity.id=id;
      cartEntity.name=name;
      cartEntity.count=1;
      BaseLocalStorage.SetItemCart(cartEntity);
      this.headerService.TriggerNotificationCountCart();
      Swal.fire({
        icon: 'success',
        title: 'Thêm vào giỏ hàng thành công',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        //this.router.navigate(['/gio-hang']);
      });

  }

  AddItemWishList(id:string,name:string,url:string,code:string){
    let lstItemWishList=new Array<any>();
    let strWishList=BaseLocalStorage.GetWishList();
    if(strWishList!=null && (strWishList+'')!=''){
      lstItemWishList=(JSON.parse(strWishList||''));
      for(let i=0;i<lstItemWishList.length;i++){
        if(lstItemWishList[i].id===id){

          Swal.fire({
            icon: 'success',
            title: 'Đã thêm vào danh sách yêu thích',
            showConfirmButton: false,
            timer: 1500
          });
          return;
        }
      }
    }
    lstItemWishList.push({id:id,name:name,url:url,code:code});
    BaseLocalStorage.SetWishList(JSON.stringify(lstItemWishList));
    Swal.fire({
      icon: 'success',
      title: 'Đã thêm vào danh sách yêu thích',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
