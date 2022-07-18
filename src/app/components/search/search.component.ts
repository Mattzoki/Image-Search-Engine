import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {ConstantService} from '../../services/constant/constant.service'
import {SearchService} from 'src/app/services/search/search.service'
import { Router } from '@angular/router';
import{MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  categories=["backgrounds", "fashion", "nature", 'science', "education", "feelings", "health", "people", "religion", "places", "animals", "industry", "computer", "food", "sports", "transportation", "travel", "buildings", "business", "music" ]
  orientations=[ "all", "horizontal", "vertical"]
  colors=["grayscale", "transparent", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown"]
  orders=["popular", "latest"]

  pictures= []
  result
  currentSearch
  searchBar
  scroller = false

  constructor(private cs:ConstantService,private ss:SearchService,private router: Router, private snackbar : MatSnackBar) { }

  ngOnInit(): void {

    this.list()
  }

  async list(){
    this.currentSearch=this.cs.getCurrentSearch()
    this.searchBar = this.currentSearch.topic
    this.currentSearch.topic=this.currentSearch.topic.replace(" ","+")
    let query = "&q=" + this.currentSearch.topic + "&page=" + this.currentSearch.page +"&image_type=photo"
    
    await this.ss.getImages(query).then((res)=>{
      this.result = res
      this.pictures = res.hits
    })
  }

  async search(e){
    e.preventDefault()

    if(!this.searchBar){
      this.snackbar.open("Please choose a term to search for" , 'OK', {duration:1000})
      return
    }
    
    let fullSearch = {
      topic: this.searchBar,
      page:1,
      order:'',
      colors:'',
      category:'',
      orientation:'',
      }

    this.cs.setCurrentSearch(fullSearch)
    this.currentSearch=this.cs.getCurrentSearch()

    this.searchBar = this.currentSearch.topic
    this.currentSearch.topic=this.currentSearch.topic.replace(" ","+")

    let query = "&q=" + this.currentSearch.topic + "&page=" + this.currentSearch.page + "&image_type=photo"
    
    await this.ss.getImages(query).then((res)=>{
      this.result = res
      this.pictures = res.hits
    })
    }

    async onGridScroll(e){
      const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
      const tableScrollHeight = e.target.scrollHeight; // length of all table
      const scrollLocation = e.target.scrollTop; // how far user scrolled
      // If the user has scrolled within 200px of the bottom, add more data
      const buffer = 100;
      const limit = tableScrollHeight - tableViewHeight - buffer;
      

      if (scrollLocation > limit && this.pictures.length <= this.result?.total && !this.scroller) {

        this.currentSearch.page++
        this.cs.setCurrentSearch(this.currentSearch)
        this.scroller = true
        

        let query = "&q=" + this.currentSearch.topic +  "&page=" + this.currentSearch.page + "&image_type=photo"

        await this.ss.getImages(query).then((res)=>{
          this.result = res
          this.pictures= this.pictures.concat(res.hits)
        })

        this.scroller = false

      }

    }

}
