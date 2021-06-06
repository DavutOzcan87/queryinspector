import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchparam',
  templateUrl: './searchparam.component.html',
  styleUrls: ['./searchparam.component.css']
})
export class SearchparamComponent implements OnInit {


  @Input() 
  param: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
