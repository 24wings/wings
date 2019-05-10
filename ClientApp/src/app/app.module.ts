import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import {
  SideNavOuterToolbarModule,
  SideNavInnerToolbarModule,
  SingleCardModule,
  SingleCardComponent
} from "./layouts";
import { FooterModule, LoginFormModule } from "./shared/components";
import { AuthService, ScreenService, AppInfoService } from "./shared/services";
import { AppRoutingModule } from "./app-routing.module";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { locale, loadMessages } from "devextreme/localization";
// import "./local";
import "devextreme-intl";

import * as messagesZh from "devextreme/localization/messages/zh.json";
import { RegisterModule } from './shared/components/register/register.component';
import { TokenInterceptor } from './shared/services/token-interceptor';
loadMessages(messagesZh);
//Set locale according the browser language
locale(navigator.language);
@NgModule({
  declarations: [AppComponent],
  imports: [

    SharedModule,
    HttpClientModule,
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    LoginFormModule,
    RegisterModule,
    AppRoutingModule,

  ],
  providers: [AuthService, ScreenService, AppInfoService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
