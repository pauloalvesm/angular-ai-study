import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(private http: HttpClient) {}

  askAi(prompt: string): Observable<string> {
    const params = new HttpParams().set('prompt', prompt);
    return this.http.get(`${environment.apiUrl}/ask-ai`, {
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

    return this.http.get(`${environment.apiUrl}/recipe-creator`, {
      params,
      responseType: 'text',
    });
  }

  generateImage(
    prompt: string,
    quality: string = 'hd',
    n: number = 1,
  ): Observable<string[]> {
    const params = new HttpParams()
      .set('prompt', prompt)
      .set('quality', quality)
      .set('n', n.toString());

    return this.http.get<string[]>(`${environment.apiUrl}/generate-image`, { params });
  }

}
