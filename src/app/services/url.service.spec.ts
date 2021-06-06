import { TestBed } from '@angular/core/testing';

import { UrlService } from './url.service';

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should publish query params', done=>{
    service.url$.next("https://localhost:8080?arg1=value1&arg2=value2");
    service.queryParams$.subscribe(params =>{
      console.log(params);
      expect(params).toContain("arg1","arg2");
      done();
    });
  });

});
