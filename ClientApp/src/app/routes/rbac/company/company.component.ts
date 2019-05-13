import { Component } from '@angular/core';
import DataSouce from 'devextreme/data/data_source';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { list2Tree } from 'app/libs/dynamic/util/listToTree';

export interface TreeNodeInterface {
    key: number;
    name: string;
    age: number;
    level: number;
    expand: boolean;
    address: string;
    children?: TreeNodeInterface[];
}

enum View {
    Create,
    List,
    Update
}
@Component({
    selector: "app-company",
    templateUrl: "./company.component.html"
})
export class CompanyComponent {
    View = View;
    state = View.List;
    selectedCompany
    isAllDisplayDataChecked = false;
    newCompany: { id?: number, name } = {
        name: ''
    }
    dataSource = new DataSouce({
        store: createStore({
            key: "id",
            loadUrl: "/api/admin/Rbac/company/load",
            updateUrl: "/api/admin/Rbac/company/update",
            deleteUrl: "/api/admin/Rbac/company/delete",
            insertUrl: "/api/admin/Rbac/company/insert",
        })
    });
    companys: any[] = [];
    keyword = "";
    ngOnInit(): void {

    }
    nodes: any[] = []
    async  search() {
        this.loadCompanys();
    }
    async loadCompanys() {
        var filter = [];
        if (this.keyword) {
            filter.push(["name", "contains", this.keyword])
        }
        this.companys = await this.dataSource.store().load({ filter });

    }

    // 
    async  createCompany() {
        var companys = await this.dataSource.store().insert(this.newCompany);
        await this.loadCompanys();
        this.state = View.List;

    }
    async  deleteCompany(company) {
        await this.dataSource.store().remove(company.id);
        await this.loadCompanys();
        this.state = View.List;

    }
    selectCompany(company) {
        this.selectedCompany = Object.assign({}, company);
        this.state = View.Update;
    }
    async updateCompany() {
        var data = await this.dataSource.store().update(this.selectedCompany.id, { name: this.selectedCompany.name });
        await this.loadCompanys();
        this.state = View.List;
    }
}   