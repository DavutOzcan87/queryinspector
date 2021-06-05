import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit,OnChanges {
  public url: string = "";
  constructor() { 
    this.url = 'https://test.com'
  }
  

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.url);
  }


  printIt(){
    console.log("printit",this.url);
  }

  
}
