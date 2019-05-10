import {
  Component,
  Input,
  ComponentFactoryResolver,
  ViewChild,
  ComponentRef,
  Output,
  EventEmitter
} from "@angular/core";
import DevExpress from "devextreme/bundles/dx.all";
import { Cell } from "../../dto/Cell";
import { cellComponentRegister } from "./cell.component.register";
import { DynamicCellDirective } from "./dynamic-cell.directive";

@Component({
  selector: "dynamic-cell",
  templateUrl: "./dynamic-cell.component.html"
})
export class DynamicCellComponent {
  @Input() item: Cell;
  @Input() set formData(f) {
    this._formData_ = f;
    if (this.componentRef) this.componentRef.instance.formData = f;
  }
  get formData() {
    return this._formData_;
  }
  _formData_;
  @Input() dynamicComponent = null;
  @Output() formDataChange = new EventEmitter();
  componentRef: ComponentRef<any>;
  @ViewChild(DynamicCellDirective) dynamic: DynamicCellDirective;
  constructor(public componentFactoryResolver: ComponentFactoryResolver) { }
  loadComponent() {
    let type = cellComponentRegister.find(
      type => this.item.editorType == type.name
    );
    if (!type) type = { type: null, component: this.dynamicComponent };

    if (type) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        type.component as any
      );
      let viewContainerRef = this.dynamic.viewContainerRef;
      viewContainerRef.clear();
      this.componentRef = viewContainerRef.createComponent(
        componentFactory
      ) as any;
      this.componentRef.instance.formData = this.formData;
      this.componentRef.instance.item = this.item;
      (this.componentRef.instance.formDataChange as EventEmitter<{}>).subscribe(
        rtn => {
          console.log(rtn, "----------");
          this.formDataChange.emit(rtn);
        }
      );

      // this.componentRef.instance.value = this.value;
      // this.componentRef.instance.valueChange.subscribe(rt => {
      //   this.value = rt;
      //   if (rt) {
      //     // console.error(rt);
      //   }
      //   this.componentRef.instance.__value__ = rt;
      // });
      // if (type.type == RefTable || type.type == RefTablees || type.type == RefTree || type.type == RefTreees) {
      //   this.componentRef.instance.metaCom = getMetaEntity(this.field.config.databaseType);
      //   (<ComponentRef<RefTableComSpec>>(this.componentRef as any)).instance.onQuery.subscribe(rtn => this.search(rtn));
      //   if (this.componentRef.instance['onAction']) this.componentRef.instance['onAction'].subscribe(rtn => this.onAction.emit(rtn))
      // } else {
      // }
      this.componentRef.changeDetectorRef.detectChanges();
      this.componentRef.changeDetectorRef.markForCheck();
    } else {
      console.error(`there is no error`);
    }
  }
  ngAfterViewInit() {
    this.loadComponent();
  }
}
