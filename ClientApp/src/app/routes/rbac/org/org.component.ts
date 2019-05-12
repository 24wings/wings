import { Component } from '@angular/core';
import DataSouce from 'devextreme/data/data_source';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { list2Tree } from 'app/libs/dynamic/util/listToTree';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, debounceTime, switchMap } from 'rxjs/operators';

enum View {
    Create,
    Update,
    List
}
@Component({
    selector: "app-org",
    templateUrl: "./org.component.html"
})
export class OrgComponent {
    View = View;
    state = View.List;
    companyOptionList: any[] = [];
    queryCompany
    newOrg: { orgName: string, companyId } = {
        orgName: '',
        companyId: 0
    }
    isLoading = true;
    selectedOrg;
    keyword
    searchChange$ = new BehaviorSubject('');
    companyDataSource = new DataSouce({
        store: createStore({
            key: "id",
            loadUrl: "/api/admin/Rbac/company/load",
            updateUrl: "/api/admin/Rbac/company/update",
            deleteUrl: "/api/admin/Rbac/company/delete",
            insertUrl: "/api/admin/Rbac/company/insert",
        })
    });
    orgDataSource = new DataSouce({
        store: createStore({
            key: "id",
            loadUrl: "/api/admin/Rbac/org/load",
            updateUrl: "/api/admin/Rbac/org/update",
            deleteUrl: "/api/admin/Rbac/org/delete",
            insertUrl: "/api/admin/Rbac/org/insert",
        })
    });

    constructor(private http: HttpClient) { }
    orgs: any[] = []

    async  onSearch(value) {
        this.isLoading = true;
        this.searchChange$.next(value);
    }
    ngOnInit() {
        const getRandomNameList = (name: string) =>
            this.http
                .get(`api/admin/Rbac/company/load`)
            ;
        const optionList$: Observable<any> = this.searchChange$
            .asObservable()
            .pipe(debounceTime(500))
            .pipe(switchMap(getRandomNameList));
        optionList$.subscribe(data => {
            console.log(data);
            this.companyOptionList = (data as any).data as any;
            this.isLoading = false;
        });
    }

    async search() {
        this.loadOrg();
    }

    async createOrg() {
        var newOrg = Object.assign(this.newOrg)
        if (this.selectedOrg) {
            newOrg.parentId = this.selectedOrg.id;
            newOrg.level = this.selectedOrg.level + 1;


        } else {
            newOrg.parentId = 0;
            newOrg.level = 0;
        }
        newOrg.companyId = this.queryCompany.id;
        debugger;
        await this.orgDataSource.store().insert(newOrg);
        await this.search();
        this.state = View.List;


    }
    async deleteOrg(data) {
        await this.orgDataSource.store().remove(data.orgId);
        await this.loadOrg();
    }
    async  loadOrg() {
        let filter = [];
        if (this.queryCompany) {
            filter.push("companyId", '=', this.queryCompany.id);
        }
        this.orgs = await this.orgDataSource.store().load({ filter: filter })
    }
} 