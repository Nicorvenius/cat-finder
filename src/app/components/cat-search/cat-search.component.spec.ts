import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatSearchComponent } from './cat-search.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CatFiltersComponent } from '../cat-filters/cat-filters.component';
import { CatListComponent } from '../cat-list/cat-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CatSearchComponent', () => {
  let component: CatSearchComponent;
  let fixture: ComponentFixture<CatSearchComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockStore.select.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        CatSearchComponent,
        MatCardModule,
        MatToolbarModule,
        CatFiltersComponent,
        CatListComponent,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the CatSearchComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display a toolbar with "Cat Image Search"', () => {
    const toolbarElement = fixture.debugElement.query(By.css('mat-toolbar')).nativeElement;
    expect(toolbarElement.textContent).toContain('Cat Image Search');
  });

  it('should render the CatFiltersComponent', () => {
    const catFiltersComponent = fixture.debugElement.query(By.directive(CatFiltersComponent));
    expect(catFiltersComponent).toBeTruthy();
  });

  it('should render the CatListComponent', () => {
    const catListComponent = fixture.debugElement.query(By.directive(CatListComponent));
    expect(catListComponent).toBeTruthy();
  });

  it('should have a mat-card with class "search-container"', () => {
    const matCard = fixture.debugElement.query(By.css('mat-card.search-container')).nativeElement;
    expect(matCard).toBeTruthy();
  });
});
