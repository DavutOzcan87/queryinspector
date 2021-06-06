import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { map , tap , onErrorResumeNext, catchError, mergeMap, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  url$ = new BehaviorSubject<string>("https://test.com");
  queryParams$ = new Subject<KeyValue[]>();

  constructor() { 
    this.url$.pipe( 
      tap(url=> console.log("url changed" , url)),  
      map(url => this.parseUrl(url)),
      catchError(err=>{
        console.error("cannot parse search params",err);
        return from([]);
      }) 
    )
    .subscribe(params=> this.queryParams$.next(params) , err => console.error("failed",err));
    
  }
  parseUrl(url: string): KeyValue[] {
   try {
    return this.parseSafe(url);
   } catch (error) {
     return [];
   }
  }

  private parseSafe(url: string): KeyValue[] {
    let parsedUrl = new URL(url);
    let iterator = parsedUrl.searchParams as any;
    let params = [];
    for (let [key, value] of iterator) {
      params.push({
        key,
        value
      });
    }
    return params;
  }

  update(_url: string) {
    if(_url !== this.url$.getValue()){
      this.url$.next(_url);
    }
  }

  deleteSearchParam(key: string) {
    console.log("deleting search param",key);
     let uri = new URL(this.url$.getValue());
     uri.searchParams.delete(key);
     this.url$.next(uri.toString());
  }
}



export class KeyValue {
  key: string="";
  value: string="";
}