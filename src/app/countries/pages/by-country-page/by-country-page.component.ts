import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent implements OnInit {
  public _countries: Country[] = [];
  private _countryService: CountriesService;
  public _initialValue: string = '';

  constructor(countryService: CountriesService) {
    this._countryService = countryService;
  }

  public ngOnInit(): void {
    this._countries = this._countryService.cacheStore.byCountries.countries;
    this._initialValue = this._countryService.cacheStore.byCountries.term;
  }

  searchByCountry(term: string): void {
    this._countryService.searchCountry(term).subscribe((countries) => {
      this._countries = countries;
    });
  }
}
