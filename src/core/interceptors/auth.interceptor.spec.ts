import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  const mockApiKey = 'test-api-key';

  beforeEach(() => {
    environment.apiKey = mockApiKey;

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting()
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add the x-api-key header to outgoing requests', () => {
    httpClient.get(`${environment.apiUrl}/v1/images/search`).subscribe();

    const httpRequest = httpMock.expectOne(`${environment.apiUrl}/v1/images/search`);
    expect(httpRequest.request.headers.has('x-api-key')).toBeTrue();
    expect(httpRequest.request.headers.get('x-api-key')).toBe(mockApiKey);

    httpRequest.flush({});
  });
});
