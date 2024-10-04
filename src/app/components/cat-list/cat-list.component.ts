import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CatState, FetchCatImages } from "../../../core/store/cat.store";
import { Observable } from "rxjs";
import { CatImageDTO } from "../../../core/dto/cat-image.dto";
import { AsyncPipe } from "@angular/common";
import { CatCardComponent } from "../cat-card/cat-card.component";

import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InfiniteScrollDirective } from "ngx-infinite-scroll";

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CatCardComponent,
    MatGridListModule,
    MatProgressBarModule,
    InfiniteScrollDirective
  ],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.scss'
})
export class CatListComponent implements OnInit {
  catImages$!: Observable<CatImageDTO[] | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  currentPage =  1;
  isEnd = false;

  constructor(
    private store: Store,
  ) {}

  ngOnInit() {
    this.fetchImages();

    this.store.select(CatState.getPageNumber).subscribe((num) => this.currentPage = num);
    this.store.select(CatState.getIsEnd).subscribe((isEnd) => this.isEnd = isEnd);

    this.catImages$ = this.store.select(CatState.getCatImages);
    this.loading$ = this.store.select(CatState.getLoading);
    this.error$ = this.store.select(CatState.getError);
  }

  fetchImages() {
    this.store.dispatch(new FetchCatImages({
      page: this.currentPage
    }));
  }

  onScrolled() {
    this.currentPage++;
    this.fetchImages();
  }

}
