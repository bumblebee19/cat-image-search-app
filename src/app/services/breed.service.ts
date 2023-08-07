import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Breed } from '../models/breed.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BreedService {

  private apiUrl = environment.apiBaseUrl + '/breeds';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  public getBreeds(): Observable<Breed[]> {
    const url = `${this.apiUrl}?api_key=${this.apiKey}`;
    return this.http.get<Breed[]>(url);
  }
}