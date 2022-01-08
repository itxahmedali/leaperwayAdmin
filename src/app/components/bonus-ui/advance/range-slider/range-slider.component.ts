import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  value: number = 5;
  custMinValue: number = 10;
  custMaxValue: number = 90;
  noSwatchMinValue: number = 10;
  noSwatchMaxValue: number = 90;
  limitValue: number = 50;
  limitedMinValue: number = 40;
  limitedMaxValue: number = 60;
  pushRangeMinValue: number = 60;
  pushRangemaxValue: number = 70;
  stepValue: number = 12;
  customHtmlMinValue: number = 100;
  customHtmlMaxValue: number = 400;
  disabledMinValue: number = 10;
  disabledMaxValue: number = 90;
  readOnlyValue: number = 50;
  disabled: boolean = true;
  readOnly: boolean = true;
  simpleSliderControl: FormControl = new FormControl(100);
  rangeSliderForm: FormGroup = new FormGroup({
    rangeSliderControl: new FormControl([20, 80])
  });

  // Simple slider option
  simpleSliderOptions: Options = {
    floor: 0,
    ceil: 250
  };

  // Range slider option
  rangeSliderOptions: Options = {
    floor: 0,
    ceil: 100,
    step: 20
  };

  // Custom class slider
  custSlideroptions: Options = {
    floor: -100,
    ceil: 100,
    step: 10,
  };

  // Range slider with the range limited to 10 through 50
  limitedOptions: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
    minRange: 10,
    maxRange: 50
  };

  // Slider with custom step value
  stepSlideroptions: Options = {
    floor: 10,
    ceil: 100,
    step: 5
  };

  // Slider with custom step value
  customHtmlSliderOptions: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return '$' + value;
    }
  };

  // Read Only Range Slider 
  readOnlySliderOptions: Options = {
    floor: 0,
    ceil: 100,
    readOnly: true
  };

  onChangeReadOnly(): void {
    this.readOnlySliderOptions = Object.assign({}, this.readOnlySliderOptions, { readOnly: this.readOnly });
  }

  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
    showTicks: false,
    showTicksValues: true,
    stepsArray: [
      { value: 1, legend: 'Jan' },
      { value: 2, legend: 'Feb' },
      { value: 3, legend: 'Mar' },
      { value: 4, legend: "April" },
      { value: 5, legend: 'May' },
      { value: 6, legend: "June" },
      { value: 7, legend: 'July' },
      { value: 8, legend: "Aug" },
      { value: 9, legend: 'Sept' },
      { value: 10, legend: 'Oct' },
      { value: 11, legend: 'Nov' },
      { value: 12, legend: 'Dec' },
    ]
  };
}