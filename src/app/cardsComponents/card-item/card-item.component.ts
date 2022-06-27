import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/_models/item';
import { ItemFav } from 'src/app/_models/itemFav';
import { apiSearch } from 'src/app/_models/itemParams';
import { ItemService } from 'src/app/_services/item.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  @Input() item: Item | ItemFav;
  @Input() type: 'search' | 'fav';
  constructor(
    private itemService: ItemService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.item.type = this.type;
  }

  favClick() {
    if (this.item.type === 'search')
      this.itemService.addToFav(this.item.id).subscribe((response) => {
        if (response['message'] === 'SUCCESS')
          this.toastr.success('Added to favorites');
      });
  }
  removeFavClick() {
    if (this.item.type === 'fav')
      this.itemService.removeFromFav(this.item.id).subscribe((response) => {
        if (response['message'] === 'SUCCESS')
          this.toastr.info('Removed from favorites');
      });
  }
  getDetails() {
    if (this.item.type === 'search')
      this.router.navigateByUrl(`/image/${this.item.id}`);
    else if (this.item.type === 'fav')
      this.router.navigateByUrl(`/image/${this.item.image.id}`);
  }

  dowloadImage() {
    if (this.item.type === 'search')
      this.itemService.downloadImage(this.item.id, this.item.url);
    else if (this.item.type === 'fav')
      this.itemService.downloadImage(this.item.image.id, this.item.image.url);
  }
}
