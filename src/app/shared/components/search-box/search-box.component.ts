import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  /* Un subject es un tipo especial de observable, al cual se puede subscribir, hacer pipes */
  private _debouncer: Subject<string> = new Subject<string>();
  /* Opcional porque en un punto del tiempo no tiene ninguna subscripción,
  Es decir cuando se monta el componente */
  private _debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public _initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  /* Siempre va despues del constructor */
  public ngOnInit(): void {
    /* con el debounce time lo que se espera es que cuando el usuario deje de escribir valores por x segundos se ejecute el subscribe */
    this._debouncerSubscription = this._debouncer
      .pipe(
        /* debounceTime: espera un tiempo para emitir la siguiente misión, pide 2 objetos, y uno es obligatorio */
        debounceTime(300)
      )
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  /* onDestroy, es un método que se va a llamar cuando la instancia de este componente va a ser destruida */
  /* Ayuda a mantener la memoria de los observables al minimo */
  /* Además es una parte del ciclo de vida de componentes en @angular */
  /* Cuando se cambia de ruta angular llama todos los ngOnDestroy para actualizar el componente */
  public ngOnDestroy(): void {
    /* Se manejara el unsubscribe de manera independiente */
    /* Esto se hace cada vez que se haya implementado un subscribe en un ngOnInit o en cualquier parte del componente que este escuchando cambios
    La única donde no se usa es cuando se hacen request http, lo que se usa de @angular/common porque ya viene una forma de cerrar esas subscripciones */
    this._debouncerSubscription?.unsubscribe();
  }
  public emitValue(value: string): void {
    this.onValue.emit(value);
  }

  public onKeyPress(searchTerm: string): void {
    /* next para mandar a hacer la siguiente misión del observable */
    this._debouncer.next(searchTerm);
  }
}
