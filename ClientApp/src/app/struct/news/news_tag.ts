import { View, TreeListView } from "src/app/shared/dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import { EditorType } from "../editor-type";
import DataSource from "devextreme/data/data_source";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from 'src/environments/environment';
type EditorOptions = DevExpress.ui.dxTextBoxOptions;

export let newsTagView: View = {
    title: "新闻分类",
    dvoFullName: "Wings.Projects.Rcxh.DVO.News.NewsTagManage",
    dataSource: new DataSource({
        store: AspNetData.createStore({
            key: "id",
            loadUrl: environment.ip + "/api/Hk/newsTag",
            insertUrl: environment.ip + "/api/Hk/newsTag",
            updateUrl: environment.ip + "/api/Hk/newsTag",
            deleteUrl: environment.ip + "/api/Hk/newsTag",
        })
    }),
    viewType: "Table",
    cols: [
        {
            dataField: "name",
            caption: "昵称",
            dataType: "string"
        } as DxiDataGridColumn,
        {
            dataField: "orderBy",
            caption: "排序",
            dataType: "number"
        } as DxiDataGridColumn,



    ],
    items: [
        {
            dataField: "name",
            label: { text: "分类名称" },
            dataType: "string"
        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "orderBy",
            label: { text: "排序" },
            dataType: "number"
        } as DevExpress.ui.dxFormSimpleItem,



    ]
};
