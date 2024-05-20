import { Component} from '@angular/core';

import { Country } from '../../interfaces/country.interface';

import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent {

  public _countries: Country[] = [];
  private _countryService: CountriesService;

  constructor(countryService: CountriesService) {
    this._countryService = countryService;
  }

  searchByCapital(term: string): void {
    /* Hay que subscribirse al observable, y hacer función flecha para traer esos valores */
    this._countryService.searchCapital(term)
      .subscribe(countries => {
        this._countries = countries;
      });
  }
}
