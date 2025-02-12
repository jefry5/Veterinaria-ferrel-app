import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { StockService } from '@core/services/farmaceutico-role/stock/stock.service';
import { SubscriptionService } from '@core/services/subscription-manager/subscription.service';
import { Router } from '@angular/router';
import { AgregarProductoModalComponent } from '../components/agregar-producto-modal/agregar-producto-modal.component';

interface Producto {
  id_producto: number;
  nombre: string;
  precio_unitario: number;
  stock: number;
  cantidad?: number;
}

@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    MessageModule,
    AgregarProductoModalComponent,
  ],
  providers: [MessageService],
})
export class StockPageComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  filteredProductos: Producto[] = [];
  globalFilterValue: string = '';
  productosSeleccionados: Producto[] = [];

  mostrarModal: boolean = false;
  productoSeleccionado: Producto | null = null;

  constructor(
    private stockService: StockService,
    private messageService: MessageService,
    private subscriptionService: SubscriptionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCarrito();
  }

  ngOnDestroy(): void {
    this.subscriptionService.clear();
  }

  cargarProductos(): void {
    const sub = this.stockService.getStockProductos().subscribe({
      next: (resp: any) => {
        this.productos = resp;
        this.filteredProductos = [...this.productos];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los productos, intenta de nuevo.',
        });
      },
    });

    this.subscriptionService.add(sub);
  }
  
  cargarCarrito(): void {
    const productosGuardados = JSON.parse(
      localStorage.getItem('ordenPago') || '[]',
    );
    this.productosSeleccionados = productosGuardados;
  }

  abrirModal(producto: Producto) {
    this.productoSeleccionado = producto;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  agregarProductoOrden(event: { producto: any; cantidad: number }) {
    const { producto, cantidad } = event;

    const productoExistente = this.productosSeleccionados.find(
      (p) => p.id_producto === producto.id_producto,
    );

    if (productoExistente) {
      productoExistente.cantidad = (productoExistente.cantidad || 0) + cantidad;
    } else {
      this.productosSeleccionados.push({ ...producto, cantidad: cantidad });
    }

    localStorage.setItem(
      'ordenPago',
      JSON.stringify(this.productosSeleccionados),
    );

    this.cerrarModal();
  }

  //********************************* */
  guardarCarrito() {
    localStorage.setItem(
      'ordenPago',
      JSON.stringify(this.productosSeleccionados),
    );
  }

  irAOrdenPago() {
    this.guardarCarrito();
    this.router.navigate(['/orden']);
  }
  /*************************************** */
  clearFilters(dt: any): void {
    this.globalFilterValue = '';
    this.filteredProductos = [...this.productos];
    dt.reset();
  }
}
