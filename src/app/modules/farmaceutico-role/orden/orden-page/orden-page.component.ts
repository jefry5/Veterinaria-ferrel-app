import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { OrdenService } from '@core/services/farmaceutico-role/orden/orden.service';
import { ProductoOrden } from '@core/models/producto-orden.model';
import { OrdenPago } from '@core/models/orden-pago.model';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-orden-page',
  templateUrl: './orden-page.component.html',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ConfirmDialogModule, MessageModule, ToastModule],
  providers: [ConfirmationService, MessageService]
})
export class OrdenPageComponent implements OnInit {
  numeroOrden: string = '';
  fechaOrden: string = '';
  productosSeleccionados: ProductoOrden[] = [];
  subtotalGeneral: number = 0;
  igv: number = 0;
  total: number = 0;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private ordenService: OrdenService
  ) {}

  ngOnInit(): void {
    this.numeroOrden = this.generarNumeroOrden();
    this.fechaOrden = new Date().toLocaleString();
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.ordenService.listarProductosSeleccionados().subscribe({
      next: (productos: ProductoOrden[]) => {
        this.productosSeleccionados = productos;
        this.calcularTotales();
      },
      error: (err) => {
        console.error("❌ Error al obtener productos seleccionados:", err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los productos de la orden.'
        });
      }
    });
  }

  //solo esta de adorno para la pagina
  generarNumeroOrden(): string {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  }

  calcularTotales() {
    this.subtotalGeneral = this.productosSeleccionados.reduce((acc, p) => acc + (p.subtotal || 0), 0);
    this.igv = this.subtotalGeneral * 0.18;
    this.total = this.subtotalGeneral + this.igv;
  }

  confirmarOrden(): void {
    if (this.productosSeleccionados.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Orden Vacía',
        detail: 'No se puede generar una orden sin productos.',
      });
      return;
    }

    this.confirmationService.confirm({
      message: '¿Está seguro de generar la orden de pago?',
      header: 'Confirmación',
      accept: () => {
        this.generarOrden();
      }
    });
  }

  generarOrden(): void {
    const orden: OrdenPago = {
      estado: "PENDIENTE",
      productos: this.productosSeleccionados,
      total: this.total
    };

    console.log('📢 Enviando orden a la API:', JSON.stringify(orden, null, 2));

    this.ordenService.confirmarOrden(orden).subscribe({
      next: (response) => {
        console.log('✅ Respuesta de la API:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Orden Generada',
          detail: 'La orden se generó exitosamente.',
        });

        setTimeout(() => {
          this.router.navigate(['/stock']);
        }, 1500);
      },
      error: (error) => {
        console.error('❌ Error al generar la orden:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo generar la orden, intenta nuevamente.',
        });
      }
    });
  }

  cancelarOrden(): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de cancelar la orden?',
      header: 'Confirmación',
      accept: () => {
        console.log("🛑 Cancelando orden en el backend...");
        
        this.ordenService.cancelarOrden().subscribe({
          next: (res) => {
            console.log("✅ Orden cancelada:", res);

            this.messageService.add({
              severity: 'error',
              summary: 'Orden Cancelada',
              detail: 'La orden ha sido cancelada correctamente.'
            });

            //en duda porque ya usa el endpoint para cancelar
            //limpiar productos seleccionados en localStorage
            localStorage.removeItem('ordenPago');

            //redirigir al usuario a la página de stock después de un pequeño delay
            setTimeout(() => {
              this.router.navigate(['/stock']);
            }, 1500);
          },
          error: (err) => {
            console.error("❌ Error al cancelar la orden:", err);

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo cancelar la orden, intenta nuevamente.'
            });
          }
        });
      }
    });
}
}
