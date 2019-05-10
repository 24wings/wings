import { Input, ViewChild, Output, EventEmitter, Component } from '@angular/core';
import { DxFileUploaderComponent } from 'devextreme-angular';
import { environment } from 'src/environments/environment';
@Component({ selector: "ws-image-cell", templateUrl: "./ws-image-cell.component.html" })
export class WsImageCellComponent {
    @ViewChild(DxFileUploaderComponent) fileUploader: DxFileUploaderComponent
    @Input() set formData(f) {
        debugger;
        this._formData_ = f;
    }
    get formData() {
        return this._formData_;
    }
    filename = "";
    _formData_;
    get uploadUrl() {
        return environment.ip + "/api/Base/Common/upload" + "?filename=" + this.filename;
    }
    @Input() item: any;
    //   @ViewChild(DxTreeViewComponent) treeView: DxTreeViewComponent;
    @Output() formDataChange = new EventEmitter();

    treeDataSource: any;
    treeBoxValue: string[] = [];
    gridDataSource: any;
    _gridBoxValue: number[] = [];
    images = [];

    constructor() {

    }

    set value(val) {
        if (this.item.editorOptions.dxTreeView.selectionMode != 'multiple') val = val[0];
        this.formData[this.item.dataField] = val;
        this.formDataChange.emit(this.formData);
    }

    upload() {
        this.fileUploader.onValueChanged.forEach(e => {
            // this.fileUploader.onUploaded
        })

    }
    uploaded($event) {
        var json = $event.request.response;
        var text: { filename: string } = JSON.parse(json);

        this.formData[this.item.dataField] = text.filename;
        this.formDataChange.emit(this.formData);
    }
    onUploadStart($event) {
        console.log($event);

        this.filename = $event.value[0].name;
        console.log(this.uploadUrl)
        $event.component.option("uploadUrl", this.uploadUrl);
    }
}