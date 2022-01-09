import { Injectable } from '@angular/core';
import { BaseCongif } from 'src/BaseConfig';
import { BaseService } from './BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService extends BaseService {

  private apiUrlAuth = BaseCongif.UrlBaseAuth + "/Rating/";
  AddOrUpdate(data: any): Promise<any> {
    return this.HttpPost(this.apiUrlAuth + 'AddOrUpdate', data);
  }
  GetByIdItem(id: any): Promise<any> {
    return this.HttpGet(this.apiUrlAuth + 'GetByIdItem?id='+id);
  }
  GetRatingByUserIdAndProduct(productId:string){
    return this.HttpGet(this.apiUrlAuth + 'GetRatingByUserIdAndProduct?productId='+productId);
  }

  GetReportRating(productId:string){
    return this.http.get(this.apiUrlAuth + 'GetReportRating?productId='+productId).toPromise();
  }
  Search(data:any){
    return this.http.post(this.apiUrlAuth + 'Search',data).toPromise();
  }
}
