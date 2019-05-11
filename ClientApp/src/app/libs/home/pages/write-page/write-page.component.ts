import { Component, ViewChild } from '@angular/core';
import { MyHttpService } from 'src/app/shared/services/my-http.service';
import notify from "devextreme/ui/notify";
import { AuthService } from 'src/app/shared/services';
import { FileService } from 'src/app/shared/services/file.service';
import { EditorComponent } from '@tinymce/tinymce-angular';
let data = `
# 标题

**粗体** 
*斜体*
 <u>下划线</u> ~~删除线~~
    
  > 引用内容 

   \`\`\`
        < !--代码块 -->
            <link rel="stylesheet" href = "assets/prism.css" />
                <pre><code class="language-javascript" >
                    console.log('Test');
</code></pre >
    <script src="assets/prism.css" > </script>
\`\`\`
![alt](http://cucr.oss-cn-beijing.aliyuncs.com/img/QQ%E5%9B%BE%E7%89%8720190425084322.jpg)

1. 有序列表
2. 有序列表

    
 ![alt](http://cucr.oss-cn-beijing.aliyuncs.com/img/QQ%E5%9B%BE%E7%89%8720190425084322.jpg)

* 无序列表1
* 无序列表2
    
    [链接](http://baidu.com "链接提示")
    
    ![图片](http://placehold.it/140x140 "图片提示")
    
    分隔线
    
    ---
    
    ## 表格


column1 | column2 | column3
    ------- | ------- | -------
    column1 | column2 | column3
    column1 | column2 | column3
    column1 | column2 | column3`
enum View {
    Write,
    Setting,
    Preview
}
@Component({
    selector: "write-page", templateUrl: "./write-page.component.html",
    styleUrls: ["./write-page.component.css"]
})
export class WritePageComponent {
    sourceTypes: { label: string, value: any }[] = [{ label: "原创", value: 0 }, { label: "转载", value: 1 }];
    employee: any;
    positions: string[];
    states: string[];
    articleMeta = {
        summary: "",
        author: "",
        sourceType: 0,
        useAudio: false,
        audioUrl: "",
        audioName: ""
    }
    @ViewChild(EditorComponent) editor: EditorComponent
    state: View = View.Write;

    View = View;

    markdown = data;
    html
    constructor(private myHttp: MyHttpService,
        private authService: AuthService,
        private fileService: FileService
    ) {
        // authService.logIn("123", '123');
        setTimeout(() => {
            this.initEditor();
        }, 1000);

    }

    @ViewChild('audioEl') audioEl: { nativeElement: HTMLAudioElement };

    initEditor() {
        eval(`  window.Mditor.prototype.getHTML = function () {
            var self = this;
            // XXX 由于 Mditor 对代码库做了高亮样式造成复制到图文编辑器后, 所有文字都变成了一行
            // 因此暂时还是使用 marked 来直接生成代码块的内容(没有做高亮了)
            // var value = self.parser.parse(self.ui.editor.val());
            var value = marked(self.ui.editor.val());
            return '<div class="markdown-body typo">' + value + '</div>';
        };
        var mditor = new Mditor("#editor",{
            height:window.innerHeight - 43 - 50,
            fixedHeight:true
        });
        // 修改下帮助按钮的链接地址
        mditor.toolBar.get('help').handler = function() {
            window.open('https://github.com/ufologist/wechat-mp-article', 'mditor');
            return this;
        };
        mditor.toolBar.update();
        mditor.openPreview();`)
    }
    async save() {


        debugger;
        var data = Object.assign({ markdown: this.markdown, html: this.html }, this.articleMeta);
        var rtn = await this.myHttp.Post("/api/Hk/article", data);
        if (rtn) {
            notify("文章写完了,快去看看吧", 'success');

        }
    }

    setMeta() {
        this.refershEditor();

        this.state = View.Setting;
    }
    refershEditor() {
        if (document.getElementById("editor")) {
            this.markdown = (document.getElementById("editor") as HTMLTextAreaElement).value;
            this.html = document.getElementsByClassName("viewer")[0].innerHTML;
            document.getElementById("editorDiv").remove();

        }

    }
    edit() {
        this.state = View.Write;
        setTimeout(() => {
            this.initEditor();
        }, 1000);

    }
    preview() {

        this.refershEditor();
        this.state = View.Preview;
        setTimeout(() => {
            this.initPreview();
        }, 1000);
    }

    initPreview() {
        if (this.articleMeta.useAudio) {
            debugger;
            this.audioEl.nativeElement.addEventListener("play", function (e) {
                console.log(e);
            });
            this.audioEl.nativeElement.addEventListener("playing", (e) => {
                setInterval(() => this.refershAudio(), 1000);
            })




            this.audioEl.nativeElement.play();



        }
    }

    refershAudio() {
        var el = this.audioEl.nativeElement
        if (el) {
            this.duration = new Date(el.duration * 1000).format("mm:ss");

            this.currentTime = new Date(el.currentTime * 1000).format("mm:ss");
        }

    }

    duration
    currentTime

    async uploadFile() {
        var file = await this.fileService.selectFile();
        var formData = new FormData();
        formData.set("file", file.file);
        formData.append("filename", file.filename);

        var rtn = await this.myHttp.Post("/api/Video/video/uploadVideo", formData);
        if (rtn) {
            this.uploadModalVisible = true;
            this.uploadUrl = rtn.url;
        }
    }

    uploadUrl = "";

    uploadModalVisible = false;

    copyUploadUrl() {
        var input = document.createElement("input");
        input.id = "test";
        input.value = this.uploadUrl;
        input.style.position = "absolute";
        input.style.top = "-1000px";
        document.body.append(input);
        input.select();

        /* Copy the text inside the text field */
        document.execCommand("copy");
        document.body.removeChild(input)
    }
    log(e) {
        console.log(e)
    }

    file_picker_callback = async (callback, value, meta) => {
        /* Provide file and text for the link dialog */
        if (meta.filetype === 'file') {
            var file = await this.fileService.selectFile();
            var formData = new FormData();
            // callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
            formData.set("file", file.file);
            formData.append("filename", file.filename);

            var rtn = await this.myHttp.Post("/api/Video/video/uploadVideo", formData);
            if (rtn) {
                this.uploadModalVisible = true;
                this.uploadUrl = rtn.url;
                callback(rtn.url, { text: '新图片' });

            }
        }

        /* Provide image and alt text for the image dialog */
        if (meta.filetype === 'image') {
            // callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
            var file = await this.fileService.selectFile();
            var formData = new FormData();
            // callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
            formData.set("file", file.file);
            formData.append("filename", file.filename);

            var rtn = await this.myHttp.Post("/api/Video/video/uploadVideo", formData);
            if (rtn) {
                this.uploadModalVisible = true;
                this.uploadUrl = rtn.url;
                callback(rtn.url, { text: '新图片' });

            }
        }

        /* Provide alternative source and posted for the media dialog */
        if (meta.filetype === 'media') {
            callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
        }
    }

}

//http://tpjs.95t92.cn/upload/24许嵩 _ 黄龄 - 惊鸿一面.mp3