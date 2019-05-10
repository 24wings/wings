import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[dynamic-cell]"
})
export class DynamicCellDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
