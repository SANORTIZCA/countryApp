import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit {
  /* Un subject es un tipo especial de observable, al cual se puede subscribir, hacer pipes */
  private _debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  /* Siempre va despues del constructor */
  public ngOnInit(): void {
    /* con el debounce time lo que se espera es que cuando el usuario deje de escribir valores por x segundos se ejecute el subscribe */
    this._debouncer
      .pipe(
        /* debounceTime: espera un tiempo para emitir la siguiente misión, pide 2 objetos, y uno es obligatorio */
        debounceTime(300)
      )
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  public emitValue(value: string): void {
    this.onValue.emit(value);
  }

  public onKeyPress(searchTerm: string): void {
    /* next para mandar a hacer la siguiente misión del observable */
    this._debouncer.next(searchTerm);
  }
}
