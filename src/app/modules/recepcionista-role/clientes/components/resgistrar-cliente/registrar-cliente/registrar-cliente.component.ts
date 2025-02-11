import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Cliente } from '@core/models/cliente.model';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-registrar-cliente',
  imports: [ButtonModule, Dialog],
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.css',
})
export class RegistrarClienteComponent {
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() visible: boolean = false;
  @Input() cliente: Cliente | null = null;

  closeDialog() {
    this.visibleChange.emit(false);
  }
}
