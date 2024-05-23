import { Component } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

/* Las interfaces/interface se pueden expandir los tipos/type no */
type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent {
  public _countries: Country[] = [];
  public _regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania',];
  private _countryService: CountriesService;
  /* ES opcional porque cuando se carga la región, no se tiene  opción */
  public _selectedRegion?: Region;

  constructor(countryService: CountriesService) {
    this._countryService = countryService;
  }

  searchByRegion(region: Region): void {
    this._selectedRegion = region;
    this._countryService.searchRegion(region).subscribe((countries) => {
      this._countries = countries;
    });
  }
}
