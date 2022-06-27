import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/users';
import { AccountService } from './account.service';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Item } from '../_models/item';
import { PaginatedResult } from '../_models/pagination';
import ItemParams from '../_models/itemParams';
import { ItemFav } from '../_models/itemFav';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  baseUrl = environment.apiUrl;
  itemCache = new Map();
  user: User;
  itemsParams: ItemParams;

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
    this.itemsParams = new ItemParams();
    console.log(this.itemsParams);
  }

  getItemsParams() {
    return this.itemsParams;
  }

  setUserParams(params: ItemParams) {
    this.itemsParams = params;
  }
  resetUserParams() {
    this.itemsParams = new ItemParams();
    return this.itemsParams;
  }

  loadItems(itemsParams: ItemParams) {
    var response = this.itemCache.get(Object.values(itemsParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = this.getPaginationHeaders();
    if (this.itemsParams.category_ids)
      params = params.append('category_ids', itemsParams.category_ids);
    if (this.itemsParams.breed_id)
      params = params.append('breed_id', itemsParams.breed_id);
    if (this.itemsParams.mime_types)
      params = params.append('mime_types', itemsParams.mime_types);

    return this.getPaginatedResult<Item[]>(
      this.baseUrl + itemsParams.type,
      params
    ).pipe(
      map((response) => {
        this.itemCache.set(Object.values(itemsParams).join('-'), response);
        return response;
      })
    );
  }

  loadItemsFav(itemParams: ItemParams) {
    let params = this.getPaginationHeaders();
    return this.getPaginatedResult<ItemFav[]>(
      this.baseUrl + itemParams.type,
      params
    ).pipe(
      map((response) => {
        return response;
      })
    );
  }

  addToFav(imageId: string) {
      return this.http.post(this.baseUrl + 'favourites', {
        image_id: imageId,
        sub_id: this.user.username
      });
   
  }
  removeFromFav(imageId: number) {
    return this.http.delete(this.baseUrl + `favourites/${imageId}`);
  }

  getItemDetails(imageId: string) {
    return this.http.get<Item>(this.baseUrl + `images/${imageId}`);
  }

  downloadImage(imageId: string, url: string) {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = url;
    link.download = imageId;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map((response) => {
        paginatedResult.result = response.body;
        if (response.headers.get('pagination-count') !== null) {
          let totalItems = JSON.parse(response.headers.get('pagination-count'));
          let itemsPerPage = JSON.parse(
            response.headers.get('pagination-limit')
          );
          let currentPage = JSON.parse(response.headers.get('pagination-page'));

          paginatedResult.pagination = {
            currentPage: currentPage,
            itemsPerPage: itemsPerPage,
            totalItems: totalItems,
          };
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders() {
    let params = new HttpParams();

    params = params.append('limit', this.itemsParams.pageSize.toString());
    params = params.append('page', this.itemsParams.pageNumber.toString());
    params = params.append('order', this.itemsParams.order.toString());

    return params;
  }
}
