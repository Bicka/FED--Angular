import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/_models/item';
import { ItemService } from 'src/app/_services/item.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  item: Item;
  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadItem();
  }

  loadItem() {
    this.itemService
      .getItemDetails(this.route.snapshot.paramMap.get('imageid')!)
      .subscribe((item) => {
        this.item = item;
      });
  }
}
