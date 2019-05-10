import { View, TreeListView } from "src/app/shared/dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import { EditorType } from "../editor-type";
import DataSource from "devextreme/data/data_source";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from 'src/environments/environment';
import { withAuthcationHeaderFunc } from '../util/withAuthcationHeaderFunc';
type EditorOptions = DevExpress.ui.dxTextBoxOptions;


export let orgView: TreeListView = {
    parentIdExpr: "parentId",
    dvoFullName: "Wings.Projects.Rcxh.DVO.Rbac.OrgManage",
    keyExpr: "orgId",
    title: "组织管理",
    viewType: "TreeList",
    dataSource: new DataSource({
        store: AspNetData.createStore({
            key: "orgId",
            loadUrl: environment.ip + "/api/Hk/org/load",
            insertUrl: environment.ip + "/api/Hk/org",
            updateUrl: environment.ip + "/api/Hk/org",
            deleteUrl: environment.ip + "/api/Hk/org",
            onBeforeSend: withAuthcationHeaderFunc
        })
    }),
    cols: [
        {
            dataField: "orgName",
            caption: "组织名称",
            dataType: "string"
        } as DxiDataGridColumn,
        {
            dataField: "createTime",
            caption: "创建时间",
            dataType: "date"
        } as DxiDataGridColumn
    ],
    items: [
        {
            dataField: "orgName",
            label: { text: "组织名称" },
            dataType: "string"
        } as DevExpress.ui.dxFormSimpleItem,

        {
            dataField: "createTime",
            label: { text: "创建时间" },
            dataType: "date",
            editorType: "dxDateBox" as EditorType
        } as DevExpress.ui.dxFormSimpleItem
    ],
    querys: [
        {
            dataField: "menus",
            label: { text: "角色菜单" },
            editorType: "wsRefTree" as any,
            editorOptions: {
                dxDropbox: {
                    displayExpr: "name"
                },
                dxTreeView: {
                    dataSource: new DataSource(
                        new LocalStore({
                            key: "id",
                            immediate: true,
                            name: "local-menu",
                            flushInterval: 1000
                        })
                    ),
                    selectionMode: "single",
                    keyExpr: "id",
                    displayExpr: "name",
                    parentIdExpr: "parentId",
                    placeholder: "勾选菜单列表"
                }
            }
        } as DevExpress.ui.dxFormSimpleItem
    ]
};
