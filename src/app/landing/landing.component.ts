import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { KeyValue, UrlService } from '../services/url.service';
import {ToastModule} from 'primeng/toast';


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
    console.log("new value");
    this._url = value;
    this.urlService.update(this._url);
  }

  searchParams: KeyValue[] = [];


  constructor(private urlService:UrlService ) { 
    this.url = 'https://test.com?arg1=value1&arg2=value2'
  }
  

  ngOnInit(): void {
    this.urlService.queryParams$.subscribe(params => {
      console.log("params received", params);
      this.searchParams = params;
    },err=>console.error(err));

    this.urlService.url$.subscribe(url=>{
      console.log("setting url" , url);
      this.url=url;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.url);
  }


  printIt(){
    console.log("printit",this.url);
  }

  
}
