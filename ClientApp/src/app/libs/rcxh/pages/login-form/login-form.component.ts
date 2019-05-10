import { Component } from "@angular/core";
import { AuthService, AppInfoService } from "src/app/shared/services";
import { Router } from '@angular/router';
import { RcxhApiService } from '../../../../shared/services/rcxh-api.service';

@Component({
  selector: "hk-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent {
  login = "admin";
  password = "8888";

  constructor(
    private authService: AuthService,
    private router: Router,
    public appInfo: AppInfoService,
    public rcxhApi: RcxhApiService
  ) { }

  async onLoginClick(args) {
    var rtn = await this.rcxhApi.login(this.login, this.password);
    if (rtn) {

      localStorage.setItem("token", rtn.token);
      this.router.navigateByUrl("/rcxh/admin/page/Wings.Projects.Rcxh.DVO.Rbac.OrgManage");
    }

    if (!args.validationGroup.validate().isValid) {
      return;
    }

    this.authService.logIn(this.login, this.password);

    args.validationGroup.reset();
  }
}
