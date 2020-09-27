import {ElementRef, ViewContainerRef} from '@angular/core';

export interface ComponentLoadDependencies {
  rawComponent: any;
  template: ViewContainerRef;
  inputs?: ICompInput;
  outputs?: ICompInput;
}


export interface ICompInput {
  [key: string]: any;
}
