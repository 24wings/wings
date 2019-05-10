import { Injectable } from '@angular/core';
import { LoginUser } from 'src/app/struct/dto/LoginUser';

@Injectable()
export class AppInfoService {

  constructor() { }

  public get title() {
    return '秒写';
  }

  public get userInfo(): LoginUser {
    return sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {} as any;
  }
  public set userInfo(u: LoginUser) {
    sessionStorage.setItem("user", JSON.stringify(u));
  }
}
