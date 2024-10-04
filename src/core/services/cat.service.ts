import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { CatImageDTO } from "../dto/cat-image.dto";
import { environment } from "../../environments/environment";
import {CatBreedDTO} from '../dto/breed.dto';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private http: HttpClient) {}

  fetchImages(filters: { selectedBreed: string | null; resultLimit: number; page: number }): Observable<CatImageDTO[]> {
    const params = new HttpParams()
      .set('limit', filters.resultLimit.toString())
      .set('breed_id', filters.selectedBreed || '')
      .set('has_breeds', true)
      .set('page', filters.page.toString());

    return this.http.get<CatImageDTO[]>(`${environment.apiUrl}/v1/images/search`, {params});
  }


  getBreeds(): Observable<CatBreedDTO[]> {
    return this.http.get<CatBreedDTO[]>(`${environment.apiUrl}/v1/breeds`);
  }

}
