import { Injectable } from '@angular/core';
import { MyHttpService } from '../../../app/shared/services/my-http.service';

@Injectable()
export class RcxhApiService {
    dvo = {
        userManage: "Wings.Projects.Hk.DVO.Rbac.OrgManage"
    }

    api = {
        auth: {
            login: '/api/admin/Auth/login/',
            signup: "/api/Admin/Auth/signup",

        }

    }

    constructor(private http: MyHttpService) { }

    public login(username, password) {
        return this.http.Post(this.api.auth.login, { username, password });
    }

    public signup(username, password) {
        return this.http.Post(this.api.auth.signup, { username, password });
    }




}