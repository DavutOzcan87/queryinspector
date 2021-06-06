import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit,OnChanges {
  
  private _url: string = "";
  public get url(): string {
    return this._url;
  }
  public set url(value: string) {
    this._url = value;
    this.urlService.url.next(value);
  }

  searchParams: string[] = [];


  constructor(private urlService:UrlService ) { 
    this.url = 'https://test.com?arg1=value1&arg2=value2'
  }
  

  ngOnInit(): void {
    this.urlService.queryParams.subscribe(params => {
      console.log("params received", params);
      this.searchParams = params;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.url);
  }


  printIt(){
    console.log("printit",this.url);
  }

  
}
