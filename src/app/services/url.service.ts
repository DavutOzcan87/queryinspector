import { Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { map , tap , onErrorResumeNext, catchError, mergeMap, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  url$ = new Subject<string>();
  queryParams$ = new Subject<string[]>();

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
  parseUrl(url: string): string[] {
   try {
    return this.parseSafe(url);
   } catch (error) {
     return [];
   }
  }

  private parseSafe(url: string) {
    let parsedUrl = new URL(url);
    let iterator = parsedUrl.searchParams as any;
    let params = [];
    for (let [key, value] of iterator) {
      params.push(key);
    }
    return params;
  }

  update(_url: string) {
    this.url$.next(_url);
  }
}
