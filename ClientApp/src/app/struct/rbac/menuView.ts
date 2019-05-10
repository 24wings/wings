import { View, TreeListView } from "src/app/shared/dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import { EditorType } from "../editor-type";
import DataSource from "devextreme/data/data_source";
type EditorOptions = DevExpress.ui.dxTextBoxOptions;
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from 'src/environments/environment';


export let menuView: TreeListView = {
  title: "菜单管理",
  dvoFullName: "Wings.Projects.Rcxh.DVO.Rbac.MenuManage",
  parentIdExpr: "parentId",
  keyExpr: "id",

  dataSource: new DataSource({
    store: AspNetData.createStore({
      key: "id",
      loadUrl: environment.ip + "/api/Hk/menu/load",
      insertUrl: environment.ip + "/api/Hk/menu",
      updateUrl: environment.ip + "/api/Hk/menu",
      deleteUrl: environment.ip + "/api/Hk/menu",
    })
  }),
  viewType: "TreeList",
  cols: [
    {
      dataField: "text",
      caption: "菜单名称",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "link",
      caption: "菜单地址",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "power",
      caption: "菜单权限",
      dataType: "number"
    } as DxiDataGridColumn
  ],
  items: [
    {
      dataField: "text",

      dataType: "string",
      label: { text: "菜单名字" },


    } as DevExpress.ui.dxFormSimpleItem,
    {
      dataField: "link",
      label: { text: "菜单地址" },
      dataType: "string"
    } as DevExpress.ui.dxFormSimpleItem,
    {
      dataField: "power",
      label: { text: "菜单权限" },
      dataType: "number"
    } as DevExpress.ui.dxFormSimpleItem
  ],
  querys: []
};
