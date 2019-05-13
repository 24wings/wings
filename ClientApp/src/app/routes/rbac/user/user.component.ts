import { Component, ViewChild } from '@angular/core';
import DataSouce from 'devextreme/data/data_source';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { list2Tree } from 'app/libs/dynamic/util/listToTree';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';
import { NzTreeComponent } from 'ng-zorro-antd';


enum View {
    List,
    Create,
    Update
}

@Component({
    selector: 'app-user',
    templateUrl: "./user.component.html"
})
export class UserComponent {
    @ViewChild('createRoleTree') createRoleTreeComponent: NzTreeComponent;
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
    newUser = { nickname: '', roles: [], roleIds: '', menuIdArray: [] };
    menuNodes: any[] = [];
    constructor(private http: HttpClient) { }
    orgNodes: { title }[] = [];
    selectedUser;


    companyDataSource = new DataSouce({
        store: createStore({
            key: "id",
            loadUrl: "/api/admin/Rbac/company/load",
            updateUrl: "/api/admin/Rbac/company/update",
            deleteUrl: "/api/admin/Rbac/company/delete",
            insertUrl: "/api/admin/Rbac/company/insert",
        })
    });
    roleOptions: any[] = [];
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
    async loadUsers() {
        let filter = [];
        debugger;
        if (this.queryCompany) {
            filter.push(["companyId", '=', this.queryCompany.id]);
            if (this.queryOrgId) {
                filter.push('and', ["orgId", '=', this.queryOrgId])
            }
            this.roles = await this.userDataSource.store().load({ filter: filter });
            this.roles.forEach(role => {
                role.menus = this.getMenuNodes(role.menuIds)
            })

        } else {
            alert('请选择公司')
        }
    }
    selectUser(user) {
        this.selectedUser = user;
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
    userDataSource = new DataSouce({
        store: createStore({
            key: "id",
            loadUrl: "/api/admin/Rbac/user/load",
            updateUrl: "/api/admin/Rbac/user/update",
            deleteUrl: "/api/admin/Rbac/user/delete",
            insertUrl: "/api/admin/Rbac/user/insert",
        })
    })


    async onSearchCompany(val) {
        this.isLoadingCompany = true;
        this.searchCompanyChange$.next(val);
    }
    async onSearchOrg(val) {


    }
    async  search() {
        this.loadUsers();
        var companyId = this.queryCompany.id;
        var filter = [['companyId', '=', companyId], 'and', ['orgId', '=', this.queryOrgId]];
        this.roleOptions = await this.roleDataSource.store().load({ filter });

    }
    async selectCompany(company) {
        var filter = ['companyId', '=', company.id];
        this.orgOptionList = await this.orgDataSource.store().load({ filter });
        this.orgNodes = list2Tree(this.orgOptionList.map(org => {
            org.title = org.orgName;
            return org;
        }), 'orgId', 'parentId', 'orgName')
    }

    async createUser() {
        if (this.queryCompany && this.queryOrgId) {
            // var roleIds = this.roleOptions.map(r => r.id).join(",");
            this.newUser.roleIds = "," + this.newUser.roles.join(",") + ",";
            var newUser = Object.assign(this.newUser, { companyId: this.queryCompany.id, orgId: this.queryOrgId });
            delete newUser.roles;
            debugger;
            await this.userDataSource.store().insert(newUser);
            await this.loadUsers();
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
    }
    refershNewUserMenu() {
    }
    getMenuNodes(menuIds: string) {
        if (!menuIds) {
            return []
        }
        return this.menuNodes.filter(node => menuIds.split(",").some(id => id == node.key));

    }

    async  deleteRole(role) {
        await this.roleDataSource.store().remove(role.id)
        await this.loadUsers();
    }
    isNotSelected(value: string): boolean {
        return this.roleOptions.map(r => r.id).indexOf(value) === -1;
    }
    async updateUser() {

        await this.userDataSource.store().update(this.selectedUser.id, { username: this.selectedUser.username, password: this.selectedUser.password, nickname: this.selectedUser.nickname })
        this.state = View.List;

        await this.loadUsers();
    }
}