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
    return this.parseUnsafe(url);
   } catch (error) {
     return [];
   }
  }

  private parseUnsafe(url: string): KeyValue[] {
    return new CustomURL(url).searchParams();
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

  updateValue(arg: { key: string; oldValue: string; newValue: string; }) {
    let uri = new URL(this.url$.getValue());
    let search = uri.search;
    search = search.replace('?','');
    let params = search.split('&')
       .map(o=>o.split('='))
       .map(arr=>{
         return {
          key: arr[0],
          value: arr.length === 2 ? arr[1]:undefined
         };
       });
      let found = params.find(o=>o.key === arg.key);
      if(found !== undefined)
        found.value= arg.newValue;
     let newSearch ="?"+params.map(o=> {
      let str = o.key;
      if(o.value){
        str = str+"="+o.value;
      }
      return str;
    })
    .join("&");
    console.log('new search' , newSearch);
    params.forEach(o=> uri.searchParams.delete(o.key));
    this.update(uri.toString()+newSearch);
  }
  updateKey(arg: { oldKey: string; newKey: string; value: string; }) {
    let uri = new URL(this.url$.getValue());
    uri.searchParams.delete(arg.oldKey);
    uri.searchParams.append(arg.newKey , arg.value );
    this.url$.next(uri.toString());
  }
}



export class KeyValue {
  key: string="";
  value: string="";
}


export class CustomURL{
  prefix: string;
  search?: string;
  constructor(value: string){
    let index = value.indexOf('?');
    if(index == -1){
      this.prefix = value;
      this.search = undefined;
    }else{
      this.prefix = value.substring(0,index);
      this.search = value.substr(index+1);
    }
  }

  searchParams(): KeyValue[]{
    if(!this.search)
      return [];

    let search = this.search?.split('&');
    return search.map(o=>{
      let keyValueArr = o.split('=');
      return {
        key: keyValueArr[0],
        value: keyValueArr.length === 2 ? keyValueArr[1]:""
      };
    })
  }

}