import { CartEnity } from "./CartEnity";

export class BaseLocalStorage {
  //key của người dùng
  private static readonly ConstIdentity:string='Identity';
  //key sản phẩm
  private static readonly ConstItemCart:string='ItemCart';

  private static readonly ConstToken:string='token';
  private static readonly ConstRefreshToken:string='refreshToken';
  private static readonly ConstExpire:string='expire';
  private static readonly ConstWishList:string='WishList';



  public static SetWishList(wishList:string){
    let wishListOld=localStorage.getItem(this.ConstWishList);
    if(wishListOld!=null)
    {
      this.RemoveWishList();
    }
    localStorage.setItem(this.ConstWishList,wishList);
  }
  public static RemoveWishList(){
    localStorage.removeItem(this.ConstWishList);
  }
  public static GetWishList(){
    return localStorage.getItem(this.ConstWishList);
  }



  public static SetExpire(expire:string){
    let expireOld=localStorage.getItem(this.ConstExpire);
    if(expireOld!=null)
    {
      this.RemoveExpire();
    }
    localStorage.setItem(this.ConstExpire,expire);
  }
  public static RemoveExpire(){
    localStorage.removeItem(this.ConstExpire);
  }
  public static GetExpire(){
    return localStorage.getItem(this.ConstExpire);
  }






  public static SetToken(token:string){
    let tokenOld=localStorage.getItem(this.ConstToken);
    if(tokenOld!=null)
    {
      this.RemoveToken();
    }
    localStorage.setItem(this.ConstToken,token);
  }
  public static RemoveToken(){
    localStorage.removeItem(this.ConstToken);
  }
  public static GetToken(){
    return localStorage.getItem(this.ConstToken);
  }

  public static SetrefreshToken(refreshToken:string){
    let tokenOld=localStorage.getItem(this.ConstRefreshToken);
    if(tokenOld!=null)
    {
      this.RemoverefreshToken();
    }
    localStorage.setItem(this.ConstRefreshToken,refreshToken);
  }
  public static RemoverefreshToken(){
    localStorage.removeItem(this.ConstRefreshToken);
  }
  public static GetrefreshToken(){
      return localStorage.getItem(this.ConstRefreshToken);
  }

  public static IsUserNotLogin(){
    let Identity = localStorage.getItem(this.ConstIdentity);
    if(Identity==null){
      return true;
    }
    return false;
  }

  public static SetItemCart(ProductItem:CartEnity){
    let dataItem:CartEnity[]=[];
    let ItemCart = this.GetItemCart();
    let isAddNew: boolean = true;
      if (ItemCart != null) {
        dataItem = JSON.parse(ItemCart);
        for (let i = 0; i < dataItem.length; i++) {

          if (dataItem[i].id == ProductItem.id) {
            dataItem[i].count += ProductItem.count;
            isAddNew = false;
            break;
          }

        }
      }
      if (isAddNew) {
        dataItem.push(ProductItem);
      }
      localStorage.setItem(this.ConstItemCart,JSON.stringify(dataItem));
  }
  public static SetListOverideItemCart(lstItemCart:Array<CartEnity>){
    let ItemCart=this.GetItemCart();
    if(ItemCart!=null){
      this.ClearItemCart();
    }
    if(lstItemCart.length>0)
    {
      localStorage.setItem(this.ConstItemCart,JSON.stringify(lstItemCart));
    }

  }
  public static GetItemCart(){
    return localStorage.getItem(this.ConstItemCart);
  }
  public static ClearItemCart(){
    return localStorage.removeItem(this.ConstItemCart);
  }


}

