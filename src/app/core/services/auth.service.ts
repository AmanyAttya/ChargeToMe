import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly httpClient = inject(HttpClient);
  private readonly _Router=inject(Router)
  userdata:any=null;
  baseUrl:string='https://ecommerce.routemisr.com'

  setRegister(data: object): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data);
  }

  setLogin(data: object): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data);
  }
  saveUserdata():void{
    //1-Take token
    if(localStorage.getItem('userToken')!==null){
     this.userdata=  jwtDecode(localStorage.getItem('userToken')!)
     console.log('userdata',this.userdata)
    }
  }
  logOut():void{
    localStorage.removeItem('userToken');
    this.userdata =null;
    //navigate to login 

    //call api remove token
    this._Router.navigate(['/login'])
  }

setEmailVerify(data:object):Observable<any>{
  return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',data)
}

setCodeVerify(data:object):Observable<any>{
  return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',data)
}
setRestPassword(data:object):Observable<any>{
  return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',data)
}

}
