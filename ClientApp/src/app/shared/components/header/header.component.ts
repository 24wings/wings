import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import themes from "devextreme/ui/themes";
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  selectedTheme = "material.orange.light";
  @Output()
  menuToggle = new EventEmitter<boolean>();

  themes = new DataSource({
    store: new ArrayStore({
      data:
        [{ name: "material.blue.light", group: "material" },
        { name: "dx.material.blue.dark.css", group: "material" },
        { name: "dx.material.lime.light.css", group: "material" },
        { name: "dx.material.lime.dark.css,group", group: "material" },
        { name: "dx.material.orange.light.css", group: "material" },
        { name: "dx.material.orange.dark.css", group: "material" },
        { name: "dx.material.purple.light.css,group", group: "material" },
        { name: "dx.material.purple.dark.css", group: "material" },
        { name: "dx.material.teal.light.css", group: "material" },
        { name: "dx.material.teal.dark.css", group: "material" },
        { name: "dx.carmine.compact.css", group: "carmine" },
        { name: "dx.android5.light.css", group: "android5" }
        ], key: "name"
    }),
    group: "group"
  });

  @Input()
  menuToggleEnabled = false;

  @Input()
  title: string;

  userMenuItems = [{
    text: '个人信息',
    icon: 'user'
  }, {
    text: '退出',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    },

  },
    // {
    //   text: "切换主题",
    //   icon: "theme",
    //   onClick: () => {
    //     this.selectThemePanelVisible = true;
    //   }
    // }

  ];
  selectThemePanelVisible = false;

  constructor(private authService: AuthService) { }

  toggleMenu = () => {
    this.menuToggle.emit();
  }

  updateTheme($event) {
    console.log($event);

    // themes.current('material.orange.dark');
    themes.current($event);
    /**
     *  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.contrast.compact.css" rel="stylesheet"
    integrity="sha384-TMuexicke0hOC66Kz+XVBYOvWTD3niZE6fdHP3RUtHMqKgIUaL0Dy1sandiFYN70 sha512-pfvbaCR1DHmPz3aWryvPtIc1EKYgqxMSGra37H8gd8b1neDpmXtCdrI9p9EmDMd7NMO6MkD7xSH5KtmJcYZk9Q=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.contrast.css" rel="stylesheet"
    integrity="sha384-dsDDQHAWMKd3DQwe7AgEv+iBQcm900Kg8LVksS1uiUQEETpSYQIRnYjDtoTajtS7 sha512-aLjvLofnB/Opw4QrmI/ps5rD2WbMA+io7zMeQF/M3AY7R4fSXRtpMI7icZLfY3j3MxwmVlm7qjNfvf0O5UO7gg=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.dark.compact.css" rel="stylesheet"
    integrity="sha384-+Gv0ru10OukuCssiZ+2wqVAZtM1/jz+PF+oCrOJNgVt6W/sO9hNN9XpBwYKh6P7k sha512-7HGTFn/nsPP9WvMk5LWfYzNVgaidCWMaL9+AN7sehXuBAbagb40x8OdHpDs0adwQ9MPczuqCZvLtjmYDG6Rwug=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.dark.css" rel="stylesheet"
    integrity="sha384-9GjqDXIR1ETwW36g983o5XCuTBKZxUTZpEHbKPiaPi7LDwLOGdAsCJy0i6na+jM1 sha512-moWuVVdQm4hbAk4LVyhNy7hxtsX8XxrJxaJzi/PegVLPmy7R5KPBnCZgNjPayTpif7/+jHV2cuFEtP1Nly8Olw=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.darkmoon.compact.css" rel="stylesheet"
    integrity="sha384-4yTfLRkzx2hX4AY58TMWY09sg4BUt/yuqe+qoJzrnrhPkVZl/3d/XZbAGLBF1HvK sha512-QLtu+obwt5o9oNBqZz1OBti1G/Nvwl5WE/aiG+66Xh4hhM6zE/Xr5HKhNu8sXECcBNRaesIITwzw1doygdV7cg=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.darkmoon.css" rel="stylesheet"
    integrity="sha384-oRQC3yhHx9vsHVPJlBkaidetxrlLEh040CfMTH/4d1ur+GwJ0tnqML7itaMVePkv sha512-4WIQ4GFDmXE8TaKT0FihV0NXvyekS/9ts12iopjB/tFWELGvSOT4EjXX4him6gJzGP6izwjYkPAUS37HerCruw=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.darkviolet.compact.css" rel="stylesheet"
    integrity="sha384-WJId09KVWXyoJU1kwVEjdMUMxZ8h/HcJ316SIzufm5lySDYSXrhT/R2yb8m2HERX sha512-8dQuBFeTZ4vF+0+mhFNFG1DN2UX4aJKznJpY0eYxAiGlMCQFccfzuB15StcQ4GSxDZFGaJ6nStstfz4eunJLow=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.darkviolet.css" rel="stylesheet"
    integrity="sha384-k+l6Qlsij64XNkD9tfJdKzGLmZ7GXYzOHcwFOjXOlfu/os3eCMokVOOD4TSW+Asq sha512-eC5oQXYXYA2hett5iFZb3/iIaHfzWYBRjtxxeVOSzz4z1FB6Yeh5S0QTJzYoHtDJoTVVc6YjZFVKR5ueHgBG/Q=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.greenmist.compact.css" rel="stylesheet"
    integrity="sha384-gAN7CBDp5FlJmdS+OD1DRVcabM+yBgWtc2YNTU/Ahy87mWsroFBY4aj6Oi0oA9Bp sha512-wJgVJHV9Cjswygpt2BtWvDVTDnQxpCrdVTCR/6yiDJ3Imsu2qWA1JFVRJWTfd4CJJwVbVP1ZCxtXMRTyhMLXVw=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.greenmist.css" rel="stylesheet"
    integrity="sha384-EKLnvRu7uBhQGx+4oNWw1IzFpSdhmGvNIBldA4umHrC0ao2QGuO27zivp/9BscfH sha512-2x9EWRc+AZ1ybohTTXLgpBR27H0NUPk+ku5tEXXMbX2nqvCoQi6ZpgSajtRVN1UcQyy4UM/On64rpQlEH7Ag3Q=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.ios7.default.css" rel="stylesheet"
    integrity="sha384-pMfCf0AFsyFPs9wdKAKQQncvCbfMIu3RCqs74tRQopC5RGhPIxutVNrpJAdTgA/2 sha512-eZBwgdf1W3esh3ijyqeHfFVKKw4Q/JAAlvRfDg9WABhl/S4OIaCtLtFwgpC4T3afRdgooIPkpAieR2FGO8htnw=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.light.compact.css" rel="stylesheet"
    integrity="sha384-63k9mkfF9W3e1qJBaZGwgVaRMd0TrDtJ2xsgPMoA0zaqR7Tnhqlujh3YDvziH7Yi sha512-Z500HMNEWKz7IY7cjpqK6ooj1If8rkEH+rb/46kStDDM0wiUQ7beZluLEcJjyeHgP5wVjRiHWBXv/RA8aKlXqw=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.light.css" rel="stylesheet"
    integrity="sha384-lWrC0u1j9RWYgvWWBtEIHiywkQqTbNeFyORkI6zEHsM94Njyu29JDK+H5M5d6ZUp sha512-is43u0Vm51Kbbnx4RsCWsHsPWclZMGwkqqeWD8bhiIiHK2W+hjBndA7EgOvkO8iKt2L49yfSI4bT1NUsuHpT6g=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.material.blue.dark.css" rel="stylesheet"
    integrity="sha384-dVL06IoQODAF8BHz1RM2D+s5JIvtG8LlY6v6mRvbLrXASQTTvo8KVOvEE6dzeZTS sha512-AAI5EFWov+5aeCGH04snwc3+LXbESiYzJMq1dKrPqdUsy/1C3myI/+Vfxb/62lO+GjdQCRVE6Djp73ElL9/ZcA=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.material.blue.light.css" rel="stylesheet"
    integrity="sha384-hNkW46JEnx/Js3zlVBIrFsj8Skms4tdzOtjm2hxZt9gqPeuvqXjgtdMtfqbWm1u8 sha512-4EqKxgm0E5HIaFzGfEcwT4ZpZjL5Vca0Y68TXu9jsZNEEevUi35opmN99FWDEW1IyeldNiFPDxo074OIzlwU9w=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.material.lime.dark.css" rel="stylesheet"
    integrity="sha384-dZ/k46iNDOnABCvufpcIjRs1c7EDf1/rwpsGIFC85Pb0+h1Sm3QG05xVk4cy6R9H sha512-GMbmGpyg9sC7hJTvcACPiT0Dyrh/Z+cKQw5pJs/8dnqgevYEJDL2Lju6ayWCivHj25f5SmFIwuLe42jkvZUcDw=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.material.lime.light.css" rel="stylesheet"
    integrity="sha384-E5vBXLH7MwDgbho5sESr/OJJOUaMoagGPZ8bth8ViAW6r9UOeEQn+VcqF80cVkyA sha512-6YJ26V+prJC2F23ClazpNNQJK26Pw0Bj8TExxPciQN3PI9wkJxEOqNUuXdZHoC2ORZj5pPjpDh4IwyAeo23oWQ=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.material.orange.dark.css" rel="stylesheet"
    integrity="sha384-pjTShHhndEqS4e2Tq4Z9M3K3ysqm0LOA7bXNRueZR8V/0tcplC4RtfMFDjROZ60c sha512-DFvUpOVb1xK7mt1HCjJNzORoRM1Ha3cLDsSjM1cJdRowxWBoX1lldxjrtuUMeA0x1DKx64E69iV7KTNftMCIoQ=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.material.orange.light.css" rel="stylesheet"
    integrity="sha384-jiBA8jxF8NmxayNeg9ixlFgwi/g+UZMh5X35QlnRXtJDn74Bx7h7r7oTbtDnh4xu sha512-Cgo/7yY5knJ0B5rpHr9rDYP03Df6DaYfyXsUTPTlYmrMJECJMFtApZZVPtfwftiwbc4bVLDwXNCINC6ZoSAmqw=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.material.purple.dark.css" rel="stylesheet"
    integrity="sha384-4QJKPryumOC6Xpa+YRSh7EYPlpYJJgP7Epah4PRty7cvmZP8lsYSi17vXRjKVmuu sha512-zYm6rbD312coJIG9qFsauKhyRHdCcbLC6gdblJEss92M7F7OOPC4FZK+UWC/HwQnFC37JWiDwKp1zhh/JjtuPg=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.material.purple.light.css" rel="stylesheet"
    integrity="sha384-MWbvhOB2/GdtInf8TCHxztMeiYSnO/MLYQx5gdo6wBdjBqVGlo+oIv1IuaWSZwMR sha512-xMz54bBANtMjF52bsSPgUyu4CCbklWnB4xyTodmUkaw5T5S1ZhdsvA8LuxCfKkieZTWOCyrg2K/p2qybNhJNUQ=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.material.teal.dark.css" rel="stylesheet"
    integrity="sha384-erKEoVEKGY3CO2Q2/8hTllaGkYVmbiGIbmwOQlSpQRvXTjMRc3wGNAwzPjrLX9iv sha512-ecdwNJjFXL02TkDFiAk2qKlt+SKPD32JzprHU4seFgg86HfdLjeOMyRIoUlxyzC8/vsMJKbltIbbd8axVYXJZg=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.material.teal.light.css" rel="stylesheet"
    integrity="sha384-6AWX5BhRaips7+/CiNsOHjn3I/lc6cTeGWrPIsXKDwGkTRf/0Ae0ZoU8WDauc2iP sha512-1hd9X48wrdueRkDX1muGqpHn0/aPGHlPi0PKE8W3c+DnLNW4NIYg7B1Y9ufL9QLkqFIbVLsxkeqwY9FxesO1EQ=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.softblue.compact.css" rel="stylesheet"
    integrity="sha384-e0XbyZXLk3hHCoTU3RGRQlftlHNAMeLMfUhCR8g8CFqC2lY6we8Plz+wbQXo9K3Q sha512-qXjGMlsUm24zBBcybQjdhnHMFWzeu9AKa3gC/ihpnCsbavQrPkbxEDWItaXqXfewCEXwsW3DzmtFjvrW+gbnjQ=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.softblue.css" rel="stylesheet"
    integrity="sha384-o3pm9UgcaFiW1484myNS20u4ryWk+2uty1bdC2LxNa9HtF4tnrgsaKOL+iiYfi2X sha512-X10oxQy10ZjcTfCSm6igQIQBjnh2JP0/CsXS6DhiBL++g61CGaKsjWR75Elg+jouwWbQAbMdWTf2KmIi298BIw=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.spa.css" rel="stylesheet"
    integrity="sha384-A2CHSaYFgedSJE9DNW2PyYybaSb/YG0nz96DJDQZ3TfjSCyyU0zfW9+nf+gvfaX9 sha512-kP7Y21BP1KkMb/XpsolCxaWMby7SwM+Khx0rehLfbvBS+B1GHZLMmtwMfEcS0YgFyKLa1l4I7ebeqLcAaXLSnQ=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.win10.black.css" rel="stylesheet"
    integrity="sha384-RZ6sIfhH59z3ebjR8HvQyn5vb5hZWkkXICNrbxCOXnZ0auUBzA9e75+uQptq/52i sha512-5HJdlPfhf+WzLi/HEwvo8mPQd3cAHZ4tQFsfhoZ6OZ1TVhWzA8Z5AL5C1CfRWzwFS8hsN3Z2iqufHOzTOEPQYA=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.win10.white.css" rel="stylesheet"
    integrity="sha384-KcAfVW3V0stVawWpZF2clpITKiGJyrenVT0BTD5Wk4DlOPLi8VWRPaB3TXce9WNV sha512-YjvmRcWbE/mATvBZHlX0WJhft4uRUxEIueR0e0FYrmOxPK4z5oahI0ISvP2YraMVyBqx1410YxFFGOOv+lrBEg=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.win8.black.css" rel="stylesheet"
    integrity="sha384-ATtVX5HkrRmOlW0tsfB/vYlwRLFRsiP4rH/O9A9J1RZZ3mtS5haxeNkok7kj+tuq sha512-WlYVtOtAsFekFXsYHgxTbBpXlX+U1CI32KBrbj0oeoZWVYs1HaX07fM7fQYQAuWaZzp3To/UGgmXcAoZO3e6FA=="
    crossorigin="anonymous">
  <link href="https://cdn3.devexpress.com/jslib/18.2.7.19080/css/dx.win8.white.css" rel="stylesheet"
    integrity="sha384-t02tGB3Rk+VFuAeUDmJZPZ8UB34ANpa9LbUIIF1YTdFyPgFCxKnOD7AuEPqgsimr sha512-FjNAxaGrF0b0tADwqjgVrrT4nO/MyJfR/AQxyplsHkKiR6ScGBZ3mTiBAkXEUP608wzqW9rSgEpu2Hipx3iv7Q=="
    crossorigin="anonymous">
     */

  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule,
    DxPopupModule,
    DxSelectBoxModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }
