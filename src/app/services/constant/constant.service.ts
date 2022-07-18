import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  readonly baseUrl : string = 'https://pixabay.com/api/?key='
  readonly userId : string = '28668529-a9bbf2423925f08b50597b6f1'


  private searches = []
  private currentSearch = {
    topic:'',
    page:1,
    order:'',
    colors:'',
    category:'',
    orientation:'',
  }

  getSearches(){
    return this.searches
  }

  addSearches(val){
    this.searches.push(val)
  }

  getCurrentSearch(){
    return this.currentSearch
  }

  setCurrentSearch(search){
    this.currentSearch = search
  }

}
