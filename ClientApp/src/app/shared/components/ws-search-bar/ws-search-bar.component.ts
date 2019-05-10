import { Component, Input, ViewChild } from "@angular/core";
import { DxTreeViewComponent } from "devextreme-angular";

@Component({
  selector: "ws-search-bar",
  templateUrl: "./ws-search-bar.component.html",
  styleUrls: ["./ws-search-bar.component.css"]
})
export class WsSearchBarComponent {
  @Input() item: any;
  _formData_ = {};

  filters: any[] = [];

  @ViewChild(DxTreeViewComponent) treeView: DxTreeViewComponent;

  treeView_itemSelectionChanged(e) {
    // alert(1);
    const nodes = e.component.getNodes();
    debugger;
    // this.formData[item.dataField] = this.getSelectedRows()
    console.log(e, this._formData_);
    // this.treeView.
    // this.treeBoxValue = this.getSelectedItemsKeys(nodes).join(",");
    this._formData_[this.item.dataField] = this.getSelectedItems(nodes).map(
      n => n.itemData
    );
    debugger;

    return false;
  }

  getSelectedItemsKeys(items) {
    console.log(items);
    var result = [],
      that = this;

    items.forEach(function(item) {
      if (item.selected) {
        result.push(item.key);
      }
      if (item.items.length) {
        result = result.concat(that.getSelectedItemsKeys(item.items));
      }
    });
    return result;
  }
  getSelectedItems(items) {
    console.log(items);
    var result = [],
      that = this;

    items.forEach(function(item) {
      if (item.selected) {
        result.push(item);
      }
      if (item.items.length) {
        result = result.concat(that.getSelectedItems(item.items));
      }
    });
    return result;
  }
  syncTreeViewSelection($event) {
    if (!this.treeView) return;
    debugger;
    this.treeView.instance.selectItem($event.itemData);
  }

  addPresetFilter($event) {
    console.log($event);
  }
}
