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
    selector: "app-subject",
    templateUrl: './subject.component.html'
})
export class SubjectComponent {
    View = View;
    state = View.List;
    companyOptionList: any[] = [];
    queryCompany
    newSubject: { companyId?: number, name: string, startTime?: Date, endTime?: Date } = {
        name: "",
    }

    selectedCompany
    isLoading = true;
    selectedSubject;
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
    subjectDataSource = new DataSouce({
        store: createStore({
            key: "id",
            loadUrl: "/api/admin/study/subject/load",
            updateUrl: "/api/admin/study/subject/update",
            deleteUrl: "/api/admin/study/subject/delete",
            insertUrl: "/api/admin/study/subject/insert",
        })
    });


    constructor(private http: HttpClient) { }
    subjects: any[] = []

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
        this.loadSubject();
    }

    async createSubject() {
        var newSubject = Object.assign({}, this.newSubject);
        newSubject.companyId = this.queryCompany.id;
        debugger;
        await this.subjectDataSource.store().insert(newSubject);
        await this.search();
        this.state = View.List;
    }
    async deleteSubject(data) {
        await this.subjectDataSource.store().remove(data.id);
        await this.loadSubject();
    }
    async  loadSubject() {
        if (!this.queryCompany) {
            return alert("请先选择公司");
        }
        let filter = [];
        if (this.queryCompany) {
            filter.push("companyId", '=', this.queryCompany.id);
        }
        this.subjects = await this.subjectDataSource.store().load({ filter: filter })
    }
    async updateSubject() {
        await this.subjectDataSource.store().update(this.selectedSubject.id, this.selectedSubject);
        this.state = View.List;
        await this.loadSubject()
    }
    async selectSubject(subject) {
        this.selectedSubject = Object.assign({}, subject);
        this.state = View.Create
    }
}