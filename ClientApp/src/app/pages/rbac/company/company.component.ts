import { Component } from '@angular/core';
import DataSource from "devextreme/data/data_source";
import { createStore } from "devextreme-aspnet-data-nojquery";
@Component({
    selector: 'app-company',
    templateUrl: "./company.component.html"
})
export class CompanyComponent {
    companyDataSource: DataSource = new DataSource(createStore({
        key: "id",
        loadUrl: '/api/admin/Rbac/company/load',
        insertUrl: '/api/admin/Rbac/company/insert',
        updateUrl: '/api/admin/Rbac/company/update',
        deleteUrl: '/api/admin/Rbac/company/delete',

    }));

}   