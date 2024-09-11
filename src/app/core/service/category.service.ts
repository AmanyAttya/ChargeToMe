import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //httpClint

  constructor(private _HttpClient:HttpClient) {}


  getAllCatigory():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

getspecificCatigory(id:string):Observable<any>{
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)

  
}

}
