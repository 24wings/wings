import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginFormComponent } from "./shared/components";
import { AuthGuardService } from "./shared/services";
import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { DisplayDataComponent } from "./pages/display-data/display-data.component";
import {
  DxDataGridModule,
  DxFormModule,
  DxPopupModule
} from "devextreme-angular";
import { SharedModule } from "./shared/shared.module";
import { SingleCardModule } from "./layouts";
import { SideNavInnerToolbarComponent } from 'src/app/layouts';
import { RegisterComponent } from './shared/components/register/register.component';
import { ShopComponent } from './shared/pages/shop/shop.component';
import { ShopCartComponent } from './shared/pages/shop-cart/shop-cart.component';
import { FileService } from './shared/services/file.service';
import { OrgComponent } from './pages/rbac/org/org.component';
import { CompanyComponent } from './pages/rbac/company/company.component';

const routes: Routes = [
  { path: "rcxh", loadChildren: "./libs/rcxh/rcxh.module#RcxhModule" },
  { path: "home", loadChildren: "./libs/home/home.module#HomeModule" },
  { path: "admin/rbac/org", component: OrgComponent },
  { path: "admin/rbac/company", component: CompanyComponent },



  // { path: "admin/blog", loadChildren: "./libs/blog/blog.module#BlogModule" },
  // {
  //   path: "admin/sql-inject",
  //   loadChildren: "./libs/sql-inject/sql-inject.module#SqlInjectModule"
  // },
  // { path: "admin/rbac", loadChildren: "./libs/rbac/rbac.module#RbacModule" },
  // { path: "admin/xss", loadChildren: "./libs/xss/xss.module#XSSModule" },
  // { path: "admin/task", loadChildren: "./libs/task/task.module#TaskModule" },
  // {
  //   path: "admin/worker",
  //   loadChildren: "./libs/worker/worker.module#WorkerModule"
  // },
  {
    path: "display-data",
    component: DisplayDataComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  { path: "shop", component: ShopComponent, },
  { path: "shop-cart", component: ShopCartComponent, },
  { path: "", redirectTo: "/login-form", pathMatch: "full" },
  // {
  //   path: "home",
  //   component: HomeComponent,
  //   canActivate: [AuthGuardService]
  // },
  {
    path: "login-form",
    component: LoginFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "**",
    redirectTo: "/login-form",
    // canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DxDataGridModule,
    DxFormModule,
    SharedModule,
    DxPopupModule,
    SingleCardModule
  ],
  providers: [AuthGuardService, FileService],
  exports: [RouterModule],
  declarations: [HomeComponent,
    ProfileComponent,
    DisplayDataComponent,
    ShopComponent,
    ShopCartComponent,
    OrgComponent,
    CompanyComponent
  ]
})
export class AppRoutingModule { }
