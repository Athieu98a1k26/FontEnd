import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Star',
  templateUrl: './Star.component.html',
  styleUrls: ['./Star.component.css']
})
export class StarComponent implements OnInit {

  @Input() numberStar: number=0;
  constructor() { }
  HtmlStar:string="";
  ngOnInit() {
    let dem=0;
  for(let i=1;i<=Math.floor(this.numberStar);i++)
  {
    this.HtmlStar+='<i class="fa fa-star c-star"></i>';
    dem++;
  }
  if(this.numberStar-Math.floor(this.numberStar)>=0.5)
  {
    this.HtmlStar+='<i class="fa fa-star-half-o c-star"></i>';
    dem++;
  }
  for(let k=1;k<=5-dem;k++)
  {
    this.HtmlStar+='<i class="fa fa-star-o c-star"></i>';
  }
  }

}
