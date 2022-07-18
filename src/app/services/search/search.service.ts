import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import {ConstantService} from '../constant/constant.service'

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient , private cs:ConstantService) { }

  async getImages(query: string){
    let response;
    response = await this.http.get(this.cs.baseUrl+this.cs.userId+query).toPromise().then((res)=>{
      return res
    }).catch((err)=>{
      throw new Error(err);
    })
    return response
  }

}
