import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[dynamic-col]"
})
export class DynamicColDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
