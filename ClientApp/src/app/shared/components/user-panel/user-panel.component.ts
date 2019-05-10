import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { AppInfoService } from '../../services';

@Component({
  selector: 'app-user-panel',
  templateUrl: 'user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})

export class UserPanelComponent {
  @Input()
  menuItems: any;

  @Input()
  menuMode: string;

  constructor(public appInfo: AppInfoService) {
    if (this.appInfo.userInfo.headimg) {
      setTimeout(() => {
        document.getElementById("userImage").style.backgroundImage = `url("${this.appInfo.userInfo.headimg}")`
      }, 2000)


    }
  }
  ngAfterViewInit() {


  }
}

@NgModule({
  imports: [
    DxListModule,
    DxContextMenuModule,
    CommonModule
  ],
  declarations: [UserPanelComponent],
  exports: [UserPanelComponent]
})
export class UserPanelModule { }
