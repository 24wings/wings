import { View, TreeListView } from "src/app/shared/dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import { EditorType } from "../editor-type";
import DataSource from "devextreme/data/data_source";
import { RequiredValidator } from "@angular/forms";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from 'src/environments/environment';
type EditorOptions = DevExpress.ui.dxTextBoxOptions;

export let roleView: View = {
  title: "角色管理",
  dvoFullName: "Wings.Projects.Rcxh.DVO.Rbac.RoleManage",
  dataSource: new DataSource({
    store: AspNetData.createStore({
      key: "id",
      loadUrl: environment.ip + "/api/Hk/role/load",
      insertUrl: environment.ip + "/api/Hk/role",
      updateUrl: environment.ip + "/api/Hk/role",
      deleteUrl: environment.ip + "/api/Hk/role",
    })
  }),
  viewType: "Table",
  cols: [
    {
      dataField: "roleName",
      caption: "角色名",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "menus",
      caption: "菜单",
      dataType: "string",
      calculateDisplayValue: function (role) {
        return role.menus ? role.menus.map(m => m.text) : "";
      }
    } as any
  ],
  items: [
    {
      dataField: "roleName",
      label: { text: "角色名" },
      dataType: "string",
      validationRules: [{ type: "required", message: "角色名必填" }],
      isRequired: true
    } as DevExpress.ui.dxFormSimpleItem,

    {
      dataField: "menus",
      label: { text: "角色菜单" },

      editorType: "wsRefTree" as any,
      editorOptions: {
        dxDropbox: {
          displayExpr: "text"
        },
        dxTreeView: {
          dataSource: new DataSource({
            store: AspNetData.createStore({
              key: "id",
              loadUrl: environment.ip + "/api/Hk/menu/load",
              insertUrl: environment.ip + "/api/Hk/menu",
              updateUrl: environment.ip + "/api/Hk/menu",
              deleteUrl: environment.ip + "/api/Hk/menu",
            })
          }),
          selectionMode: "multiple",
          keyExpr: "id",
          displayExpr: "text",
          parentIdExpr: "parentId",
          placeholder: "勾选菜单列表"
        }
      }
    } as DevExpress.ui.dxFormSimpleItem
  ]
};
