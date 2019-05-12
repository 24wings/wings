import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { DynamicModule } from 'app/libs/dynamic/dynamic.module';
import { UserComponent } from 'app/libs/rbac/user/user.component';
import { RoleComponent } from 'app/libs/rbac/role/role.component';
import { CompanyComponent } from './rbac/company/company.component';
import { OrgComponent } from './rbac/org/org.component';
import { MenuComponent } from './rbac/menu/menu.component';

const COMPONENTS = [
  DashboardComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,
  UserComponent,
  MenuComponent,
  RoleComponent,
  CompanyComponent,
  OrgComponent,

];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, DynamicModule],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule { }
