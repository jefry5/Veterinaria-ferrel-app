import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Cliente } from '@core/models/cliente.model';
import { Mascota } from '@core/models/mascota.model';
import { ClientesService } from '@core/services/recepcionista-role/clientes/clientes.service';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-visualizar-cliente',
  imports: [Dialog, ButtonModule,CommonModule,CardModule],
  templateUrl: './visualizar-cliente.component.html',
  styleUrl: './visualizar-cliente.component.css',
})
export class VisualizarClienteComponent implements OnInit,OnChanges {
  @Input() cliente!: Cliente;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  mascotas: Mascota[] = [];

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.obtenerMascotasCliente();
    }
  }

  closeDialog() {
    this.visibleChange.emit(false);
  }

  obtenerMascotasCliente() {
    if (this.cliente && this.cliente.dni) {
      this.clientesService.getMascotasCliente(this.cliente.dni).subscribe({
        next: (data: any) => {
          this.mascotas = data.mascotas;
          console.log('Mascotas del cliente', this.mascotas);
        },
        error: (err) => {
          console.error('Error al cargar las mascotas del cliente', err);
        },
      });
    }
  }
}