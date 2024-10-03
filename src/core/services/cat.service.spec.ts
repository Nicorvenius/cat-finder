import { TestBed } from '@angular/core/testing';
import { CatService } from './cat.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('CatService', () => {
  let service: CatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CatService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });

    service = TestBed.inject(CatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch images from the API', () => {
    const mockImages= [{
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
    }];

    service.fetchImages({ selectedBreed: null, resultLimit: 10, page: 1 }).subscribe(images => {
      expect(images.length).toBe(1);
      expect(images).toEqual(mockImages);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/v1/images/search?limit=10&breed_id=&has_breeds=true&page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockImages);
  });
});
