import DevExpress from "devextreme/bundles/dx.all";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import LocalStore from "devextreme/data/local_store";
import DataSource from "devextreme/data/data_source";
export class View {
  add?: boolean;
  delete?: boolean;
  dvoFullName: string;
  /**视图名字 */
  dvo?: string;
  viewType: "Table" | "TreeList";
  title: string;
  cols: DxiDataGridColumn[] = [];
  dataSource?: DataSource;
  items: (
    | DevExpress.ui.dxFormSimpleItem
    | DevExpress.ui.dxFormGroupItem
    | DevExpress.ui.dxFormTabbedItem
    | DevExpress.ui.dxFormEmptyItem
    | DevExpress.ui.dxFormButtonItem)[] = [];
  querys?: DevExpress.ui.dxFormSimpleItem[];

  onAction?: Function;
}

export class TreeListView extends View {
  keyExpr: string;
  parentIdExpr: "parentId" | string;
}

export class Col {
  label: string;
  dataType: string;
  dataField: string;
}
