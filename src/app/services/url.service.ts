import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map , tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  url = new Subject<string>();
  queryParams = new Subject<string[]>();
  constructor() { 
    this.url.pipe( 
      tap(url=> console.log("url changed" , url)),  
      map(url => this.parseUrl(url)))
    .subscribe(params=> this.queryParams.next(params) , err => console.error(err));
  }
  parseUrl(url: string): string[] {
    let parsedUrl = new URL(url);
    let iterator = parsedUrl.searchParams as any;
    let params = [];
    for(let [key,value] of iterator){
      params.push(key);
    }
    return params;
  }
}
