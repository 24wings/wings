import { Component } from '@angular/core';
import DataSouce from 'devextreme/data/data_source';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { list2Tree } from 'app/libs/dynamic/util/listToTree';
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
    keyword: string = ''
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
        await this.menuDataSource.store().insert(this.newMenu);
        await this.loadMenu();
    }
    async    deleteMenu(data) {
        await this.menuDataSource.store().remove(data.id);
    }

    async loadMenu() {
        var filter = [];
        if (this.keyword) {
            filter.push('text', 'contains', this.keyword);
        }
        this.menus = await this.menuDataSource.store().load({ filter });
    }

}