import { Component } from '@angular/core';
import { TreeViewDynamic } from 'app/libs/dynamic/base/struct/IDynamic';
import DataSource from 'devextreme/data/data_source';
import LocalStore from 'devextreme/data/local_store';
import { Dynamic, DynamicField } from 'app/libs/dynamic/base/struct/IDynamic';
import { DynamicAlias } from 'app/libs/dynamic/dynamic-register';

@Component({ selector: "rbac-menu", templateUrl: "./menu.component.html" })
export class MenuComponent {
  menuTreeDynamic: { parentIdExpr: string, keyExpr: string, displayExpr, cols: Dynamic[], fields: DynamicField[] } = {
    parentIdExpr: "parentId",
    displayExpr: "text",
    keyExpr: 'id',
    cols: [
      { alias: DynamicAlias.ZorroStringCol, config: { dataField: 'text', label: '菜单名字' } },
      { alias: DynamicAlias.ZorroStringCol, config: { dataField: 'link', label: '菜单地址' } },

    ],
    fields: [
      { dataField: 'text', label: "菜单名字", config: {}, alias: DynamicAlias.ZorroFieldString },
      { dataField: 'link', label: "菜单地址", config: {}, alias: DynamicAlias.ZorroFieldString },
    ]


  }
  dataSource = new DataSource(new LocalStore({
    key: "id",
    name: "menu",
    data: [
      { id: 1, text: '系统', link: null, parentId: 0 },
      { id: 2, text: '角色权限', link: null, parentId: 1 },
      { id: 3, text: '组织', link: "/rbac/org", parentId: 2 },
      { id: 4, text: '菜单', link: "/rbac/menu", parentId: 3 },
    ]
  }));

}