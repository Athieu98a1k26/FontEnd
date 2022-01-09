import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardLoginService } from 'src/services/AuthGuardLogin.service';
import { AuthGuardServiceService } from 'src/services/AuthGuardService.service';
import { AboutComponent } from './about/about.component';
import { ChangePassComponent } from './changePass/changePass.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckpaymentComponent } from './checkpayment/checkpayment.component';
import { CompleteComponent } from './complete/complete.component';
import { DetailComponent } from './detail/detail.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { MyOrderComponent } from './MyOrder/MyOrder.component';
import { NotificationComponent } from './notification/notification.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { ProfileUserComponent } from './ProfileUser/ProfileUser.component';
import { RegisterComponent } from './register/register.component';
import { SanphamyeuthichComponent } from './sanphamyeuthich/sanphamyeuthich.component';
import { TrangchuComponent } from './trangchu/trangchu.component';

const routes: Routes = [
  { path: 'trang-chu', component: TrangchuComponent },
  { path: 'san-pham', component: ProductComponent },
  { path: 'chi-tiet-san-pham', component: DetailComponent },
  { path: 'gio-hang', component: OrderComponent },
  { path: 'thanh-toan', component: CheckoutComponent },
  { path: 'dang-nhap', component: LoginComponent ,canActivate:[AuthGuardServiceService]},
  { path: 'dang-ky', component: RegisterComponent ,canActivate:[AuthGuardServiceService]},
  { path: 'quen-mat-khau', component: ForgotpasswordComponent ,canActivate:[AuthGuardServiceService]},
  { path: 'don-hang', component: MyOrderComponent ,canActivate:[AuthGuardLoginService]},
  { path:'thong-tin-tai-khoan',component:ProfileUserComponent,canActivate:[AuthGuardLoginService]},
  { path:'thay-doi-mat-khau',component:ChangePassComponent,canActivate:[AuthGuardLoginService]},
  { path:'hoan-thanh',component:CompleteComponent},
  { path:'kiem-tra-don-hang',component:CheckpaymentComponent},
  { path:'gioi-thieu',component:AboutComponent},
  { path:'thong-bao',component:NotificationComponent},
  { path:'san-pham-yeu-thich',component:SanphamyeuthichComponent},
  { path: '**', component: TrangchuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
