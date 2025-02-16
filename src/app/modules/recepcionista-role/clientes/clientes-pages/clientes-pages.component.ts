import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { Cliente } from '@core/models/cliente.model';
import { ClientesService } from '@core/services/recepcionista-role/clientes/clientes.service';
import { FormsModule } from '@angular/forms';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { RegistrarClienteComponent } from '../components/resgistrar-cliente/registrar-cliente/registrar-cliente.component';
import { Tooltip } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ModificarClienteComponent } from "../components/modificar-cliente/modificar-cliente/modificar-cliente.component";

@Component({
  selector: 'app-clientes-pages',
  imports: [
    FormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    CommonModule,
    InputIcon,
    IconField,
    RegistrarClienteComponent,
    TableModule,
    InputTextModule,
    IconField,
    InputIcon,
    ButtonModule,
    Tooltip,
    FormsModule,
    CommonModule,
    ToastModule,
    ConfirmDialog,
    ModificarClienteComponent
],
  templateUrl: './clientes-pages.component.html',
  styleUrl: './clientes-pages.component.css',
  providers: [ConfirmationService, MessageService],
})
export class ClientesPagesComponent implements OnInit {
  clientes: Cliente[] = [];
  showRegistrarDialog: boolean = false;
  showModificarDialog: boolean = false;
  clienteSeleccionado!: Cliente;
  globalFilterValue: string = '';

  constructor(
    private clientesService: ClientesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clientesService.getClientes().subscribe({
      next: (data: any) => {
        this.clientes = data.content;
      },
      error: (err) => {
        console.error('Error al cargar clientes', err);
      },
    });
  }

  clearFilters(dt: any): void {
    dt.reset();
    this.globalFilterValue = '';
  }

  // Función para clases de fila
  rowClass(cliente: any): string {
    return cliente.activo ? '' : 'inactive-row';
  }

  // Función para estilos de fila
  rowStyle(cliente: any): any {
    return cliente.activo == true ? { 'background-color': '#fff3cd' } : {};
  }

  confirmDelete(cliente: Cliente) {
    this.confirmationService.confirm({
      message: `¿Está seguro de que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      accept: () => {
        //this.deleteCliente(cliente.id);
      }
    });
  }

  // por implementar
  deleteCliente(id: string) {
    this.clientesService.deleteCliente(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Cliente eliminado', detail: 'El cliente fue eliminado exitosamente' });
        this.cargarClientes(); // Recargar la lista de clientes
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el cliente' });
      }
    });
  }
  openModificarDialog(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.showModificarDialog = true;
  }
}