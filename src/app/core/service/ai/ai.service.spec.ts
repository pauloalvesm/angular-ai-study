import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AiService } from './ai.service';
import { environment } from '../../../../environments/environment';

describe('AiService', () => {
  let service: AiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AiService]
    });
    service = TestBed.inject(AiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('askAi()', () => {
    it('should send a GET request to the correct URL with prompt parameter', () => {
      const mockPrompt = 'Hello AI';
      const mockResponse = 'Hello User';

      service.askAi(mockPrompt).subscribe(response => {
        expect(response).toBe(mockResponse);
      });

      const req = httpMock.expectOne(request =>
        request.url === `${environment.apiUrl}/ask-ai` &&
        request.params.get('prompt') === mockPrompt
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    // NEGATIVE SCENARIO: Server Error
    it('should return error when askAi API fails', () => {
      service.askAi('fail').subscribe({
        next: () => fail('should have failed with the 500 error'),
        error: (error) => {
          expect(error.status).toBe(500);
        }
      });

      const req = httpMock.expectOne(request => request.url === `${environment.apiUrl}/ask-ai`);
      req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('generateRecipe()', () => {
    it('should send a GET request with recipe parameters', () => {
      const ingredients = 'Eggs, Milk';
      const cuisine = 'French';
      const dietary = 'None';
      const mockResponse = 'Recipe: Omelette';

      service.generateRecipe(ingredients, cuisine, dietary).subscribe(response => {
        expect(response).toBe(mockResponse);
      });

      const req = httpMock.expectOne(request =>
        request.url === `${environment.apiUrl}/recipe-creator` &&
        request.params.get('ingredients') === ingredients &&
        request.params.get('cuisine') === cuisine &&
        request.params.get('dietaryRestrictions') === dietary
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should use default values for cuisine and dietaryRestrictions', () => {
      service.generateRecipe('Water').subscribe();

      const req = httpMock.expectOne(request =>
        request.params.get('cuisine') === 'any' &&
        request.params.get('dietaryRestrictions') === 'none'
      );
      req.flush('');
    });

    // NEGATIVE SCENARIO: Bad Request
    it('should return error when generateRecipe API fails', () => {
      service.generateRecipe('').subscribe({
        next: () => fail('should have failed with the 400 error'),
        error: (error) => {
          expect(error.status).toBe(400);
        }
      });

      const req = httpMock.expectOne(request => request.url === `${environment.apiUrl}/recipe-creator`);
      req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('generateImage()', () => {
    it('should return an array of strings (URLs)', () => {
      const prompt = 'Cyberpunk city';
      const mockResponse = ['url1.jpg', 'url2.jpg'];

      service.generateImage(prompt, 'hd', 2).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(response.length).toBe(2);
      });

      const req = httpMock.expectOne(request =>
        request.url === `${environment.apiUrl}/generate-image` &&
        request.params.get('prompt') === prompt &&
        request.params.get('quality') === 'hd' &&
        request.params.get('n') === '2'
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should return error when generateImage API fails', () => {
      service.generateImage('invalid').subscribe({
        next: () => fail('should have failed with the 404 error'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });

      const req = httpMock.expectOne(request => request.url === `${environment.apiUrl}/generate-image`);
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });
});
