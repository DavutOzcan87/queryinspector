import { TestBed } from '@angular/core/testing';
import { ExpandOperator } from 'rxjs/internal/operators/expand';

import { CustomURL, UrlService } from './url.service';

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  

  it('should create url p',()=>{
    let url = new CustomURL("https://test.com?arg1=value1&arg2=value2");
    let keys = url.searchParams().map(o=>o.key);
    expect(keys)
      .toContain("arg1","arg2");
  });

  it('should extract prefix and search',()=>{
    let url = new CustomURL("https://test.com?arg1=value1&arg2=value2");
    expect(url.prefix)
      .toEqual('https://test.com');
    expect(url.search)
      .toEqual('arg1=value1&arg2=value2');
  });


  it('should update param',()=>{
     let service = new UrlService();
     service.update('https://test.com?arg1=value1&arg2=value2');
     service.updateValue({key:"arg2" , oldValue:"value2" , newValue:"test"});
     expect(service.url$.getValue())
      .toEqual('https://test.com?arg1=value1&arg2=test');
  });

  it('shold update key',()=>{
    let service = new UrlService();
    service.update('https://test.com?arg1=value1&arg2=value2');
    service.updateKey({oldKey: "arg1" , newKey:"testkey" , value:"value1"});
    expect(service.url$.getValue())
       .toEqual('https://test.com?testkey=value1&arg2=value2');
  });


  it('should detele param when encoded key used' , ()=>{
    let service = new UrlService();
    service.update('https://test.com/?arg1+test=value1');
    service.deleteSearchParam('arg1+test');
    expect(service.url$.getValue())
      .toEqual('https://test.com/');
  });


});
