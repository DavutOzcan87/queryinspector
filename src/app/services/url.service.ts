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
    let uri = new CustomURL(this.url$.getValue());
    let searchParams = uri.searchParams();
    let removed = searchParams.filter(o=> o.key !== key);
    let newUri = this.buildUri(uri.prefix , removed);
    this.update(newUri);
  }

  updateValue(arg: { key: string; oldValue: string; newValue: string; }) {
    let url = new CustomURL(this.url$.getValue());
    let search = url.searchParams();
    let found = search.find(o=>o.key === arg.key);
    if(found){
      found.value = arg.newValue;
    }
    let newUrl = this.buildUri(url.prefix , search);
    this.update(newUrl);
  }
  buildUri(prefix: string, search: KeyValue[]):string {
    if(search.length == 0)
       return prefix;
    let searchPart = search.map(o=>o.key+"="+o.value).join('&');
    return prefix+"?"+searchPart;
  }
  updateKey(arg: { oldKey: string; newKey: string; value: string; }) {
    let uri = new CustomURL(this.url$.getValue());
    let searchPart = uri.searchParams();
    let found = searchPart.find(o=>o.key === arg.oldKey);
    if(found){
      found.key = arg.newKey;
    }
    let newUrl = this.buildUri(uri.prefix , searchPart);
    this.url$.next(newUrl);
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

