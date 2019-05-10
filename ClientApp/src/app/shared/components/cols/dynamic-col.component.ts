import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ComponentFactoryResolver
} from "@angular/core";
import { DynamicColDirective } from "./dynamic-col.directive";

@Component({
  selector: "dynamic-col",
  templateUrl: "./dynamic-col.component.html"
})
export class DynamicColComponent {
  @Output() onAction = new EventEmitter();
  __value__;
  page = 0;
  count: number;
  // @Input() field: Field;
  @ViewChild(DynamicColDirective) dynamic: DynamicColDirective;
  // @Input() metaCom: MetaCom
  @Input() set value(val) {
    this.__value__ = val;
    // if (val && this.componentRef) {
    //   this.componentRef.instance.__value__ = val;
    // }
    this.valueChange.emit(val);
  }
  get value() {
    return this.__value__;
  }
  __dataSet__: any[] = [];
  @Input() set dataSet(dataSet: any[]) {
    this.__dataSet__ = dataSet;
    // if (this.componentRef)
    // this.refershData()
  }
  get dataSet() {
    return this.__dataSet__;
  }
  @Output() onQuery = new EventEmitter();
  @Output() valueChange = new EventEmitter();
  // @Input() mode: ModeEnum = ModeEnum.Create;
  // componentRef: ComponentRef<BasicComspce<any>>
  constructor(public componentFactoryResolver: ComponentFactoryResolver) {}
  ngOnInit() {}
  loadComponent() {
    // let type = registerCompoenentFactorys.find(type => this.field.type == type.type);
    // if (!type) type = { type: null, component: this.field.dynamicComponent };
    // if (type) {
    //   let componentFactory = this.componentFactoryResolver.resolveComponentFactory(type.component as any);
    //   let viewContainerRef = this.dynamic.viewContainerRef;
    //   viewContainerRef.clear();
    //   this.componentRef = viewContainerRef.createComponent(componentFactory) as any;
    //   this.componentRef.instance.mode = this.mode;
    //   this.componentRef.instance.field = this.field;
    //   this.componentRef.instance.value = this.value;
    //   this.componentRef.instance.valueChange.subscribe(rt => {
    //     this.value = rt;
    //     if (rt) {
    //       // console.error(rt);
    //     }
    //     this.componentRef.instance.__value__ = rt;
    //   });
    //   if (type.type == RefTable || type.type == RefTablees || type.type == RefTree || type.type == RefTreees) {
    //     this.componentRef.instance.metaCom = getMetaEntity(this.field.config.databaseType);
    //     (<ComponentRef<RefTableComSpec>>(this.componentRef as any)).instance.onQuery.subscribe(rtn => this.search(rtn));
    //     if (this.componentRef.instance['onAction']) this.componentRef.instance['onAction'].subscribe(rtn => this.onAction.emit(rtn))
    //   } else {
    //   }
    //   this.componentRef.changeDetectorRef.detectChanges()
    //   this.componentRef.changeDetectorRef.markForCheck()
    // } else {
    //   console.error(`there is no error`)
    // }
  }
  refershData() {
    // (<ComponentRef<RefTableComSpec>>(this.componentRef as any)).instance.dataSet = this.dataSet;
    // (<ComponentRef<RefTableComSpec>>(this.componentRef as any)).instance.count = this.count;
    // (<ComponentRef<RefTableComSpec>>(this.componentRef as any)).instance.value = this.value;
  }

  ngAfterViewInit() {
    this.loadComponent();
  }
  // async  search($event: { metaCom: MetaCom, field: Field, keyword: string, page: number, pageSize, queryParam: QueryParam }) {
  //   if (!$event.queryParam) {
  //     debugger;
  //     $event.queryParam = { pageParam: { pageIndex: $event.page, pageSize: $event.pageSize }, queryAttributes: [], queryConditions: [] };
  //   }
  //   let result = await this.dataStragety.entityQuery($event.metaCom, $event.queryParam);
  //   this.dataSet = result.paging.rows;
  //   this.count = result.paging.count;
  //   this.refershData()

  // }
  // getQueryCondition(): QueryCondition {
  //   return { compare: "=", field: this.field.fieldName, andOr: "and", value: this.value }
  // }
}
