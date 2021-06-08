import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-encodableinput',
  templateUrl: './encodableinput.component.html',
  styleUrls: ['./encodableinput.component.css']
})
export class EncodableinputComponent implements OnInit {

  @Input()
  public arg: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
