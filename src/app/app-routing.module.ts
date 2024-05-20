import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

/* Routes se exporta de @angular/router */
const routes: Routes = [
  {
    /* Path, de el localhost:4200/home, pero sin el / entonces queda solo home */
    path: '',
    /* component: del componente que queremos renderizar */
    /* Cuando se coloca el component no hay lazyLoad */
    component: HomePageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },
  /* Para carga perezosa, lazyLoad o carga bajo demanda, se usa loadChildren, que en si misma es una promesa */
  /* primera parte del import es un path, de donde esta el modulo que quiere cargar pero de forma estatica */
  /* .then en el que queremos que de ese modulo, cargues el modulo.CountrisModule */
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then( module => module.CountriesModule)
  },
  {
    /* ** es comodín para decir cualquier ruta en donde el localhost:4200/ vaya vacio */
    path: '**',
    /* redirecTo: para que me lleve a la ruta que indique en este caso home */
    redirectTo: '',
  },
];

/* Si es el appRouting y es el principal se escribe RouterModule.forRoot(routes), ahí se envia routes que es la constante de arriba, cuando se trabaje en otros que no sea el principal se usa forChild */
@NgModule({
  imports:[
    RouterModule.forRoot(routes),
  ],
  /* Se exporta el RouterModule */
  exports:[
    RouterModule,
  ]
})

export class AppRoutingModule {

}
