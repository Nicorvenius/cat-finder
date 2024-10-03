import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CatFiltersComponent } from "../cat-filters/cat-filters.component";
import { CatListComponent } from "../cat-list/cat-list.component";

@Component({
  selector: 'app-cat-search',
  standalone: true,
  imports: [
    CatFiltersComponent,
    CatListComponent,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './cat-search.component.html',
  styleUrl: './cat-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatSearchComponent {

}
