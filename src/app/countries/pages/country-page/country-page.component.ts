import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

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
  private _router:Router;

  constructor(activatedRoute: ActivatedRoute, countriesService: CountriesService, router:Router){
    this._activatedRoute = activatedRoute;
    this._countriesService = countriesService;
    this._router = router;
  }

  /* Observable dentro de un observable porque para realizar uno se necesita la respuesta del anterior */
  public ngOnInit(): void {
    /* Se usaran metodo des rxjs porque es un observable y al ser observable se puede nusar pipe() */
    this._activatedRoute.params
    .pipe(
      /* switchMap recibe el valor anterior en este caso params, y el objetivo es que regrese un nuevo observable */
      switchMap(({id})=>this._countriesService.searchCountryByAlphaCode(id))
    )
    /* lo que se que regrese el switchMap es lo que le llega a este subscribe, en este caso el parametro es resp */
    .subscribe(country => {
      if(!country){
        return this._router.navigateByUrl('');;
      }
      console.log("Tenemos un país");
      return;
    });
  }
}
