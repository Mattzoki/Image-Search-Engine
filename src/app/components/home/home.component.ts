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

  public searchBar 

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
      topic: this.searchBar
      }

    this.cs.setCurrentSearch(fullSearch)
    this.router.navigateByUrl('/search');
    }

}
