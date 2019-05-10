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
import { LoginUser } from 'src/app/struct/dto/LoginUser';
@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent {
  login = "100001";
  password = "1234";

  constructor(
    private authService: AuthService,
    public appInfo: AppInfoService,
    private rcxhApi: RcxhApiService,
    private router: Router
  ) { }

  async onLoginClick(args) {
    var rtn = await this.rcxhApi.login(this.login, this.password);
    if (rtn) {
      // if (rtn.user.id && rtn.user.roleType == 11) {
      // sessionStorage.setItem("userId", rtn.user.id);
      // this.router.navigateByUrl("/shop");
      // } else {
      var user: LoginUser = rtn.user;
      this.appInfo.userInfo = user;
      localStorage.setItem("token", user.token);
      this.authService.logIn(this.login, this.password);

      this.router.navigateByUrl("/home/write");
      // }
      // localStorage.setItem("token", rtn.token);



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
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class LoginFormModule { }
