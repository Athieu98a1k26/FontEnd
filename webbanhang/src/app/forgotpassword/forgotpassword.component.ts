import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/Auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private authService:AuthService) { }
  strCaptCha:string='';
  ngOnInit() {
    this.CaptchaImage();
  }
  CaptchaImage(){
    this.authService.CaptchaImage().then((rs:string)=>{
      this.strCaptCha=rs;
    })
  }

  RefreshCaptCha(){
    this.CaptchaImage();
  }
}
