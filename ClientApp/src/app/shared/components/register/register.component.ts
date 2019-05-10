import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";

import { AuthService, AppInfoService } from "../../services";
import { DxButtonModule } from "devextreme-angular/ui/button";
import { DxCheckBoxModule } from "devextreme-angular/ui/check-box";
import { DxTextBoxModule } from "devextreme-angular/ui/text-box";
import { DxValidatorModule } from "devextreme-angular/ui/validator";
import { DxValidationGroupModule } from "devextreme-angular/ui/validation-group";
import { SharedModule } from "../../shared.module";
import { RcxhApiService } from '../../services/rcxh-api.service';
import notify from "devextreme/ui/notify";
@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
    username = "admin";
    password = "8888";

    constructor(
        private authService: AuthService,
        public appInfo: AppInfoService,
        private rcxhApi: RcxhApiService,
        private router: Router
    ) { }

    async submit(args) {
        var rtn = await this.rcxhApi.signup(this.username, this.password);
        if (rtn) {

            //   localStorage.setItem("token", rtn.token);
            //   this.router.navigateByUrl("/rcxh/admin/page/Wings.Projects.Rcxh.DVO.Rbac.OrgManage");
            //   this.authService.logIn(this.login, this.password);
            if (rtn.user.id) {
                notify("恭喜加入我们", 'success');
                sessionStorage.setItem("userId", rtn.user.id);

                this.authService.logIn(this.username, this.password);
                this.router.navigateByUrl("/home/write");

            }

            args.validationGroup.reset();
        }


    }
}
@NgModule({
    imports: [
        SharedModule.forRoot(),
        CommonModule,
        RouterModule,
        DxButtonModule,
        DxCheckBoxModule,
        DxTextBoxModule,
        DxValidatorModule,
        DxValidationGroupModule
    ],
    declarations: [RegisterComponent],
    exports: [RegisterComponent]
})
export class RegisterModule { }
