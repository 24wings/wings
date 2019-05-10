import { Component } from '@angular/core';
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

enum View {
    Guest,
    User
}
@Component({
    selector: "shop-component",
    templateUrl: "./shop.component.html",
    styleUrls: ["./shop.component.css"]
})
export class ShopComponent {
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

    orderStore = AspNetData.createStore({
        key: "id",
        loadUrl: environment.ip + "/api/Hk/order/load",
        insertUrl: environment.ip + "/api/Hk/order"
    });



    async ngOnInit() {
        await this.listProductTags();
        await this.listProducts(this.productTags[0]);
        this.getUserInfo();
        this.listMyOrder();
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
            this.router.navigateByUrl("/shop-cart");
        }
    }
    orders: any[] = [];
    async listMyOrder() {
        if (this.state == View.User) {
            this.orders = await this.orderStore.load({ filter: ["userId", "=", sessionStorage.getItem("userId")] });
        }


    }
    async createOrder(p) {

        await this.orderStore.insert({
            userId: sessionStorage.getItem("userId"),
            productName: p.name,
            price: p.price,
            num: 1,
            shouldPayAmount: p.price * 1,
            realPayAmount: p.price * 1,
            status: 0,
            productImages: p.images,

        });
        this.listMyOrder();
    }


    logout() {
        sessionStorage.removeItem("userId");
        location.reload();
    }



}