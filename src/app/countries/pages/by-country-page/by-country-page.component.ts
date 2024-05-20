import { Component } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent {

  public _countries: Country[] = [];
  private _countryService: CountriesService;

  constructor(countryService: CountriesService) {
    this._countryService = countryService;
  }

  searchByCountry(term: string): void {
    this._countryService.searchCountry(term).subscribe((countries) => {
      this._countries = countries;
    });
  }
}
