import { View, TreeListView } from "src/app/shared/dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import { EditorType } from "../editor-type";
import DataSource from "devextreme/data/data_source";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from 'src/environments/environment';
type EditorOptions = DevExpress.ui.dxTextBoxOptions;

export let newsView: View = {
    title: "新闻管理",
    dvoFullName: "Wings.Projects.Rcxh.DVO.News.NewsManage",
    dataSource: new DataSource({
        store: AspNetData.createStore({
            key: "id",
            loadUrl: environment.ip + "/api/Hk/news/load",
            insertUrl: environment.ip + "/api/Hk/news",
            updateUrl: environment.ip + "/api/Hk/news",
            deleteUrl: environment.ip + "/api/Hk/news",
        })
    }),
    viewType: "Table",
    cols: [
        {
            dataField: "title",
            caption: "文章标题",
            dataType: "string"
        } as DxiDataGridColumn,
        {
            dataField: "content",
            caption: "内容",
            dataType: "string",

        } as DxiDataGridColumn,
        {
            dataField: "createTime",
            caption: "提交时间",
            dataType: "datetime"
        } as DxiDataGridColumn,

        {
            dataField: "status",
            caption: "状态",
            dataType: "number",
            lookup: {
                dataSource: [ // contains the same values as the "status" field provides
                    { label: '已提交', value: 0 },
                    { label: '发布', value: 1 },
                    { label: '撤销', value: 2 }
                    // ...
                ]
            }
        } as DxiDataGridColumn,




    ],
    items: [
        {
            dataField: "title",
            label: { text: "文章标题" },
            dataType: "string"
        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "title",
            label: { text: "文章标题" },
            dataType: "string"
        } as DevExpress.ui.dxFormSimpleItem,

        {
            dataField: "content",
            label: { text: "文章内容" },
            dataType: "string",
            editorType: "dxTextArea"
        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "tag",
            label: { text: "文章分类" },
            dataType: "string"
        } as DevExpress.ui.dxFormSimpleItem,




    ]
};
