import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';

interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
  subtotal?: number;
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

  constructor(private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.numeroOrden = this.generarNumeroOrden();
    this.fechaOrden = new Date().toLocaleString();

    const productosGuardados = JSON.parse(localStorage.getItem('ordenPago') || '[]');
    this.productosSeleccionados = productosGuardados.map((producto: Producto) => ({
      ...producto,
      subtotal: producto.cantidad * producto.precio,
    }));

    this.calcularTotales();
  }

  generarNumeroOrden(): string {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  }

  calcularTotales() {
    this.subtotalGeneral = this.productosSeleccionados.reduce((acc, p) => acc + p.subtotal!, 0);
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
    console.log('Orden de pago generada');
    localStorage.removeItem('ordenPago');
    setTimeout(() => {
      this.router.navigate(['/stock']);
    }, 1000);
  }

  imprimirOrden() {
    setTimeout(() =>{
      window.print();
    }, 500);
  }
}
