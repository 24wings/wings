
import { View, TreeListView } from "src/app/shared/dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import { EditorType } from "../editor-type";
import DataSource from "devextreme/data/data_source";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from 'src/environments/environment';
type EditorOptions = DevExpress.ui.dxTextBoxOptions;

export let productTagView: View = {
    title: "产品分类管理",
    dvoFullName: "Wings.Projects.Rcxh.DVO.Product.ProductTagManage",

    dataSource: new DataSource({
        store: AspNetData.createStore({
            key: "id",
            loadUrl: environment.ip + "/api/Hk/product-tag/load",
            insertUrl: environment.ip + "/api/Hk/product-tag",
            updateUrl: environment.ip + "/api/Hk/product-tag",
            deleteUrl: environment.ip + "/api/Hk/product-tag",
        })
    }),
    viewType: "Table",
    cols: [
        {
            dataField: "name",
            caption: "产品名称",
            dataType: "string"
        } as DxiDataGridColumn,
        {
            dataField: "orderBy",
            caption: "排序",
            dataType: "number",

        } as DxiDataGridColumn,

        {
            dataField: "status",
            caption: "状态",
            lookup: {
                dataSource: [ // contains the same values as the "status" field provides
                    { label: '已提交', value: 0 },
                    { label: '上架', value: 1 },
                    { label: '下架', value: 2 }
                    // ...
                ]
            }

        } as any,

        {
            dataField: "createTime",
            caption: "发布时间",
            dataType: "datetime"
        } as DxiDataGridColumn,

    ],
    items: [
        {
            dataField: "name",
            label: { text: "分类名字" },
            dataType: "string"
        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "orderBy",
            label: { text: "排序" },
        } as DevExpress.ui.dxFormSimpleItem,

        {
            dataField: "status",
            caption: "状态",
            editorType: "dxSelectBox",
            editorOptions: {
                displayExpr: "label",
                valueExpr: "value",
                dataSource: [
                    // contains the same values as the "status" field provides
                    { label: '已提交', value: 0 },
                    { label: '上架', value: 1 },
                    { label: '下架', value: 2 }
                ]
            }
        }

    ]
};

