import { View } from "src/app/shared/dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import { userView, } from "./rbac/userView";
import DataSource from "devextreme/data/data_source";
import { roleView } from "./rbac/roleView";
import { menuView } from "./rbac/menuView";
import { orgView } from './rbac/orgView';
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from 'src/environments/environment';
import { newsTagView } from './news/news_tag';
import { newsView } from './news/news';
import { productView } from './product/product';
import { productTagView } from './product/product_tag';
import { articletView } from './article/articleView';

export let metaView: View = {
  dvo: "ViewManage",
  title: "元数据设计页面",
  dvoFullName: "Wings.Projects.Rcxh.DVO.Rbac.MetaManage",
  viewType: "Table",
  dataSource: new DataSource({
    store: AspNetData.createStore({
      key: "id",
      loadUrl: environment.ip
    })
  }),
  cols: [
    { caption: "视图名称", dataType: "string", dataField: "name" },
    { caption: "数据视图模型", dataType: "string", dataField: "dvo" },
    {
      caption: "元数据",
      dataType: "string",
      dataField: "meta",
      calculateDisplayValue: data => (data ? JSON.stringify(data) : "")
    }
  ] as any,
  items: [
    {
      label: { text: "视图名称" },
      dataField: "name",
      editorType: "dxTextBox"
    },
    {
      label: { text: "数据视图模型" },
      dataField: "dvo",
      editorType: "dxTextBox"
    },
    {
      label: { text: "元数据" },
      dataField: "meta",
      editorType: "json" as any,
      template: "jsonTemplate"
    }
  ]
};

export let views: View[] = [metaView, userView, orgView, roleView, menuView, newsTagView, newsView,
  productView,
  productTagView,
  articletView
];
export let activeView = orgView;
