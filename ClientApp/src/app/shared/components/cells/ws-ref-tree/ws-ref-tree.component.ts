import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import DevExpress from "devextreme/bundles/dx.all";
import { DxTreeViewComponent } from "devextreme-angular";

@Component({
  selector: "ws-ref-tree",
  templateUrl: "./ws-ref-tree.component.html",
  styleUrls: ["./ws-ref-tree.component.css"]
})
export class WsRefTreeComponent {
  @Input() set formData(f) {
    debugger;
    this._formData_ = f;
  }
  get formData() {
    return this._formData_;
  }
  _formData_;
  @Input() item: any;
  @ViewChild(DxTreeViewComponent) treeView: DxTreeViewComponent;
  @Output() formDataChange = new EventEmitter();

  treeDataSource: any;
  treeBoxValue: string[] = [];
  gridDataSource: any;
  _gridBoxValue: number[] = [];

  constructor() {

  }

  set value(val) {
    if (this.item.editorOptions.dxTreeView.selectionMode != 'multiple') val = val[0];
    this.formData[this.item.dataField] = val;
    this.formDataChange.emit(this.formData);
  }


  syncTreeViewSelection(e) {
    var component = (e && e.component) || (this.treeView && this.treeView.instance);

    // if (!component) return;

    if (!this.treeBoxValue || this.treeBoxValue.length <= 0) {
      component.unselectAll();
    }

    if (this.treeBoxValue) {
      debugger;
      this.treeBoxValue.forEach((function (value) {
        component.selectItem(value);
      }).bind(this));

    }
    this.syncPlaceholder()
  }
  placeholder

  getSelectedItemsKeys(items) {
    var result = [],
      that = this;

    items.forEach(function (item) {
      if (item.selected) {
        result.push(item.key);
      }
      if (item.items.length) {
        result = result.concat(that.getSelectedItemsKeys(item.items));
      }
    });
    return result;
  }



  treeView_itemSelectionChanged(e) {
    const nodes = e.component.getNodes();
    // var displayExpr = this.item.editorOptions.dxDropbox.displayExpr;
    this.treeBoxValue = this.treeView.items.filter(item => item.selected) as any;
    //  this.getSelectedItemsKeys(nodes);
    this.syncPlaceholder()
  }

  get gridBoxValue(): number[] {
    return this._gridBoxValue;
  }

  set gridBoxValue(value: number[]) {
    this._gridBoxValue = value || [];
  }
  displayExpr = function (item) {
    console.log(this);
    return this._valueGetter(this)
  }


  syncPlaceholder() {
    let placeholder = this.item.editorOptions.dxTreeView.placeholder;
    if (this.treeBoxValue) {
      if (Array.isArray(this.treeBoxValue) && this.treeBoxValue.length > 0) {
        var items = this.treeView.items;
        // = this.getSelectedItems(this.treeView.instance.getNodes());
        debugger;
        this.placeholder = items.filter(item => item.selected).map(item => item[this.item.editorOptions.dxTreeView.displayExpr]).join(",");
        this.value = items.filter(item => item.selected)
      } else {
        if (this.treeView) {
          var items = this.treeView.items;
          this.placeholder = placeholder;
          this.value = items.filter(item => item.selected);

        }

      }
    } else {
      if (this.treeView) {
        var items = this.treeView.items;
        this.placeholder = placeholder;
        this.value = items.filter(item => item.selected);

      }
    }

  }
}
