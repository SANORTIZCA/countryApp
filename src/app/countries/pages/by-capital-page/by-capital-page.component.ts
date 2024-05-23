import { Component, OnInit} from '@angular/core';

import { Country } from '../../interfaces/country.interface';

import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent implements OnInit {

  public _countries: Country[] = [];
  public _isLoading: boolean = false;
  public _initialValue: string = '';
  private _countryService: CountriesService;

  constructor(countryService: CountriesService) {
    this._countryService = countryService;
  }

  public ngOnInit(): void {
    this._countries = this._countryService.cacheStore.byCapital.countries
    this._initialValue = this._countryService.cacheStore.byCapital.term;
  }

  searchByCapital(term: string): void {
    this._isLoading = true;
    /* Hay que subscribirse al observable, y hacer función flecha para traer esos valores */
    this._countryService.searchCapital(term)
      .subscribe(countries => {
        this._countries = countries;
        this._isLoading = false;
      });
  }
}
