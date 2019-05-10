import { WsRefTreeComponent } from "./ws-ref-tree/ws-ref-tree.component";
import { WsImageCellComponent } from './ws-image-cell/ws-image-cell.component';
export let cellComponentRegister: any[] = [
  {
    name: "wsRefTree",
    component: WsRefTreeComponent
  },
  {
    name: "wsImage",
    component: WsImageCellComponent
  }
];

export let components = cellComponentRegister.map(cel => cel.component);