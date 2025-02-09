import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor() { }

  //Método que muestra la pantalla de carga
  show() : void {
    this.loadingSubject.next(true);
  }

  //Método que oculta la pantalla de carga
  hide() : void {
    this.loadingSubject.next(false);
  }
}
