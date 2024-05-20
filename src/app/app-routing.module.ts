import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';

/* Routes se exporta de @angular/router */
const routes: Routes = [
  {
    /* Path, de el localhost:4200/home, pero sin el / entonces queda solo home */
    path: 'home',
    /* component: del componente que queremos renderizar */
    component: HomePageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    /* ** es comodín para decir cualquier ruta en donde el localhost:4200/ vaya vacio */
    path: '**',
    /* redirecTo: para que me lleve a la ruta que indique en este caso home */
    redirectTo: 'home',
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
