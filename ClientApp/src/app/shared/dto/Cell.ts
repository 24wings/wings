import DevExpress from "devextreme/bundles/dx.all";

export type Cell = DevExpress.ui.dxFormSimpleItem &
  DevExpress.ui.dxFormGroupItem &
  DevExpress.ui.dxFormTabbedItem &
  DevExpress.ui.dxFormEmptyItem &
  DevExpress.ui.dxFormButtonItem;
export type DataSource = string &
  any[] &
  DevExpress.data.DataSource &
  DevExpress.data.DataSourceOptions;
