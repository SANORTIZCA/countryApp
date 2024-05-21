import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

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

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url: string = `${this._apiUrl}/alpha/${code}`;
    return this._httpClient.get<Country[]>(url)
      .pipe(
        /* Del arreglo countries que viene de Country[]  si es mayor a cero regresar el primero, si no regresar null*/
        map( countries => countries.length > 0 ? countries[0] : null ),
        catchError(() => of(null))
      );
  }

  public searchCapital(term: string): Observable<Country[]> {
    /* Observable, y se realiza la petición http, en donde el get se le dice que retorna y al observable también*/
    /* Además hay que subscriberse a la respuesta, por que si no se susbcribe, se define pero no se ejecuta la petición*/
    const url: string = `${this._apiUrl}/capital/${term}`;
    /* el método pipe de los observables que sirve para especificar diferentes operadores de rxjs, que son que con un flujo de datos podemos hacer lo que queramos con ese flujo. Entre estos operadores tenemos map(), tap()*/
    return this._httpClient.get<Country[]>(url).pipe(
      /* EL of sirve para construir rapidamente un obvservable dependiendo del argumento enviado, en este caso queremos que dependiendo de si sucede el error que regrese un nuevo observable que va a ser un array vacio */
      catchError(() => of([]))
    );
  }

  public searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this._apiUrl}/name/${term}`;
    return this._httpClient.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  public searchRegion(region: string): Observable<Country[]> {
    const url: string = `${this._apiUrl}/region/${region}`;
    return this._httpClient.get<Country[]>(url).pipe(catchError(() => of([])));
  }
}
