import { Component, HostBinding } from "@angular/core";
import { AuthService, ScreenService, AppInfoService } from "./shared/services";
import { locale, loadMessages, formatMessage } from "devextreme/localization";
import "devextreme-intl";


import { HttpClient } from "@angular/common/http";



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @HostBinding("class") get getClass() {
    return Object.keys(this.screen.sizes)
      .filter(cl => this.screen.sizes[cl])
      .join(" ");
  }
  initMessages() {

    locale("zh");
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class. 

  }

  constructor(
    private authService: AuthService,
    private screen: ScreenService,
    public appInfo: AppInfoService,
    public httpClient: HttpClient
  ) {
    this.initMessages();
  }

  isAutorized() {
    return this.authService.isLoggedIn;
  }

}
