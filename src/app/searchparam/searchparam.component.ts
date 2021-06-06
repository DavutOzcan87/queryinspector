import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-searchparam',
  templateUrl: './searchparam.component.html',
  styleUrls: ['./searchparam.component.css']
})
export class SearchparamComponent implements OnInit {


  @Input() 
  key: string = "";
  @Input() 
  value: string = "";


  constructor(private urlService: UrlService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  deleteKey():void{
    this.urlService.deleteSearchParam(this.key);
  }


  copyKey(){
    console.log("copy key");
    this.copy(this.key);
  }
  copyValue(){
    this.copy(this.value);
  }

  private copy(arg:string) {
    navigator.clipboard.writeText(arg)
      .then(() => {
        this.messageService.add({ key: "msg", severity: 'info', summary: 'copied', detail: arg });
      }).catch(error => {
        console.error("clip copy failed", error);
        this.messageService.add({ key: "msg", severity: 'error', summary: 'error', detail: "browser does not support copy command" });
      });
  }
}
