import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatFiltersComponent } from './cat-filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Store } from '@ngxs/store';
import { CatService } from '../../../core/services/cat.service';
import { CatBreedDTO } from '../../../core/dto/breed.dto';
import { SetFilter } from '../../../core/store/cat.store';

describe('CatFiltersComponent', () => {
  let component: CatFiltersComponent;
  let fixture: ComponentFixture<CatFiltersComponent>;
  let mockCatService: jasmine.SpyObj<CatService>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockCatService = jasmine.createSpyObj('CatService', ['getBreeds']);
    mockStore = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [
        CatFiltersComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatSliderModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: CatService, useValue: mockCatService },
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatFiltersComponent);
    component = fixture.componentInstance;

    mockCatService.getBreeds.and.returnValue(of([{ id: 1, name: 'Breed 1' }, { id: 2, name: 'Breed 2' }] as CatBreedDTO[]));

    fixture.detectChanges();
  });

  it('should create the CatFiltersComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const formValue = component.filtersForm.value;
    expect(formValue).toEqual({
      selectedBreed: null,
      resultLimit: 20
    });
  });

  it('should call getBreeds from the catService on initialization and populate breeds', () => {
    expect(mockCatService.getBreeds).toHaveBeenCalled();
    expect(component.breeds.length).toBe(2);
    expect(component.breeds).toEqual([{ id: 1, name: 'Breed 1' }, { id: 2, name: 'Breed 2' }]);
  });

  it('should dispatch SetFilter action with form values when submitting the form', () => {
    component.filtersForm.setValue({
      selectedBreed: '1',
      resultLimit: 30
    });

    component.onSubmit();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new SetFilter({ selectedBreed: '1', resultLimit: 30, page: 1 })
    );
  });

  it('should render form controls for breed selection and result limit', () => {
    const compiled = fixture.nativeElement;

    const breedSelect = compiled.querySelector('mat-select');
    expect(breedSelect).toBeTruthy();

    const resultLimitSlider = compiled.querySelector('mat-slider');
    expect(resultLimitSlider).toBeTruthy();
  });

  it('should update the form value when slider is changed', () => {
    const resultLimitControl = component.filtersForm.controls['resultLimit'];

    expect(resultLimitControl.value).toBe(20);

    resultLimitControl.setValue(40);
    fixture.detectChanges();

    expect(resultLimitControl.value).toBe(40);
  });
});
