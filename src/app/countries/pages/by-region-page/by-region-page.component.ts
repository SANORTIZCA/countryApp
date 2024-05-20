import { Component } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent {
  public _countries: Country[] = [];
  private _countryService: CountriesService;

  constructor(countryService: CountriesService) {
    this._countryService = countryService;
  }

  searchByRegion(region: string): void {
    this._countryService.searchRegion(region).subscribe((countries) => {
      this._countries = countries;
    });
  }
}
