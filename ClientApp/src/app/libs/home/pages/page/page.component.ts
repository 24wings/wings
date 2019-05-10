import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServerView } from 'src/app/struct/ServerView';
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { views } from 'src/app/struct/views';
@Component({
    selector: "rcxh-page",
    templateUrl: "./page.component.html",
    styleUrls: ['./page.component.css']
})
export class PageComponent {
    // constructor(private ){}
    dvoFullName: string;

    selectedDVO;
    constructor(private route: ActivatedRoute, private client: HttpClient, private router: Router) {
        this.router.events.forEach(e => {
            if (e instanceof NavigationEnd) {
                this.dvoFullName = this.route.snapshot.params['dvoFullName'];
                this.refershView();
            }
        });

    }
    dvos: any[] = [];
    async ngOnInit() {
        this.dvoFullName = this.route.snapshot.params['dvoFullName'];
        debugger;

        this.refershView();
    }
    async   refershView() {
        this.selectedDVO = null;

        setTimeout(() => {
            this.selectedDVO = views.find(v => v.dvoFullName == this.dvoFullName);

        }, 200)

        // var view = await this.client.get(environment.ip + "/api/Hk/DVO/getViewByDVO/", { params: { dvo: this.dvoFullName } }).toPromise() as any;
        // var view = views[0];

        // this.selectView(view);

    }
    selectView(dvo: ServerView) {
        debugger;
        if (dvo) {
            if (dvo.dataSource.type == "odata") {
                dvo.dataSource = AspNetData.createStore({
                    key: dvo.dataSource.key,
                    loadUrl: environment.ip + dvo.dataSource.loadUrl,
                    insertUrl: environment.ip + dvo.dataSource.insertUrl,
                    updateUrl: environment.ip + dvo.dataSource.updateUrl,
                    deleteUrl: environment.ip + dvo.dataSource.deleteUrl
                }) as any;
            }
            if (dvo)
                this.selectedDVO = null;
            setTimeout(() => {
                this.selectedDVO = dvo;
            }, 200);

            dvo.cols.forEach(col => {
                if (col.calculateDisplayValue != null) {
                    col.calculateDisplayValue = function (items) {
                        debugger;
                        // return eval(col.calculateDisplayValue as any);
                        if (items && Array.isArray(items)) {
                            // return "items"
                            return items.map(item => item.text).join(",")
                        } else {
                            if (items.menus)
                                return items.menus.map(item => item.text).join(",")
                        }
                    }

                    // var items = col.calculateDisplayValue([{ text: "1234" }])
                    debugger;
                }
            })

            dvo.items.forEach(item => {
                Object.keys(item.editorOptions).forEach(key => {
                    if (item.editorOptions[key] != null) {
                        debugger;
                        ///认为是dataSource
                        if (item.editorOptions[key].dataSource) {
                            item.editorOptions[key].dataSource = AspNetData.createStore({
                                key: item.editorOptions[key].dataSource.key,
                                loadUrl: environment.ip + (item.editorOptions[key].dataSource.url),
                            }) as any;
                        }
                    }
                });


            });
            debugger;

        }
    }

    doAction($event) {
        console.log($event);
        window.open("/home/article/" + $event.data.id);
    }

}
