import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { View, TreeListView } from "../../dto/View";
import {
  DxFormComponent,
  DxTreeViewComponent,
  DxTagBoxModule
} from "devextreme-angular";
import { Cell } from "../../dto/Cell";
import LocalStore from "devextreme/data/local_store";
import notify from "devextreme/ui/notify";

import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";

@Component({
  selector: "ws-editor",
  templateUrl: "ws-editor.component.html",
  styleUrls: ["./ws-editor.component.css"]
})
export class WsEditorComponent {
  @Input() mode: string;
  @Output() modeChange = new EventEmitter();
  displayStyle;
  @ViewChild(DxFormComponent) dxForm: DxFormComponent;
  dataSource: DataSource;
  treeBoxValue: string;

  set formData(f) {
    this._formData_ = f;
    this.dxForm.instance.validate();
  }
  get formData() {
    return this._formData_;
  }

  _formData_ = {};

  v: View;

  @ViewChild(DxTagBoxModule)
  items: Cell[] = [];
  @Input() set view(v: View) {
    this.v = v;
    // if (v) this.dxForm.items = v.items;
    if (v) {
      this.items = v.items;
    }
  }

  @Output() onCreateSuccess = new EventEmitter();
  customer = {};
  async onFormSubmit($event) {
    console.log(this.dataSource);
    var pid = await this.formData[(this.v as TreeListView).parentIdExpr];
    debugger;
    if (this.mode == "Create") {
      var result = this.dxForm.instance.validate();
      if (result.isValid) {
        var isCustomStore = this.dataSource instanceof CustomStore;
        debugger;
        if (isCustomStore) {
          ((this.dataSource as any) as CustomStore).insert(this.formData);
          ((this.dataSource as any) as CustomStore).load();
        } else {
          await this.dataSource.store().insert(this.formData);
          this.dataSource.store().load();
        }
        notify("数据提交成功", "success");
      }
    } else {
      this.update();
    }

    this.back();
  }

  openNewModal(parentId = null) {
    this.mode = "Create";
    this.formData = {};
    var parentIdExpr = (this.v as TreeListView).parentIdExpr;
    if (this.v.viewType == "TreeList") {
      if (parentId && parentIdExpr) {
        this.formData[parentIdExpr] = parentId;
      } else {
        // this.formData[parentIdExpr] = 0;
      }
    }
    this.modeChange.emit("Create");
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.dataSource = this.v.dataSource;
  }
  selectedRows = [];
  setSelectedRows($event) {
    this.selectedRows = $event;
  }

  log(data) {
    console.log(data);
  }
  openUpdateModel(parentId) {
    this.mode = "Update";
    this.formData = this.selectedRows[0];
    debugger;
    this.modeChange.emit("Update");
  }
  async  update() {
    var key = this.dataSource.key();

    var isCustomStore = this.dataSource instanceof CustomStore;
    debugger;
    if (isCustomStore) {
      await ((this.dataSource as any) as CustomStore).update(this.formData[key], this.formData);
      await ((this.dataSource as any) as CustomStore).load();
    } else {
      await this.dataSource.store().update(this.formData[key], this.formData);
      this.dataSource.store().load();
    }
    notify("记录更新成功", "success");

    this.onCreateSuccess.emit();
  }

  back() {
    this.modeChange.emit("List");
    this.onCreateSuccess.emit(true);
  }

  validation() { }
}
