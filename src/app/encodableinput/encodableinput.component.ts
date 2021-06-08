import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-encodableinput',
  templateUrl: './encodableinput.component.html',
  styleUrls: ['./encodableinput.component.css']
})
export class EncodableinputComponent implements OnInit {

  @Input()
  public arg: string = "";

  @Output()
  public valueChanged: EventEmitter<string> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }



  encode(){
    this.arg = encodeURIComponent(this.arg);
    this.valueChanged.emit(this.arg);
  }


  decode(){
      this.arg = decodeURIComponent(this.arg);
      this.valueChanged.emit(this.arg);
  }
}
