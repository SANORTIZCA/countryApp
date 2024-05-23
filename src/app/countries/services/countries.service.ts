import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

/* estas interfaces se puede convertir en un archivo barril */
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private _httpClient: HttpClient;
  private _apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
    /* FromLocalStorage queremos que se ejecute cuando se inicializa el componente */
    this.loadFromLocalStorage();
  }

  private safeToLocalStorage(): void {
    /* en local storage solo se pueden guardar strings, con JSONstringify se pasa el cache storage a string */
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void {
    /* Primero se verifica si el localStorage tiene el elemento cacheStore */
    if (localStorage.getItem('cacheStore')) return;
    /* JSON.parse convierte de string de nuevo a nuestor objeto */
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this._httpClient.get<Country[]>(url).pipe(
      catchError(() => of([]))
      /* retrasa el flujo de información por 2 sec, puede servir para hacer un loading */
      //delay(2000),
    );
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url: string = `${this._apiUrl}/alpha/${code}`;
    return this._httpClient.get<Country[]>(url).pipe(
      /* Del arreglo countries que viene de Country[]  si es mayor a cero regresar el primero, si no regresar null*/
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  /* public searchCapital(term: string): Observable<Country[]> {
    bservable, y se realiza la petición http, en donde el get se le dice que retorna y al observable también
    Además hay que subscriberse a la respuesta, por que si no se susbcribe, se define pero no se ejecuta la petición
    const url: string = `${this._apiUrl}/capital/${term}`;
    el método pipe de los observables que sirve para especificar diferentes operadores de rxjs, que son que con un flujo de datos podemos hacer lo que queramos con ese flujo. Entre estos operadores tenemos map(), tap()
    return this._httpClient.get<Country[]>(url).pipe(
      EL of sirve para construir rapidamente un obvservable dependiendo del argumento enviado, en este caso queremos que dependiendo de si sucede el error que regrese un nuevo observable que va a ser un array vacio
      catchError(() => of([]))
    );
  } */
  public searchCapital(term: string): Observable<Country[]> {
    const url: string = `${this._apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url).pipe(
      /* El operador tab quiere decir que cuando venga un mensaje por el observable pasa por el tap ejecuta el tab, pero no influye en la emisión del observable. */
      tap((countries) => (this.cacheStore.byCapital = { term, countries })),
      tap(() => this.safeToLocalStorage())
    );
  }

  public searchCountry(term: string): Observable<Country[]> {
    const url: string = `${this._apiUrl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      /* El operador tab quiere decir que cuando venga un mensaje por el observable pasa por el tap ejecuta el tab, pero no influye en la emisión del observable. */
      tap((countries) => (this.cacheStore.byCountries = { term, countries })),
      tap(() => this.safeToLocalStorage())
    );
  }

  public searchRegion(region: Region): Observable<Country[]> {
    const url: string = `${this._apiUrl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      /* El operador tab quiere decir que cuando venga un mensaje por el observable pasa por el tap ejecuta el tab, pero no influye en la emisión del observable. */
      tap((countries) => (this.cacheStore.byRegion = { region, countries })),
      tap(() => this.safeToLocalStorage())
    );
  }
}
