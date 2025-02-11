import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService implements OnDestroy{
  //Array de subscripciones
  private subscriptions: Subscription[] = [];

  //Método encargado de añadir una subscripción al array
  add(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  //Método encargado de limpiar las subscripciones del array
  clear(): void{
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  //Limpia automaticamente todas las subscripciones cuando el servicio de destruye
  ngOnDestroy(): void {
    this.clear();
  }
}