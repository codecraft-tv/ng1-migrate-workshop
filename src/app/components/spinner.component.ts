import * as angular from 'angular';
import {Component, ElementRef, AfterViewInit} from "@angular/core";
import {Input} from "@angular/core/src/metadata/directives";
import {downgradeComponent} from "@angular/upgrade/src/aot/downgrade_component";
import {ViewChild} from "@angular/core";

import 'script-loader!spin.js';
declare var Spinner: any;

@Component({
  selector: 'ccSpinner',
  template: `
<div class="spinner"
     [hidden]="!isLoading" >
  <span #spinnerEl></span >

  <p >{{ message }}</p >
</div >
`
})
export class SpinnerComponent implements AfterViewInit {
  @Input()
  private isLoading: boolean;

  @Input()
  private message: string;

  @ViewChild('spinnerEl')
  private spinnerEl: ElementRef;

  ngAfterViewInit() {
    let spinner = new Spinner({radius: 8, width: 5, length: 3, lines: 9});
    spinner.spin(this.spinnerEl.nativeElement)
  }


angular
    .module('codecraft')
    .directive('ccSpinner', downgradeComponent({
      component: SpinnerComponent,
      inputs: ['isLoading', 'message']
    }) as angular.IDirectiveFactory);