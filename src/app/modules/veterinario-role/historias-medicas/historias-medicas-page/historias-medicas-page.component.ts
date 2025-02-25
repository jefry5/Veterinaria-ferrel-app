import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '@core/models/cliente.model';
import { MessagesService } from '@core/services/message/messages.service';
import { ClientesService } from '@core/services/recepcionista-role/clientes/clientes.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Select } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { MascotasTableComponent } from '../components/mascotas-table/mascotas-table.component';
import { Mascota } from '@core/models/mascota.model';
import { HistoriasTableComponent } from '../components/historias-table/historias-table.component';
import { InputTextModule } from 'primeng/inputtext';
import { Image } from 'primeng/image';

@Component({
  selector: 'app-historias-medicas-page',
  imports: [
    FormsModule,
    Select,
    ReactiveFormsModule,
    ButtonModule,
    Tooltip,
    TableModule,
    DialogModule,
    MascotasTableComponent,
    HistoriasTableComponent,
    InputTextModule,
    Image,
    CommonModule
  ],
  templateUrl: './historias-medicas-page.component.html',
})
export class HistoriasMedicasPageComponent implements OnInit {
  clientes: Cliente[] = [];
  historiasForm: FormGroup;
  showTableHistoria: boolean = false;
  selectedMascota: Mascota | null = null;

  constructor(private clienteService: ClientesService, private messagesService: MessagesService) {
    this.historiasForm = new FormGroup({
      selectedCliente: new FormControl(null, [Validators.required])
    });

    //Detecta el cambio cuando se deselecciona un cliente y limpia la mascota seleccionada
    this.historiasForm.controls['selectedCliente'].valueChanges.subscribe((value) => {
      if (!value) {
        this.selectedMascota = null;
      }
    });
  }

  ngOnInit(): void {
    this.clienteService.getClientes()
      .subscribe({
        next: (resp: any) => {
          this.clientes = resp.map((cliente: { dni: string; nombre: string; apellido: string }) => ({
            ...cliente,
            fullName: `${cliente.dni} → ${cliente.nombre}`
          }));
        },
        error: () => {
          this.messagesService.errorMessage(
            'Error al cargar datos de clientes',
            'No se pudo cargar los datos de los clientes, por favor intentar de nuevo'
          );
        }
      });
  }

  getTableMascotas(): void {
    this.showTableHistoria = true;
  }

  getSelectedMascota(mascota: Mascota | null): void {
    this.selectedMascota = null;

    //Espera un ciclo del DOM para reiniciar la tabla
    setTimeout(() => {
      this.selectedMascota = mascota;
    }, 1);
  }
}
