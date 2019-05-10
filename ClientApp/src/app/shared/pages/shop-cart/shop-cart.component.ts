import { Component } from '@angular/core';
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { myOrderView } from 'src/app/struct/product/order';

enum View {
    Guest,
    User
}
@Component({
    selector: "shop-cart",
    templateUrl: "./shop-cart.component.html",
    styleUrls: ["./shop-cart.component.css"]
})
export class ShopCartComponent {
    selectedDVO = myOrderView
    constructor(private router: Router) { }
    state = View.Guest;
    View = View;
    selectedTag;
    productTags: any[] = [];
    products: any[] = []
    tagStore = AspNetData.createStore({
        key: "id",
        loadUrl: environment.ip + "/api/Hk/product-tag/load",

    });

    productStore = AspNetData.createStore({
        key: "id",
        loadUrl: environment.ip + "/api/Hk/product/load",
    });





    async ngOnInit() {
        await this.listProductTags();
        await this.listProducts(this.productTags[0]);
        this.getUserInfo();
    }

    async getUserInfo() {
        if (sessionStorage.getItem("userId")) {
            this.state = View.User;
        }
    }

    async listProductTags() {
        let data = await this.tagStore.load();
        this.productTags = data;

    }

    async listProducts(p: { id: number }) {
        this.selectedTag = p;
        this.products = await this.productStore.load({ filter: ["productTagId", "=", p.id] });


    }
    cartNum = 0;


    cartProducts = [];

    addCart() {


    }
    goShopCart() {
        if (this.state == View.Guest) {
            this.router.navigateByUrl("/login-form");
        } else {

        }
    }




}