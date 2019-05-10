
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

export let articletView: View = {
    add: false,
    delete: false,
    title: "文章管理",
    dvoFullName: "Article",

    dataSource: new DataSource({
        store: AspNetData.createStore({
            key: "id",
            loadUrl: environment.ip + "/api/Hk/article/load",
            insertUrl: environment.ip + "/api/Hk/article",
            updateUrl: environment.ip + "/api/Hk/article",
            deleteUrl: environment.ip + "/api/Hk/article",
            onBeforeSend: withAuthcationHeaderFunc
        })
    }),
    viewType: "Table",
    cols: [
        {
            dataField: "title",
            caption: "标题",
            dataType: "string"
        } as DxiDataGridColumn,
        {
            dataField: "summary",
            caption: "简述"
        },
        {
            dataField: "useAudio",
            caption: "音乐",
            dataType: "boolean"
        },


        {
            dataField: "charNum",
            caption: "字数",
            dataType: "number",
        } as DxiDataGridColumn,
        {
            dataField: "readNum",
            caption: "真实阅读量",
            dataType: "number",

        } as DxiDataGridColumn,
        {
            dataField: "useRead",
            caption: "定制阅读",
            dataType: "boolean",

        } as DxiDataGridColumn,
        {
            dataField: "useReadNum",
            caption: "定制阅读量",
            dataType: "number",

        } as DxiDataGridColumn,
        {
            dataField: "useReading",
            caption: "定制在读",
            dataType: "boolean",

        } as DxiDataGridColumn,
        {
            dataField: "useReadingNum",
            caption: "定制在读量",
            dataType: "number",

        },
        {
            dataField: "useAddress",
            caption: "定制地址",
            dataType: "boolean",

        },
        {
            dataField: "addressName",
            caption: "地址名称",
            dataType: "number",

        },
        {
            dataField: "address",
            caption: "详细地址",
            dataType: "number",

        },
        {
            dataField: "contactPhone",
            caption: "联系电话",
            dataType: "number",

        },
        {
            dataField: "useReadingNum",
            caption: "定制在读量",
            dataType: "number",

        },

        {
            dataField: "commentNum",
            caption: "评论数量",
            dataType: "number"
        } as any,



        // {
        //     dataField: "status",
        //     caption: "状态",
        //     lookup: {
        //         dataSource: [ // contains the same values as the "status" field provides
        //             { label: '已提交', value: 0 },
        //             { label: '上架', value: 1 },
        //             { label: '下架', value: 2 }
        //             // ...
        //         ]
        //     }

        // } as any,
        // {
        //     dataField: "summary",
        //     caption: "简述",
        //     dataType: "string"
        // } as DxiDataGridColumn,
        {
            dataField: "createTime",
            caption: "发布时间",
            dataType: "datetime"
        } as DxiDataGridColumn,

    ],
    items: [
        {
            dataField: "title",
            label: { text: "标题" },
            dataType: "string"
        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "useRead",
            label: { text: "定制阅读" },
            editorType: "dxSwitch",
        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "useReadNum",
            label: { text: "定制阅读量" },
            editorType: "dxNumberBox",
        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "useReading",
            label: { text: "定制在读" },
            editorType: "dxSwitch",
        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "useReadingNum",
            label: { text: "定制在读量" },
            editorType: "dxNumberBox",
        } as DevExpress.ui.dxFormSimpleItem,

        {
            dataField: "useAddress",
            label: { text: "启用地址" },
            editorType: "dxSwitch",
        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "addressName",
            label: { text: "地址名称" },
            dataType: "string"
        } as DevExpress.ui.dxFormSimpleItem,

        {
            dataField: "address",
            label: { text: "详细地址" },

        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "contactPhone",
            label: { text: "联系电话" },

        } as DevExpress.ui.dxFormSimpleItem,

        {
            dataField: "lng",
            label: { text: "经度" },

        } as DevExpress.ui.dxFormSimpleItem,
        {
            dataField: "lat",
            label: { text: "维度" },

        } as DevExpress.ui.dxFormSimpleItem,
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
