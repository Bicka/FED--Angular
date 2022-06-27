import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Item } from 'src/app/_models/item';
import { ItemFav } from 'src/app/_models/itemFav';
import ItemParams, { apiSearch } from 'src/app/_models/itemParams';
import { OptionsBeed, OptionsCategory } from 'src/app/_models/options';
import { Pagination } from 'src/app/_models/pagination';
import { ItemService } from 'src/app/_services/item.service';
import { OptionsService } from 'src/app/_services/options.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  itemsFav: ItemFav[];
  items: Item[];
  optionsBreed: OptionsBeed[];
  optionsCategory: OptionsCategory[];
  pagination: Pagination;
  itemsParams: ItemParams;
  @Input() type: apiSearch;

  constructor(
    private itemService: ItemService,
    private optionsService: OptionsService
  ) {
    this.itemsParams = itemService.getItemsParams();
  }

  ngOnInit(): void {
    this.getOptionsBreed();
    this.getOptionsCategory();
    this.itemsParams.type = this.type;
    this.loadItems();
  }
  resetFilters() {
    this.itemsParams = this.itemService.resetUserParams();
    this.loadItems();
  }
  loadItems() {
    this.itemService.setUserParams(this.itemsParams);
    switch (this.itemsParams.type) {
      case 'images/search': {
        this.itemService.loadItems(this.itemsParams).subscribe((response) => {
          this.items = response.result;
          this.pagination = response.pagination;
        });
        break;
      }
      case 'favourites': {
        this.itemService
          .loadItemsFav(this.itemsParams)
          .subscribe((response) => {
            this.itemsFav = response.result;
            this.pagination = response.pagination;
          });
        break;
      }
    }
  }

  pageChanged(event: number) {
    this.itemsParams.pageNumber = event - 1;
    this.itemService.setUserParams(this.itemsParams);
    this.loadItems();
  }

  getOptionsBreed() {
    this.optionsService.getOptionsBreed().subscribe((response) => {
      this.optionsBreed = response;
    });
  }
  getOptionsCategory() {
    this.optionsService.getOptionsCategory().subscribe((response) => {
      this.optionsCategory = response;
    });
  }
}
