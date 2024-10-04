import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import {Store} from '@ngxs/store';
import {CatService} from '../../../core/services/cat.service';
import {FetchCatImages, SetFilter} from '../../../core/store/cat.store';
import {CatBreedDTO} from '../../../core/dto/breed.dto';

@Component({
  selector: 'app-cat-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule
  ],
  templateUrl: './cat-filters.component.html',
  styleUrl: './cat-filters.component.scss'
})
export class CatFiltersComponent implements OnInit {
  filtersForm: FormGroup;
  breeds: CatBreedDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private catService: CatService)
  {
    this.filtersForm = this.fb.group({
      selectedBreed: [null],
      resultLimit: [20]
    });
  }

  ngOnInit(): void {

    this.catService.getBreeds().subscribe((breeds) => {
      this.breeds = breeds;
    });
  }

  onSubmit() {
    const filters = this.filtersForm.value;
    console.log(filters)
    this.store.dispatch(new SetFilter({...filters, page: 1}));
  }
}
