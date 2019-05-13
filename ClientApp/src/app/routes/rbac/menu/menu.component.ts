import { Component } from '@angular/core';
import DataSouce from 'devextreme/data/data_source';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { list2Tree, tree2List } from 'app/libs/dynamic/util/listToTree';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
enum View {
    List,
    Create,
    Update
}
@Component({
    selector: 'app-menu',
    templateUrl: "./menu.component.html"
})
export class MenuComponent {
    newMenu = { text: '', link: "" };
    View = View;
    state = View.List;
    keyword: string = '';
    selectedMenu
    ngOnInit() {

    }
    menus: any[] = []
    menuDataSource = new DataSouce({
        store: createStore({
            key: "id",
            loadUrl: "/api/admin/Rbac/menu/load",
            insertUrl: "/api/admin/Rbac/menu/insert",
            updateUrl: "/api/admin/Rbac/menu/update",
            deleteUrl: "/api/admin/Rbac/menu/delete",

        })
    });
    async  search() {
        await this.loadMenu();
    }

    async createMenu() {

        if (this.selectedMenu) {
            Object.assign(this.newMenu, { parentId: this.selectedMenu.id });
        }
        await this.menuDataSource.store().insert(this.newMenu);
        this.state = View.List;
        await this.loadMenu();
        this.selectedMenu = null;
    }
    async    deleteMenu(data) {
        await this.menuDataSource.store().remove(data.id);
        await this.loadMenu();
    }

    async loadMenu() {
        var filter = [];
        if (this.keyword) {
            filter.push('text', 'contains', this.keyword);
        }
        this.menus = await this.menuDataSource.store().load({ filter });
        var tree = list2Tree(this.menus, 'id', 'parentId', 'text')
        this.menus = tree2List(tree);
        debugger;
    }
    async createChildMenu() {

    }

    async updateMenu() {


        await this.menuDataSource.store().update(this.selectedMenu.id, { text: this.selectedMenu.text, link: this.selectedMenu.link });
        this.state = View.List;
        await this.loadMenu();
        this.selectedMenu = null;
    }
    selectMenu(menu) {
        this.selectedMenu = Object.assign({}, menu);
        this.state = View.Update;
    }

}