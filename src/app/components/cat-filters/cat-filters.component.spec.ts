import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatFiltersComponent } from './cat-filters.component';

describe('CatFiltersComponent', () => {
  let component: CatFiltersComponent;
  let fixture: ComponentFixture<CatFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
