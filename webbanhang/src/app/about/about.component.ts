import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AboutService } from 'src/services/About.service';
import { HeaderService } from 'src/services/header.service';
import { BreadCrum } from '../BreadCrum';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private aboutService:AboutService,private headerService:HeaderService,private sanitizer: DomSanitizer) { }
  aboutItem:any;
  lstBreadCrumb:Array<BreadCrum>=[];
  ngOnInit() {
    this.CreateBreadCrumb();
    this.headerService.confirmMission('gioi-thieu');
    this.GetByIdItemFirst();
  }
  GetByIdItemFirst(){
    this.aboutService.GetByIdItemFirst().then((rs:any)=>{
      if(rs.status==0){
        this.aboutItem=rs.data;
        this.aboutItem.content = this.sanitizer.bypassSecurityTrustHtml(this.aboutItem.content);
      }
    })
  }
  CreateBreadCrumb(){
    let itemBreadCrumb=new BreadCrum();
    itemBreadCrumb.name="Giới thiệu";
    itemBreadCrumb.url='/gioi-thieu';
    this.lstBreadCrumb.push(itemBreadCrumb);
  }
}
