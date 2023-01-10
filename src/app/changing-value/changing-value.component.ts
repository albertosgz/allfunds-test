import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-changing-value',
  templateUrl: './changing-value.component.html',
  styleUrls: ['./changing-value.component.scss']
})
export class ChangingValueComponent implements OnInit {

  @Input() value: number | undefined;
  @Input() perc = false; // TODO: Not sure how to interpret percentual values to display it as negative or positive

  constructor() { }

  ngOnInit(): void {
  }

  get positive() {
    return !!this.value && this.value > 0;
  }

  get negative() {
    return !!this.value && this.value < 0;
  }

  get symbol() {
    return this.negative ? '-' : '+';
  }
}
