import { Component } from '@angular/core';
import { Dynamic } from 'app/libs/dynamic/base/struct/IDynamic';
import { TreeViewDynamic, TableViewDynamic } from 'app/libs/dynamic/base/struct/IDynamic';
import DataSource from 'devextreme/data/data_source';
import LocalStore from 'devextreme/data/local_store';
import { DynamicAlias } from 'app/libs/dynamic/dynamic-register';
@Component({
  selector: 'rbac-role',
  templateUrl: './role.component.html'
})
export class RoleComponent {
  orgTreeView: Dynamic = {
    alias: 'tree-table-view',
    dataSource: new DataSource(new LocalStore({ key: "id", name: "org" })),
    config: { parentIdExpr: 'parentId', keyExpr: 'id', displayExpr: 'name' }
  }
  defaultMenus = [{ id: 1, text: '系统', link: null, parentId: 0 },
  { id: 2, text: '角色权限', link: null, parentId: 1 },
  { id: 3, text: '组织', link: "/rbac/org", parentId: 2 },
  { id: 4, text: '菜单', link: "/rbac/menu", parentId: 3 },]
  roleTableView: TableViewDynamic = {
    alias: "table-view",
    dataSource: new DataSource(new LocalStore({
      key: "id", name: 'role',
      data: [
        { id: 1, name: "系统管理员", orgId: 1, menus: Object.assign([], this.defaultMenus) },
        { id: 2, name: "供应商管理员", orgId: 2, menus: this.defaultMenus },
        { id: 3, name: "采购商管理员", orgId: 3, menus: this.defaultMenus },
        { id: 4, name: "张供应懂事长", orgId: 4, menus: this.defaultMenus },
        { id: 5, name: "李采购懂事长", orgId: 5, menus: this.defaultMenus },

      ]
    })),


  }
  filterExpr: [string, string] = ["id", "orgId"]
  roleTableCols: Dynamic[] = [
    { alias: DynamicAlias.ZorroStringCol, dataField: "name", label: "角色名", config: { dataField: 'name', label: '角色名' } } as any,
    { alias: DynamicAlias.ZorroViewTree, dataField: "menus", label: "角色菜单", config: { parentIdExpr: "parentId", displayExpr: "text", keyExpr: "id" } },

  ]


}