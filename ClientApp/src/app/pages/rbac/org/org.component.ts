import { Component, ViewChild } from '@angular/core';
import DataSource from "devextreme/data/data_source";
import { createStore } from "devextreme-aspnet-data-nojquery";
import { DxDataGridComponent, DxTreeListComponent } from 'devextreme-angular';


enum View {
    SelectUserShow,
    SelectRoleShow
}

@Component({
    selector: 'app-org',
    templateUrl: './org.component.html'
})
export class OrgComponent {
    View = View
    state: View;
    @ViewChild("companyGrid") dataGrid: DxDataGridComponent
    @ViewChild(DxTreeListComponent) orgTreeList: DxTreeListComponent
    @ViewChild("userGrid") userDataGrid: DxDataGridComponent
    @ViewChild("roleGrid") roleDataGrid: DxDataGridComponent

    companyDataSource: DataSource = new DataSource(createStore({
        key: "id",
        loadUrl: '/api/admin/Rbac/company/load',
        insertUrl: '/api/admin/Rbac/company/insert',
        updateUrl: '/api/admin/Rbac/company/update',
        deleteUrl: '/api/admin/Rbac/company/delete',
    }));
    userDataSource: DataSource = new DataSource(createStore({
        key: "id",
        loadUrl: '/api/admin/Rbac/user/load',
        insertUrl: '/api/admin/Rbac/user/insert',
        updateUrl: '/api/admin/Rbac/user/update',
        deleteUrl: '/api/admin/Rbac/user/delete',
        onBeforeSend: (opreation, settings) => {
            if (opreation == 'insert') {
                var newUser = JSON.parse(settings.data.values);
                newUser.companyId = this.selectedCompanyKey;
                newUser.orgId = this.selectedOrgKey;

                settings.data.values = JSON.stringify(newUser);

            }
        }
    }));
    orgDataSource: DataSource = new DataSource(createStore({
        key: "orgId",
        loadUrl: '/api/admin/Rbac/org/load',
        insertUrl: "/api/admin/Rbac/org/insert",
        updateUrl: "/api/admin/Rbac/org/update",
        deleteUrl: "/api/admin/Rbac/org/delete",
        onBeforeSend: (opreation, settings) => {
            if (opreation == 'insert') {
                var newOrg = JSON.parse(settings.data.values);
                newOrg.companyId = this.selectedCompanyKey;
                settings.data.values = JSON.stringify(newOrg);

            }
        }
    }));
    roleDataSource: DataSource = new DataSource(createStore({
        key: "id",
        loadUrl: '/api/admin/Rbac/role/load',
        insertUrl: "/api/admin/Rbac/role/insert",
        updateUrl: "/api/admin/Rbac/role/update",
        deleteUrl: "/api/admin/Rbac/role/delete",
        onBeforeSend: (opreation, settings) => {
            if (opreation == 'insert') {
                var newRole = JSON.parse(settings.data.values);
                newRole.companyId = this.selectedCompanyKey;
                newRole.orgId = this.selectedOrgKey;
                settings.data.values = JSON.stringify(newRole);

            }
        }
    }));

    selectedCompanyKey
    selectedOrgKey
    async selectedCompanyChange($event: any) {
        console.log($event)

        setTimeout(async () => {
            this.orgTreeList.instance.clearFilter();
            this.selectedCompanyKey = $event.selectedRowKeys[0]
            this.orgTreeList.instance.filter(["companyId", "=", this.selectedCompanyKey]);
            await this.orgTreeList.instance.refresh();
        }, 200);
    }
    getCompanyKey = () => {
        return this.selectedCompanyKey;
    }





    userIconClick = (e, $event) => {
        this.state = View.SelectUserShow;
        var clonedItem = Object.assign({}, e.row.data);
        var orgId = clonedItem.orgId;
        this.selectedOrgKey = orgId;
        setTimeout(async () => {
            this.userDataGrid.instance.clearFilter();

            this.userDataGrid.instance.filter(["orgId", "=", orgId]);
            await this.userDataGrid.instance.refresh();
        }, 200);

    }
    roleIconClick = (e) => {
        this.state = View.SelectRoleShow
        var clonedItem = Object.assign({}, e.row.data);
        var orgId = clonedItem.orgId;
        this.selectedOrgKey = orgId;
        setTimeout(async () => {
            this.userDataGrid.instance.clearFilter();

            this.roleDataGrid.instance.filter(["orgId", "=", orgId]);
            await this.roleDataGrid.instance.refresh();
        }, 200);
    }
}