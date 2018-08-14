import { Component, OnInit, Pipe } from '@angular/core';

// tslint:disable-next-line:use-pipe-transform-interface
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

@Pipe({ name: 'exponentialStrength' })
export class CalculatorComponent implements OnInit {
  power = 5;
  factor = 1;
  transform(value: number, exponent: string): number {
    const exp = parseFloat(exponent);
    return Math.pow(value, isNaN(exp) ? 1 : exp);

  }

  constructor() { }

  ngOnInit() {
  }

}
