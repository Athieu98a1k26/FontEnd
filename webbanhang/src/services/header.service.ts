import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseCongif } from 'src/BaseConfig';
import { CartEnity } from 'src/CartEnity';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerPassData = new Subject<string>();
  private headerNotificationCountCart = new Subject<string>();
  private headerLoadCurrentUser= new Subject<string>();
  constructor(public http: HttpClient) { }

  private apiUrl=BaseCongif.UrlBase+"/Category/";
  GetListCategoryTree(): Promise<any>{
      return this.http.get(this.apiUrl+'GetListCategoryTree').toPromise();
    }

    missionPassData$ = this.headerPassData.asObservable();
    confirmMission(url: string) {
      this.headerPassData.next(url);
    }

    notificationCountCart$=this.headerNotificationCountCart.asObservable();
    TriggerNotificationCountCart(){
      this.headerNotificationCountCart.next();
    }

    currentUser$=this.headerLoadCurrentUser.asObservable();
    TriggerLoadCurrentUser(){
      this.headerLoadCurrentUser.next();
    }
}
