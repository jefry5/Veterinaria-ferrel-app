import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { StockService } from '@core/services/farmaceutico-role/stock/stock.service';
import { SubscriptionService } from '@core/services/subscription-manager/subscription.service';
import { Router } from '@angular/router';
import { AgregarProductoModalComponent } from '../components/agregar-producto-modal/agregar-producto-modal.component';
import { Producto } from '@core/models/producto.model';

@Component({
  selector: 'app-stock-page',
  standalone: true,
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
  providers: [StockService],
})
export class StockPageComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  filteredProductos: Producto[] = [];
  globalFilterValue: string = '';
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
  }

  ngOnDestroy(): void {
    this.subscriptionService.clear();
  }

  cargarProductos(): void {
    this.stockService.listarProductos().subscribe({
      next: (resp: any) => {
        //duda: no se si ordenarlo ascendentemente desde un inicio o dejarlo como responda la api
        this.productos = resp.sort((a: Producto, b: Producto) => a.nombre.localeCompare(b.nombre));
        this.filteredProductos = [...this.productos];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los productos, intenta nuevamente.',
        });
      }
    });
  }
  
  abrirModal(producto: Producto) {
    this.productoSeleccionado = producto;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  actualizarStock() {
    this.cargarProductos(); //recargar lista de productos después de agregar
  }

  clearFilters(dt: Table): void {
    this.globalFilterValue = ''; 
    this.filteredProductos = [...this.productos]; 
    dt.reset(); 
  }
}