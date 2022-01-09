import { Component, Input, OnInit } from '@angular/core';
import { BreadCrum } from '../BreadCrum';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() lstBreadCrum:Array<BreadCrum>=[];
  @Input() nameDetail:string='';
  constructor() { }

  ngOnInit() {
  }
}
