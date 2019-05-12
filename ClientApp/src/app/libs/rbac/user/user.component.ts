import { Component } from '@angular/core';
import { TreeViewDynamic, TableViewDynamic } from 'app/libs/dynamic/base/struct/IDynamic';
import DataSource from 'devextreme/data/data_source';
import LocalStore from 'devextreme/data/local_store';
import { Dynamic, DynamicField } from 'app/libs/dynamic/base/struct/IDynamic';
import { DynamicAlias } from 'app/libs/dynamic/dynamic-register';
@Component({ selector: "user", templateUrl: './user.component.html' })
export class UserComponent {
  orgTreeView: TreeViewDynamic = {
    alias: 'tree-table-view',
    dataSource: new DataSource(new LocalStore({ key: "id", name: "org" })),
    config: { parentIdExpr: 'parentId', keyExpr: 'id', displayExpr: 'name' }
  };
  userTableView: TableViewDynamic = {
    alias: "table-view",
    dataSource: new DataSource(new LocalStore({
      key: "id", name: 'user',
      data: [
        { id: 1, name: "系统管理员", orgId: 1, age: 22, sex: '男' },
        { id: 2, name: "供应商管理员", orgId: 2, age: 23, sex: '男' },
        { id: 3, name: "采购商管理员", orgId: 3, age: 24, sex: '男' },
        { id: 4, name: "张供应懂事长", orgId: 4, age: 26, sex: '男' },
        { id: 5, name: "李采购懂事长", orgId: 5, age: 17, sex: '男' },

      ]
    })),


  }
  userTableViewCols: DynamicField[] = [
    { label: "姓名", dataField: "name", alias: DynamicAlias.ZorroStringCol },
    { label: "年龄", dataField: "age", alias: DynamicAlias.ZorroStringCol },
    { label: "性别", dataField: "sex", alias: DynamicAlias.ZorroStringCol },
  ]
}