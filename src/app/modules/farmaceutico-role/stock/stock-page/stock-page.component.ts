import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';

interface Producto {
  id: number;
  nombre: string;
  stock: number;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-stock-page',
  imports: [CommonModule, FormsModule, TableModule, InputTextModule, ButtonModule, RouterModule, MessageModule],
  templateUrl: './stock-page.component.html',
  providers: [MessageService]
})
export class StockPageComponent {
  productos: Producto[] = [
    { id: 1, nombre: 'Amoxicilina para Perro', stock: 20, precio: 15, cantidad: 0 },
    { id: 2, nombre: 'Amoxicilina para Gato', stock: 15, precio: 13, cantidad: 0 },
    { id: 3, nombre: 'Cefalexina', stock: 30, precio: 40, cantidad: 0 },
    { id: 4, nombre: 'Ivermectina', stock: 12, precio: 20, cantidad: 0 },
    { id: 5, nombre: 'Penicilina', stock: 12, precio: 60, cantidad: 0 }
  ];

  filteredProductos: Producto[] = [...this.productos];
  productosSeleccionados: Producto[] = [];

  constructor(private router: Router, private messageService: MessageService) {}

  filtrarTabla(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProductos = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(query)
    );

    this.messageService.clear();

    if (this.filteredProductos.length === 0) {
      this.messageService.add({
        key: 'mensajeBusqueda',
        severity: 'info',
        summary: 'Sin resultados',
        detail: '0 registros encontrados',
        life: 2000
      });
    }
  }

  aumentarCantidad(producto: Producto) {
    if (producto.cantidad < producto.stock) {
      producto.cantidad++;
      this.actualizarResumen();
    }
  }

  disminuirCantidad(producto: Producto) {
    if (producto.cantidad > 0) {
      producto.cantidad--;
      this.actualizarResumen();
    }
  }

  actualizarResumen() {
    this.productosSeleccionados = this.productos.filter(p => p.cantidad > 0);
  }

  irAOrdenPago() {
    localStorage.setItem('ordenPago', JSON.stringify(this.productosSeleccionados));
    this.router.navigate(['/orden']);
  }
}
