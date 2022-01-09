import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/services/header.service';
import { BaseCongif } from 'src/BaseConfig';
import { BannerService } from 'src/services/Banner.service';
import { MenuManagerService } from 'src/services/MenuManager.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UserService } from 'src/services/User.service';
import { BaseLocalStorage } from 'src/BaseLocalStorage';
import { AuthService } from 'src/services/Auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  countItemCart:number=0;
  lstCategory:any;
  lstBanner:any;
  lstMenuManager:any;
  urlHost:string=BaseCongif.UrlBaseHost;
  infoUser:any={
    email:'',
  };
  urlMidder:string="san-pham";
  keyWordSearch:string='';
  ItemBannerRequest:any={
    page:1,
    take:5

  }
  ItemMenuManagerRequest:any={
    page:1,
    take:3333

  }
  showbanner:boolean=true;
  subscription: Subscription=Subscription.EMPTY;
  notificationCountCart:Subscription=Subscription.EMPTY;
  currentUser:Subscription=Subscription.EMPTY;
  constructor(private headerService:HeaderService,
    private bannerService:BannerService,private menuManagerService:MenuManagerService,private router: Router
    ,private userService:UserService,private authService:AuthService) { }

  ngOnInit() {


    this.subscription=this.headerService.missionPassData$.subscribe(
      url => {

        switch(url){

          case('trang-chu'):
          this.ShowMenu();
          break;
          default:
            this.HideMenu();
          break;
        }
      });

      this.notificationCountCart=this.headerService.notificationCountCart$.subscribe(()=>{
        this.countItemCart=0
        let ItemCart=localStorage.getItem('ItemCart');
          if(ItemCart==null){
            this.countItemCart=0;
          }
          else{
            let DataItemCart=JSON.parse(ItemCart);
            for(let i=0;i<DataItemCart.length;i++){
              this.countItemCart+=DataItemCart[i].count;
            }
          }
      });
    this.currentUser=this.headerService.currentUser$.subscribe(()=>{
      let token=BaseLocalStorage.GetToken();
      if(token==null){
        this.infoUser={
          email:''
        }
        return;
      }

      let strExpire=BaseLocalStorage.GetExpire();
      let dateExpire=new Date(strExpire||'');
      let dateNow=new Date();
      if(dateExpire>dateNow){
        //vẫn còn hạn thì lấy token kia
        this.userService.GetInfo().then((rs:any)=>{
          if(rs.status==0){
            this.infoUser=rs.data;
          }
          else{
            this.infoUser={
              email:''
            }
          }
        })
      }
      else{

        this.authService.CheckAuthenticated().then((rs:any)=>{
          if(rs!=undefined){
            if(rs.status==0){
              this.userService.GetInfo().then((rs:any)=>{
                if(rs.status==0){
                  this.infoUser=rs.data;
                }
                else{
                  this.infoUser={
                    email:''
                  }
                }
              })
            }
            else if(rs.status==1){
              this.infoUser={
                email:''
              }
            }
            else if(rs.status==2){
              let token=rs.data.token;
              let refreshToken=rs.data.refreshToken;
              BaseLocalStorage.SetToken(token||'');
              BaseLocalStorage.SetrefreshToken(refreshToken||'');
              BaseLocalStorage.SetExpire(rs.data.expire||'');
              this.userService.GetInfo().then((rs:any)=>{
                if(rs.status==0){
                  this.infoUser=rs.data;
                }
                else{
                  this.infoUser={
                    email:''
                  }
                }
              })
            }
          }


        });

      }

    })
    this.headerService.TriggerLoadCurrentUser();
    this.headerService.TriggerNotificationCountCart();
    this.GetListCategoryTree();
    this.GetListBanner();
    this.getListMenuManager();
  }
  LogOut(){
    this.userService.Logout().then((rs:any)=>{
      if(rs.status==0){
        BaseLocalStorage.RemoveToken();
        BaseLocalStorage.RemoverefreshToken();
        BaseLocalStorage.RemoveExpire();
        this.headerService.TriggerLoadCurrentUser();
        this.router.navigate(['/trang-chu']);
      }
    });
  }
  getKeySearch($event:any){
    this.keyWordSearch=$event.target.value;

  }
  Search(){
    if(this.keyWordSearch!=''){
      this.router.navigate(['/san-pham'],{queryParams:{k:this.keyWordSearch}});
    }
  }
  ShowMenu(){
    let HasClassHome=document.getElementById('mainbody')?.classList.contains('home');
    if(!HasClassHome){
      document.getElementById('mainbody')?.classList.add('home');

    }
    let el:any=document.getElementById('vertical-menu-contentId');
    el.style.display='block';
  }
  HideMenu(){
    let HasClassHome=document.getElementById('mainbody')?.classList.contains('home');
    if(HasClassHome){
      document.getElementById('mainbody')?.classList.remove('home');
    }
    let el:any=document.getElementById('vertical-menu-contentId');
    el.style.display='none';
  }
  RedirectToLink(param:string){
    this.router.navigate(['/'+this.urlMidder],{
      queryParams: {
        c: 'param'
      }});
  }
  GetListCategoryTree(){
    this.headerService.GetListCategoryTree().then((rs:any)=>{
      this.lstCategory=rs.data;
    });
  }

  GetListBanner(){
    this.bannerService.GetListBanner(this.ItemBannerRequest).then((rs:any)=>{
      if(rs.status==0){
        this.lstBanner=rs.data;
      }

    })
  }

  getListMenuManager(){
    this.menuManagerService.Search(this.ItemMenuManagerRequest).then((rs:any)=>{
      if(rs.status==0){
        this.lstMenuManager=rs.data;
      }
    })
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
    this.notificationCountCart.unsubscribe();
    this.currentUser.unsubscribe();
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    dots: true,
    lazyLoad:true,
    navSpeed: 900,
    navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    nav: true,
    items:1
  }
}
