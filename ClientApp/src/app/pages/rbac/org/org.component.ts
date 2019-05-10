import { Component } from '@angular/core';
import DataSource from "devextreme/data/data_source";
import { createStore } from "devextreme-aspnet-data-nojquery";

@Component({ selector: 'app-org', templateUrl: './org.component.html' })
export class OrgComponent {
    orgDataSource: DataSource = new DataSource(createStore({ loadUrl: '/api/admin/Rbac/org/load' }));

}