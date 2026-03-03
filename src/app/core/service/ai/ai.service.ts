import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private readonly apiUrl = 'http://localhost:8080/ai';

  constructor(private http: HttpClient) {}

  askAi(prompt: string): Observable<string> {
    const params = new HttpParams().set('prompt', prompt);
    return this.http.get(`${this.apiUrl}/ask-ai`, {
      params,
      responseType: 'text',
    });
  }

  generateRecipe(
    ingredients: string,
    cuisine: string = 'any',
    dietaryRestrictions: string = 'none',
  ): Observable<string> {
    const params = new HttpParams()
      .set('ingredients', ingredients)
      .set('cuisine', cuisine)
      .set('dietaryRestrictions', dietaryRestrictions);

    return this.http.get(`${this.apiUrl}/recipe-creator`, {
      params,
      responseType: 'text',
    });
  }
}
