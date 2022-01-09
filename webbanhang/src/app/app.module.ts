import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { ProductComponent } from './product/product.component';
import { DetailComponent } from './detail/detail.component';
import { OrderComponent } from './order/order.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from 'src/services/product.service';
import { StarComponent } from './Star/Star.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { CouterComponent } from './Couter/Couter.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProductItemComponent } from './productItem/productItem.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MenuProfileUserComponent } from './menuProfileUser/menuProfileUser.component';
import { ProfileUserComponent } from './ProfileUser/ProfileUser.component';
import { MyOrderComponent } from './MyOrder/MyOrder.component';
import { ChangePassComponent } from './changePass/changePass.component';
import { CompleteComponent } from './complete/complete.component';
import { InfoCheckoutComponent } from './InfoCheckout/InfoCheckout.component';
import { CheckpaymentComponent } from './checkpayment/checkpayment.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AboutComponent } from './about/about.component';
import { NotificationComponent } from './notification/notification.component';
import { SanphamyeuthichComponent } from './sanphamyeuthich/sanphamyeuthich.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [				
    AppComponent,
      HeaderComponent,
      FooterComponent,
      TrangchuComponent,
      ProductComponent,
      DetailComponent,
      OrderComponent,
      StarComponent,
      CouterComponent,
      CheckoutComponent,
      BreadcrumbComponent,
      ProductItemComponent,
      RegisterComponent,
      LoginComponent,
      ForgotpasswordComponent,
      MenuProfileUserComponent,
      ProfileUserComponent,
      MyOrderComponent,
      ChangePassComponent,
      CompleteComponent,
      InfoCheckoutComponent,
      CheckpaymentComponent,
      AboutComponent,
      NotificationComponent,
      SanphamyeuthichComponent,
      PaginationComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CarouselModule,
    NgxImageZoomModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AngularEditorModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
