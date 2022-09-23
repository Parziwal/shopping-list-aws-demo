import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AddShoppingItem } from "../models/add-shopping-item.model";
import { ShoppingItem } from "../models/shopping-item.model";


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

    updateShoppingItem(item: AddShoppingItem) {
        return this.http.put(`${environment.shoppingApiUrl}/items`, item);
    }

    deleteShoppingItem(id: number) {
        return this.http.delete(`${environment.shoppingApiUrl}/items/${id}`);
    }
}