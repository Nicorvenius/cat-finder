import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatListComponent } from './cat-list.component';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { CatState } from '../../../core/store/cat.store';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CatImageDTO } from '../../../core/dto/cat-image.dto';

describe('CatListComponent', () => {
  let component: CatListComponent;
  let fixture: ComponentFixture<CatListComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CatState]), CatListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(CatListComponent);
    component = fixture.componentInstance;

    spyOn(store, 'select').and.returnValue(of([
      {
        id: '1',
        url: 'https://example.com/cat1.jpg',
        width: 600,
        height: 400,
        mime_type: 'image/jpeg',
        breeds: [{
          id: 1,
          name: 'string',
          weight: {imperial: '1-2', metric: '1-2'},
          origin: 'string',
          life_span: '12',
          breed_group: 'string',
        }],
        categories: []
      }
    ]));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch images on init', () => {
    spyOn(component, 'fetchImages');
    component.ngOnInit();
    expect(component.fetchImages).toHaveBeenCalled();
  });

  it('should load more images on scroll', () => {
    spyOn(component, 'fetchImages');
    component.onScrolled();
    expect(component.fetchImages).toHaveBeenCalled();
  });

  it('should display the correct number of images', () => {
    const mockCatImages: CatImageDTO[] = [
      {
        id: '1',
        url: 'https://example.com/cat1.jpg',
        width: 600,
        height: 400,
        mime_type: 'image/jpeg',
        breeds: [{
          id: 1,
          name: 'string',
          weight: {imperial: '1-2', metric: '1-2'},
          origin: 'string',
          life_span: '12',
          breed_group: 'string',
        }],
        categories: []
      },
      {
        id: '2',
        url: 'https://example.com/cat2.jpg',
        width: 600,
        height: 400,
        mime_type: 'image/jpeg',
        breeds: [{
          id: 2,
          name: 'string',
          weight: {imperial: '1-2', metric: '1-2'},
          origin: 'string',
          life_span: '12',
          breed_group: 'string', }],
        categories: []
      }
    ];

    component.catImages$ = of(mockCatImages);
    fixture.detectChanges();

    const images = fixture.nativeElement.querySelectorAll('app-cat-card');
    expect(images.length).toBe(2);
  });

});
