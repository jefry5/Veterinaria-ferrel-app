import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Producto } from '@core/models/producto.model';
import { ProductoOrden } from '@core/models/producto-orden.model';
import { OrdenService } from '@core/services/farmaceutico-role/orden/orden.service';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-agregar-producto-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, InputNumberModule, MessageModule, ToastModule],
  providers: [MessageService, OrdenService],
  templateUrl: './agregar-producto-modal.component.html',
})
export class AgregarProductoModalComponent {
  @Input() visible: boolean = false;
  @Input() producto: Producto | null = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onProductoAgregado = new EventEmitter<ProductoOrden>();

  cantidadSeleccionada: number = 1;

  constructor(private messageService: MessageService, private ordenService: OrdenService) {}

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

  validarCantidad(): boolean {
    if (!this.producto) return false;

    if (this.cantidadSeleccionada < 1 || this.cantidadSeleccionada > this.producto.stock) {
      this.messageService.add({
        severity: 'error',
        summary: 'Cantidad Inválida',
        detail: `La cantidad debe estar entre 1 y ${this.producto.stock}.`,
      });
      return false;
    }
    return true;
  }

  agregarProducto() {
    if (!this.validarCantidad() || !this.producto) return;
    
    this.ordenService.seleccionarProducto(this.producto.id_producto, this.cantidadSeleccionada).subscribe({
      next: (response: string) => {
        console.log('✅ Respuesta del backend:', response);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Producto agregado',
          detail: response
        });

        this.onProductoAgregado.emit();
        this.onClose.emit();
      },
      error: (error) => {
        console.error('❌ Error al agregar producto:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el producto, intenta nuevamente.'
        });
      }
    });
  }
}