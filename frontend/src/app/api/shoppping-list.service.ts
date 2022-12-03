import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AddOrEditShoppingItem } from "./models/add-or-edit-shopping-item.model";
import { AddOrRemoveUser } from "./models/add-or-remove-user.model";
import { AddShoppingList } from "./models/add-shopping-list.model";
import { ShoppingItem } from "./models/shopping-item.model";
import { ShoppingList } from "./models/shopping-list.model";


@Injectable({
    providedIn: 'root',
})
export class ShoppingListService {

    constructor(private http: HttpClient){}

    listShoppingLists() {
        return this.http.get<{Items: ShoppingList[]}>(`${environment.shoppingApiUrl}/list`);
    }

    createShoppingList(list: AddShoppingList) {
        return this.http.post(`${environment.shoppingApiUrl}/list`, list);
    }

    deleteShoppingList(listId: number) {
        return this.http.delete(`${environment.shoppingApiUrl}/list/${listId}`);
    }

    addUserToShoppingLists(listId: number, user: AddOrRemoveUser) {
        return this.http.post(`${environment.shoppingApiUrl}/list/${listId}/add-user`, user);
    }

    removeUserFromShoppingLists(listId: number, user: AddOrRemoveUser) {
        return this.http.post(`${environment.shoppingApiUrl}/list/${listId}/remove-user`, user);
    }

    listShoppingItems(listId: number) {
        return this.http.get<{Items: ShoppingItem[]}>(`${environment.shoppingApiUrl}/list/${listId}/item`);
    }

    addItemToShoppingList(listId: number, item: AddOrEditShoppingItem) {
        return this.http.post(`${environment.shoppingApiUrl}/list/${listId}/item`, item);
    }

    editShoppingListItem(listId: number, itemId: number, item: AddOrEditShoppingItem) {
        return this.http.put(`${environment.shoppingApiUrl}/list/${listId}/item/${itemId}`, item);
    }

    deleteShoppingListItem(listId: number, itemId: number) {
        return this.http.delete(`${environment.shoppingApiUrl}/list/${listId}/item/${itemId}`);
    }
}