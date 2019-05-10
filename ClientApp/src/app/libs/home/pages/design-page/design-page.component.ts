import { Component, ViewChild, HostListener } from "@angular/core";
import { View } from "src/app/shared/dto/View";
import { views, activeView } from "src/app/struct/views";

@Component({
  selector: "design-page",
  templateUrl: "./design-page.component.html",
  styleUrls: ["./design-page.component.css"]
})
export class DesignPageComponent {
  views = views;
  // popupVisible: boolean = false;
  // public editorOptions: JsonEditorOptions;
  public data: any;
  designView: View = activeView;

  constructor() {
    // this.editorOptions = new JsonEditorOptions();
    // this.editorOptions.modes = ["code", "text", "tree", "view"]; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode

    // this.view =
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  list() { }

  changeView($event) {
    this.designView = null;
    setTimeout(() => {
      this.designView = $event;
    }, 500);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    document.addEventListener("keyup", e => {
      if (e.code == "MetaLeft") {
        this.list();
      }
    });
  }

  json;

  warn() {
    alert(1);
  }

  log($event) {
    console.log($event);
  }
  selectedView;
  doAction($event: { eventName; data }) {
    console.log($event);
    if ($event.data.meta) {
      this.selectedView = $event.data.meta;
    }
  }
}
