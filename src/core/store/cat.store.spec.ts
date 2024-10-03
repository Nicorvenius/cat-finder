import {TestBed, tick} from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import {delay, of, throwError} from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {CatService} from '../services/cat.service';
import {CatState, FetchCatImages} from './cat.store';
import {CatImageDTO} from '../dto/cat-image.dto';
import {provideHttpClient} from '@angular/common/http';

describe('CatState', () => {
  let store: Store;
  let catService: jasmine.SpyObj<CatService>;

  beforeEach(() => {
    const catServiceSpy = jasmine.createSpyObj('CatService', ['fetchImages', 'getBreeds']);

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CatState])],
      providers: [
        { provide: CatService, useValue: catServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    store = TestBed.inject(Store);
    catService = TestBed.inject(CatService) as jasmine.SpyObj<CatService>;
  });

  it('should fetch and store cat images', () => {
    const mockImages = [
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
    ];

    catService.fetchImages.and.returnValue(of(mockImages));

    store.dispatch(new FetchCatImages({ selectedBreed: null, resultLimit: 10, page: 1 }));

    const catImages = store.selectSnapshot(state => state.cat.catImages);
    expect(catImages).toEqual(mockImages);
    expect(catService.fetchImages).toHaveBeenCalledWith({ selectedBreed: null, resultLimit: 10, page: 1 });
  });

  it('should handle errors while fetching cat images', () => {
    const mockErrorText = 'Error occurred while fetching cat images';
    const errorInstance = new Error(mockErrorText);
    catService.fetchImages.and.returnValue(throwError(() => errorInstance));

    store.dispatch(new FetchCatImages({ selectedBreed: null, resultLimit: 10, page: 1 }));

    const error = store.selectSnapshot(state => state.cat.error);
    expect(error).toEqual(mockErrorText);
    expect(store.selectSnapshot(state => state.cat.loading)).toBeFalse();
  });

  it('should set loading to true when fetching cat images', () => {
    catService.fetchImages.and.returnValue(of([]).pipe(delay(500)));

    store.dispatch(new FetchCatImages({ selectedBreed: null, resultLimit: 10, page: 1 }));

    expect(store.selectSnapshot(state => state.cat.loading)).toBeTrue();
  });



  it('should handle empty results correctly', () => {
    catService.fetchImages.and.returnValue(of([]));

    store.dispatch(new FetchCatImages({ selectedBreed: null, resultLimit: 10, page: 1 }));

    const catImages = store.selectSnapshot(state => state.cat.catImages);
    expect(catImages.length).toEqual(0);
  });
});
