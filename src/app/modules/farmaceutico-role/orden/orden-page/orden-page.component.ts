import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { OrdenService } from '@core/services/farmaceutico-role/orden/orden.service';

interface Producto {
  id_producto: number;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
  subtotal?: number;
  tipo: string;
}

@Component({
  selector: 'app-orden-page',
  templateUrl: './orden-page.component.html',
  imports: [CommonModule, TableModule, ButtonModule, ConfirmDialogModule, MessagesModule],
  providers: [ConfirmationService, MessageService]
})
export class OrdenPageComponent {
  numeroOrden: string;
  fechaOrden: string;
  productosSeleccionados: Producto[] = [];
  subtotalGeneral: number = 0;
  igv: number = 0;
  total: number = 0;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private ordenService: OrdenService
  ) {
    this.numeroOrden = this.generarNumeroOrden();
    this.fechaOrden = new Date().toLocaleString();

    const productosGuardados = JSON.parse(localStorage.getItem('ordenPago') || '[]');
    this.productosSeleccionados = productosGuardados.map((producto: Producto) => ({
      ...producto,
      precio_unitario: producto.precio_unitario, // ✅ Asegurar que se mapea correctamente
      subtotal: producto.cantidad * producto.precio_unitario,
    }));

    this.calcularTotales();
  }

  generarNumeroOrden(): string {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  }

  calcularTotales() {
    this.subtotalGeneral = this.productosSeleccionados.reduce((acc, p) => acc + (p.subtotal || 0), 0);
    this.igv = this.subtotalGeneral * 0.18;
    this.total = this.subtotalGeneral + this.igv;
  }

  volverALista() {
    this.router.navigate(['/stock']);
  }

  cancelarOrden() {
    localStorage.removeItem('ordenPago');
    this.router.navigate(['/stock']);
  }

  confirmarOrden() {
    if (this.productosSeleccionados.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Orden Vacía',
        detail: 'No se puede generar una orden de compra vacía.',
      });
      setTimeout(() => {
        this.router.navigate(['/stock']);
      }, 1500);
      return;
    }

    this.confirmationService.confirm({
      message: '¿Está seguro de generar la orden de pago?',
      header: 'Confirmación',
      accept: () => {
        this.generarOrden();
        this.imprimirOrden();
      }
    });
  }

  generarOrden() {
    const idOrdenGenerado = Date.now(); // Genera un número único basado en el timestamp
  
    const orden = {
      id_orden: idOrdenGenerado,
      productos: this.productosSeleccionados.map(p => ({
        id_producto: p.id_producto,
        cantidad: p.cantidad,
        precio_unitario: p.precio_unitario,
        subtotal: p.cantidad * p.precio_unitario,
        producto_nombre: p.nombre,
        tipo: p.tipo
      })),
      total: this.total
    };
  
    this.ordenService.confirmarOrden(orden).subscribe({
      next: (response) => {
        // ✅ Guardar cada producto en la BD usando /api/ordenes/seleccionar
        this.productosSeleccionados.forEach(producto => {
          this.ordenService.seleccionarProducto(producto.id_producto, producto.cantidad).subscribe();
        });

        this.messageService.add({
          severity: 'success',
          summary: 'Orden Generada',
          detail: 'La orden de pago se ha generado correctamente.',
        });

        console.log('Orden generada:', response);
        localStorage.removeItem('ordenPago');

        setTimeout(() => {
          this.router.navigate(['/stock']);
        }, 1500);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo generar la orden, intenta nuevamente.',
        });
      }
    });
  }

  imprimirOrden() {
    setTimeout(() => {
      window.print();
    }, 500);
  }
}
