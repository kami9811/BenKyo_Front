import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-timer-button',
  templateUrl: './timer-button.component.html',
  styleUrls: ['./timer-button.component.scss'],
})
export class TimerButtonComponent implements OnInit {
  @Output() start = new EventEmitter()
  @Output() stop = new EventEmitter()

  timer_flag: Boolean = false

  constructor() { }

  ngOnInit() {}

  startTimer = () => {
    this.timer_flag = true
    this.start.emit()
  }
  stopTimer = () => {
    this.timer_flag = false
    this.stop.emit()
  }

}
