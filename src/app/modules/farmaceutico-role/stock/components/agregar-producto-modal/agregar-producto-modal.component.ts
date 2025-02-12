import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-agregar-producto-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
  ],
  providers: [MessageService],
  templateUrl: './agregar-producto-modal.component.html',
})
export class AgregarProductoModalComponent {
  @Input() visible: boolean = false;
  @Input() producto: any | null = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onAgregar = new EventEmitter<{ producto: any; cantidad: number }>();

  cantidadSeleccionada: number = 1;

  constructor(private messageService: MessageService) {}

  ngOnChanges(): void {
    if (this.producto) {
      this.cantidadSeleccionada = 1;
    }
  }

  /********ojito */
  aumentarCantidad(): void {
    if (this.producto && this.cantidadSeleccionada < this.producto.stock) {
      this.cantidadSeleccionada++;
    }
  }

  disminuirCantidad(): void {
    if (this.cantidadSeleccionada > 1) {
      this.cantidadSeleccionada--;
    }
  }

  validarCantidad() {
    if (this.cantidadSeleccionada < 1) {
      this.cantidadSeleccionada = 1;
    } else if (this.producto && this.cantidadSeleccionada > this.producto.stock) {
      this.cantidadSeleccionada = this.producto.stock;
    }
  }

  agregarProducto() {
    if (!this.producto) return;

    if (this.cantidadSeleccionada < 1 || this.cantidadSeleccionada > this.producto.stock) {
      this.messageService.add({
        severity: 'error',
        summary: 'Cantidad inválida',
        detail: 'Selecciona una cantidad válida.',
      });
      return;
    }

    this.onAgregar.emit({
      producto: this.producto,
      cantidad: this.cantidadSeleccionada
    });

    this.onClose.emit();
  }
}