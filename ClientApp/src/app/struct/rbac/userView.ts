import { View, TreeListView } from "src/app/shared/dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import { EditorType } from "../editor-type";
import DataSource from "devextreme/data/data_source";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from 'src/environments/environment';
type EditorOptions = DevExpress.ui.dxTextBoxOptions;

export let userView: View = {
  title: "用户管理界面",
  dvoFullName: "Wings.Projects.Rcxh.DVO.Rbac.UserManage",

  dataSource: new DataSource({
    store: AspNetData.createStore({
      key: "id",
      loadUrl: environment.ip + "/api/Hk/user/load",
      insertUrl: environment.ip + "/api/Hk/user",
      updateUrl: environment.ip + "/api/Hk/user",
      deleteUrl: environment.ip + "/api/Hk/user",
    })
  }),
  viewType: "Table",
  cols: [
    {
      dataField: "nickname",
      caption: "昵称",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "username",
      caption: "用户名",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "password",
      caption: "密码",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "org",
      caption: "所在组织",
      calculateDisplayValue: function (user) {
        return user.org ? user.org.orgName : "";
      },

    } as any
  ],
  items: [
    {
      dataField: "nickname",
      label: { text: "姓名" },
      dataType: "string"
    } as DevExpress.ui.dxFormSimpleItem,
    {
      dataField: "username",
      label: { text: "用户名" },
      dataType: "string"
    } as DevExpress.ui.dxFormSimpleItem,
    {
      dataField: "password",
      label: { text: "密码" },
      editorType: "dxTextBox",
      editorOptions: { mode: "password" } as EditorOptions
    } as DevExpress.ui.dxFormSimpleItem,
    {
      dataField: "org",
      label: { text: "所在组织" },
      editorType: "wsRefTree" as any,
      editorOptions: {
        dxTreeView: {
          dataSource: AspNetData.createStore({
            key: "orgId",
            loadUrl: environment.ip + "/api/Hk/org/load",

          }),

          selectionMode: "single",
          keyExpr: "id",
          valueExpr: "id",
          displayExpr: "orgName",
          parentIdExpr: "parentId",
          placeholder: "Select a value..."
        }
      }
    }
  ]
};