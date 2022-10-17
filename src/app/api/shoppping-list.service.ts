import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AddOrEditShoppingItem } from "./models/add-shopping-item.model";
import { ShoppingItem } from "./models/shopping-item.model";


@Injectable({
    providedIn: 'root',
})
export class ShoppingListService {

    constructor(private http: HttpClient){}

    listShoppingItems() {
        return this.http.get<{Items: ShoppingItem[]}>(`${environment.shoppingApiUrl}/items`);
    }

    getShoppingItem(id: number) {
        return this.http.get<ShoppingItem>(`${environment.shoppingApiUrl}/items/${id}`);
    }

    createShoppingItem(item: AddOrEditShoppingItem) {
        return this.http.post(`${environment.shoppingApiUrl}/items`, item);
    }

    updateShoppingItem(id: number, item: AddOrEditShoppingItem) {
        return this.http.put(`${environment.shoppingApiUrl}/items/${id}`, item);
    }

    deleteShoppingItem(id: number) {
        return this.http.delete(`${environment.shoppingApiUrl}/items/${id}`);
    }
}