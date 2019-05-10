import { Injectable, Component, Input } from "@angular/core";

import notify from "devextreme/ui/notify";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent {
  view;
  showSubmenuModes: any;
  showFirstSubmenuModes: any;
  linkItems = [
    {
      name: `首页`
      //   items: [{ name: "homem", path: "home" }, { name: "dat", path: "dat" }]
    }
  ];

  items = [
    {
      location: "before",
      template: `<img src="http://221.235.53.114/themes/flow/images/main_logo_inverted.png" />`,
      options: {
        type: "back",
        text: "Back",
        onClick: () => {
          notify("Back button has been clicked!");
        }
      }
    },
    {
      location: "after",
      widget: "dxButton",
      locateInMenu: "auto",
      //   text: "首页",
      options: {
        dataSource: this.linkItems,
        displayExpr: "name",
        icon: "home",
        text: "首页",
        items: [],
        onClick: () => {
          notify("Refresh button has been clicked!");
        }
      }
    },
    {
      location: "center",
      locateInMenu: "never",
      template: () => {
        return '<div class=\'toolbar-label\' ></div>';
      }
    },
    {
      location: "after",
      widget: "dxButton",
      locateInMenu: "auto",
      options: {
        icon: "plus",
        onClick: () => {
          notify("Add button has been clicked!");
        }
      }
    },
    {
      locateInMenu: "always",
      text: "Save",
      onClick: () => {
        notify("Save option has been clicked!");
      }
    },
    {
      locateInMenu: "always",
      text: "Print",
      onClick: () => {
        notify("Print option has been clicked!");
      }
    },
    {
      locateInMenu: "always",
      text: "Settings",
      onClick: () => {
        notify("Settings option has been clicked!");
      }
    }
  ];

  constructor(private httpClient: HttpClient) {
    this.showSubmenuModes = [
      {
        name: "onHover",
        delay: { show: 0, hide: 500 }
      },
      {
        name: "onClick",
        delay: { show: 0, hide: 300 }
      }
    ];
    this.showFirstSubmenuModes = this.showSubmenuModes[1];
  }

  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.view = await this.httpClient
    //   .get(
    //     "http://localhost:5000/api/RBAC/Demo/dvoView?dvo=Wings.Base.RBAC.DVO.UserDVO"
    //   )
    //   .toPromise();
  }
}
