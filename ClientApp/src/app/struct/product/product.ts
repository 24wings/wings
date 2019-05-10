
import { View, TreeListView } from "src/app/shared/dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import { EditorType } from "../editor-type";
import DataSource from "devextreme/data/data_source";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from 'src/environments/environment';
type EditorOptions = DevExpress.ui.dxTextBoxOptions;

export let productView: View = {
    title: "产品管理",
    dvoFullName: "Wings.Projects.Rcxh.DVO.Product.ProductManage",

    dataSource: new DataSource({
        store: AspNetData.createStore({
            key: "id",
            loadUrl: environment.ip + "/api/Hk/product/load",
            insertUrl: environment.ip + "/api/Hk/product",
            updateUrl: environment.ip + "/api/Hk/product",
            deleteUrl: environment.ip + "/api/Hk/product",
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
            dataField: "productTag",
            caption: "产品分类",
            displayExpr: "name",
            calculateDisplayValue: function (item) {
                return item.productTag ? item.productTag.name : "";
            }
        },

        {
            dataField: "images",
            caption: "产品图片",
            dataType: "string",
            cellTemplate: "Picture"
        } as DxiDataGridColumn,
        {
            dataField: "price",
            caption: "价格",
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
            dataField: "summary",
            caption: "简述",
            dataType: "string"
        } as DxiDataGridColumn,
        {
            dataField: "createTime",
            caption: "发布时间",
            dataType: "datetime"
        } as DxiDataGridColumn,

    ],
    items: [
        {
            dataField: "name",
            label: { text: "产品名字" },
            dataType: "string"
        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "productTagId",
            label: { text: "产品分类" },
            // dataType: "number",
            editorType: "dxLookup",
            editorOptions: {
                dxLookup: {
                    displayExpr: "name",
                    valueExpr: "id",
                    dataSource: AspNetData.createStore({
                        key: "id",
                        loadUrl: environment.ip + "/api/Hk/product-tag/load",
                    })
                }
            }
        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "images",
            label: { text: "产品图片" },
            editorType: "wsImage" as any
        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "price",
            label: { text: "价格" },
            dataType: "number",
            // editorOptions: { mode: "password" } as EditorOptions
        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "status",
            caption: "状态",
            editorType: "dxSelectBox",
            editorOptions: {
                displayExpr: "label",
                valueExpr: "value",
                dataSource: [ // contains the same values as the "status" field provides
                    { label: '已提交', value: 0 },
                    { label: '上架', value: 1 },
                    { label: '下架', value: 2 }
                    // ...
                ]
            }
        }

    ]
};






enum ProductStatus {
    /// <summary>
    /// 已提交
    /// </summary>
    Submit,
    /// <summary>
    /// 有效
    /// </summary>
    Active,
    /// <summary>
    /// 作废
    /// </summary>
    Fail

}
