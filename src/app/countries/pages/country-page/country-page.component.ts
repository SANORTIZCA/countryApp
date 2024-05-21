import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  /*
  observable: recomendación de usar
  activedRoute:
   */
  private _activatedRoute: ActivatedRoute;
  private _countriesService: CountriesService

  constructor(activatedRoute: ActivatedRoute, countriesService: CountriesService){
    this._activatedRoute = activatedRoute;
    this._countriesService = countriesService;
  }

  /* Observable dentro de un observable porque para realizar uno se necesita la respuesta del anterior */
  public ngOnInit(): void {
    this._activatedRoute.params
    .subscribe(({id}) => {
      this._countriesService.searchCountryByAlphaCode(id)
        .subscribe(country => {
          console.log({country});
        });
    });
  }


}
