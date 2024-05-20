import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private _httpClient: HttpClient;
  private _apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public searchCapital( term: string): Observable<Country[]>{
    /* Observable, y se realiza la petición http, en donde el get se le dice que retorna y al observable también*/
    /* Además hay que subscriberse a la respuesta, por que si no se susbcribe, se define pero no se ejecuta la petición*/
    return this._httpClient.get<Country[]>(`${this._apiUrl}/capital/${term}`);
  }
}
