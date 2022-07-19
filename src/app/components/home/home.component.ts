import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {ConstantService} from '../../services/constant/constant.service'
import { Router } from '@angular/router';
import{MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public searchBar :''

  constructor(private cs:ConstantService,private router: Router, private snackbar : MatSnackBar) { }

  ngOnInit(): void {
  }

  search(e){
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
    this.router.navigateByUrl('/search');
    }

    verifyLength(){
      console.log(this.searchBar);
      
      if(this.searchBar.length == 100){
        this.snackbar.open("Max Length of 100 characters" , 'OK', {duration:1000})
      }
    }

}
