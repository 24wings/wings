import { Component, ViewChild } from '@angular/core';
import DataSouce from 'devextreme/data/data_source';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { list2Tree, tree2List } from 'app/libs/dynamic/util/listToTree';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { NzTreeComponent } from 'ng-zorro-antd';

enum View {
    List,
    Create,
    Update,
    Delete

}

@Component({
    selector: "app-role",
    templateUrl: "./role.component.html"
})
export class RoleComponent {
    @ViewChild('createRoleTree') createRoleTreeComponent: NzTreeComponent;
    @ViewChild('updateRoleTree') updateRoleTreeComponent: NzTreeComponent;
    View = View;
    state: View = View.List;
    isLoadingCompany = false;
    isLoadingOrg = false;
    searchCompanyChange$ = new BehaviorSubject('');
    searchOrgChange$ = new BehaviorSubject('');
    queryCompany
    queryOrgId
    roles: any[] = [];
    companyOptionList: any[] = [];
    orgOptionList: any[] = [];
    selectedRole;
    newRole = { roleName: '', menus: [], menuIds: '', menuIdArray: [] };
    menuNodes: any[] = [];
    constructor(private http: HttpClient) { }
    orgNodes: { title }[] = [];


    companyDataSource = new DataSouce({
        store: createStore({
            key: "id",
            loadUrl: "/api/admin/Rbac/company/load",
            updateUrl: "/api/admin/Rbac/company/update",
            deleteUrl: "/api/admin/Rbac/company/delete",
            insertUrl: "/api/admin/Rbac/company/insert",
        })
    });
    async ngOnInit() {
        this.loadMenus();
        this.companyOptionList = await this.companyDataSource.store().load();
        const getRandomNameList = (name: string) =>
            this.http
                .get(`api/admin/Rbac/company/load`)
            ;
        const optionList$: Observable<any> = this.searchCompanyChange$
            .asObservable()
            .pipe(debounceTime(500))
            .pipe(switchMap(getRandomNameList));
        optionList$.subscribe(data => {
            console.log(data);
            this.companyOptionList = (data as any).data as any;
            this.isLoadingCompany = false;
        });
        const getOrgList = (name: string) =>
            this.http
                .get(`api/admin/Rbac/org/load`)
            ;
        const orgOptionList$: Observable<any> = this.searchOrgChange$
            .asObservable()
            .pipe(debounceTime(500))
            .pipe(switchMap(getOrgList));
        orgOptionList$.subscribe(data => {
            console.log(data);
            this.orgNodes = (data as any).data as any;
            this.isLoadingOrg = false;
        });

    }
    async loadRoles() {
        let filter = [];
        debugger;
        if (this.queryCompany && this.queryOrgId) {
            filter.push(["companyId", '=', this.queryCompany.id], 'and', ["orgId", '=', this.queryOrgId]);
            this.roles = await this.roleDataSource.store().load({ filter: filter });
            this.roles.forEach(role => {
                role.menus = this.getMenuNodes(role.menuIds)
            })

        } else {
            alert('错误')
        }
    }
    orgDataSource = new DataSouce({
        store: createStore({
            key: "id",
            loadUrl: "/api/admin/Rbac/org/load",
            updateUrl: "/api/admin/Rbac/org/update",
            deleteUrl: "/api/admin/Rbac/org/delete",
            insertUrl: "/api/admin/Rbac/org/insert",
        })
    });

    roleDataSource = new DataSouce({
        store: createStore({
            key: "id",
            loadUrl: "/api/admin/Rbac/role/load",
            updateUrl: "/api/admin/Rbac/role/update",
            deleteUrl: "/api/admin/Rbac/role/delete",
            insertUrl: "/api/admin/Rbac/role/insert",
        })
    });
    menuDataSource = new DataSouce({
        store: createStore({
            key: "id",
            loadUrl: "/api/admin/Rbac/menu/load",
            updateUrl: "/api/admin/Rbac/menu/update",
            deleteUrl: "/api/admin/Rbac/menu/delete",
            insertUrl: "/api/admin/Rbac/menu/insert",
        })
    });


    async onSearchCompany(val) {
        this.isLoadingCompany = true;
        this.searchCompanyChange$.next(val);
    }
    async onSearchOrg(val) {


    }
    async  search() {
        this.loadRoles();


    }
    async selectCompany(company) {
        var filter = ['companyId', '=', company.id];
        this.orgOptionList = await this.orgDataSource.store().load({ filter });
        this.orgNodes = list2Tree(this.orgOptionList.map(org => {
            org.title = org.orgName;
            return org;
        }), 'orgId', 'parentId', 'orgName')
    }

    async createRole() {
        if (this.queryCompany && this.queryOrgId) {
            var nodes = this.createRoleTreeComponent.getCheckedNodeList().concat(this.createRoleTreeComponent.getHalfCheckedNodeList());

            this.newRole.menuIds = nodes.map(node => node.key).join(",");
            var newRole = Object.assign(this.newRole, { companyId: this.queryCompany.id, orgId: this.queryOrgId });
            await this.roleDataSource.store().insert(newRole);
            await this.loadRoles();
            this.state = View.List;
        } else {
            alert('请选择角色所在公司和所在组织');
        }
    }
    async loadMenus() {
        var menus = await this.menuDataSource.store().load();
        this.menuNodes = list2Tree(menus.map(item => {
            item.key = item.id;
            item.title = item.text;
            return item;
        }), 'id', 'parentId', 'text');

        debugger;
    }
    refershNewUserMenu() {

        debugger;
    }
    getMenuNodes(menuIds: string) {
        if (!menuIds) {
            return []
        }
        debugger;
        var listMenu = tree2List(JSON.parse(JSON.stringify(this.menuNodes.slice(0))));
        var containsMenu = listMenu.filter(m => menuIds.split(",").indexOf(m.id + '') != -1);
        var nodes = list2Tree(containsMenu, 'id', 'parentId', 'text');
        debugger;
        return nodes;
        // return this.menuNodes.filter(node => menuIds.split(",").some(id => id == node.id));

    }

    async  deleteRole(role) {
        await this.roleDataSource.store().remove(role.id)
        await this.loadRoles();
    }

    selectRole(role) {
        this.selectedRole = Object.assign({}, role);
    }
    async    updateRole() {
        var nodes = this.updateRoleTreeComponent.getCheckedNodeList().concat(this.updateRoleTreeComponent.getHalfCheckedNodeList());
        nodes = tree2List(nodes).filter(n => n.isChecked);
        var menuIds = nodes.map(node => node.key).join(",");
        debugger;
        await this.roleDataSource.store().update(this.selectedRole.id, { roleName: this.selectedRole.roleName, menuIds })

        this.state = View.List;
        await this.loadRoles()
    }
} 