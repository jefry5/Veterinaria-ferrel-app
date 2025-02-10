import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-clientes-pages',
  imports: [
    BadgeModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule,
    ToolbarModule
  ],
  templateUrl: './clientes-pages.component.html',
  styleUrl: './clientes-pages.component.css',
  providers: [ConfirmationService, MessageService],
})
export class ClientesPagesComponent {
  filtrarTabla($event: Event) {}

 
  

  
  showDialog: boolean = false;

  // Datos de ejemplo mejor estructurados
  clientes: any[] = [
    {
      dni: '12345678',
      nombre: 'Juan',
      apellido: 'Pérez',
      numero: '123456789',

    },
    {
      dni: '87654321',
      nombre: 'María',
      apellido: 'Gómez',
      numero: '987654321',
    }
  ];

  // Función para determinar severidad del badge
  stockSeverity(
    cliente: any,
  ):
    | 'info'
    | 'success'
    | 'warn'
    | 'danger'
    | 'secondary'
    | 'contrast'
    | 'help'
    | 'primary' {
    // your logic here
    return 'info'; // replace with actual logic
  }

  // Función para clases de fila
  rowClass(cliente: any): string {
    // Ejemplo: Si está inactivo
    return cliente.activo ? '' : 'inactive-row';
  }

  // Función para estilos de fila
  rowStyle(cliente: any): any {
    // Ejemplo: Resaltar si tiene muchas llamadas
    return cliente.llamadas > 10 ? { 'background-color': '#fff3cd' } : {};
  }
}
