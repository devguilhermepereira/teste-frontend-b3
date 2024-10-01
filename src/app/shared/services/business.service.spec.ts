import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BusinessService } from './business.service';
import { environment } from 'src/environments/environment';

describe('BusinessService', () => {
  let service: BusinessService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BusinessService]
    });

    service = TestBed.inject(BusinessService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get method and return data', () => {
    const mockData = [{ id: 1, name: 'Conta 1' }];

    service.get().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.url_api}contas`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData); // Simula a resposta da API
  });

  it('should call save method and return data', () => {
    const mockData = { success: true };

    service.save({}).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.url_api}contas`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData); // Simula a resposta da API
  });
});