import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatImage } from '../models/cat-image.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class CatImageService {
  private apiUrl = environment.apiBaseUrl + '/images/search';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  public getCatImages(breedId: string, limit: number): Observable<CatImage[]> {
    const url = `${this.apiUrl}?limit=${limit}&breed_ids=${breedId}&api_key=${this.apiKey}`;
    return this.http.get<CatImage[]>(url);
  }
}