import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Mascota } from '@core/models/mascota.model';
import { MascotasService } from '@core/services/veterinario-role/mascotas/mascotas.service';
import { MessagesService } from '@core/services/message/messages.service';
import { SubscriptionService } from '@core/services/subscription-manager/subscription.service';
import { DetailsMascotaComponent } from '../components/details-mascota-modal/details-mascota.component';
import { ConfirmationsService } from '@core/services/message/confirmations.service';
import { FormMascotaModalComponent } from '../components/form-mascota-modal/form-mascota-modal.component';

@Component({
  selector: 'app-mascotas-page',
  imports: [
    TableModule,
    InputTextModule,
    IconField,
    InputIcon,
    ButtonModule,
    Tooltip,
    FormsModule,
    DetailsMascotaComponent,
    FormMascotaModalComponent,
    CommonModule
  ],
  templateUrl: './mascotas-page.component.html',
})
export class MascotasPageComponent implements OnInit, OnDestroy {
  mascotasData: Mascota[] = [];
  dataInicialMascota: Mascota[] = [];
  globalFilterValue: string = '';
  showDetailsMascota: boolean = false;
  showFormMascota: boolean = false;
  selectedMascota: Mascota | null = null;
  isEditForm: boolean = false;


  constructor(
    private mascotaService: MascotasService,
    private messagesService: MessagesService,
    private confirmationsService: ConfirmationsService,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.getTableData();
  }

  ngOnDestroy(): void {
    this.subscriptionService.clear();
  }

  //Método encargado de obtener los datos de la tabla
  getTableData(): void {
    const sub = this.mascotaService.getDataMascota()
      .subscribe({
        next: (resp: any) => {
          this.mascotasData = resp;
          this.dataInicialMascota = [...this.mascotasData];
        },
        error: () => {
          this.messagesService.errorMessage(
            'Algo salió mal',
            'No se pudo cargar los datos, por favor intentar de nuevo',
          );
        }
      })

    this.subscriptionService.add(sub);
  }

  //Método encargado de obtener los detalles de los datos de una mascota
  getDetailsMascota(id: string) {
    const sub = this.mascotaService.getDataDetailsMascota(Number(id))
      .subscribe({
        next: (resp: any) => {
          this.selectedMascota = resp;
          this.showDetailsMascota = true;
        },
        error: () => {
          this.messagesService.errorMessage(
            'Algo salió mal',
            'No se pudo obtener los datos de la mascota, por favor intentar de nuevo',
          );
        }
      })

    this.subscriptionService.add(sub);
  }

  //Método encargado de agregar una mascota a la tabla
  agregarMascota(): void {
    this.isEditForm = false;
    this.showFormMascota = true;
  }

  editarMascota(id: string): void {
    const sub = this.mascotaService.getDataDetailsMascota(Number(id))
      .subscribe({
        next: (resp: any) => {
          this.selectedMascota = resp;
          this.isEditForm = true;
          this.showFormMascota = true;
        },
        error: () => {
          this.messagesService.errorMessage(
            'Algo salió mal',
            'No se pudo obtener los datos de la mascota, por favor intentar de nuevo',
          );
        }
      })

    this.subscriptionService.add(sub);
  }

  //Método encargado de eliminar los datos de una mascota
  deleteMascota(id: number, event: Event): void {
    //Acción que procede a eliminar la mascota
    const deleteAction = () => {
      this.mascotaService.deleteDataMascota(id)
        .subscribe({
          next: () => {
            //Actualiza los datos de la tabla
            this.getTableData();
            this.messagesService.successMessage(
              'Eliminación exitosa',
              'Se realizó la eliminación de forma exitosa',
            );
          },
          error: () => {
            this.messagesService.errorMessage(
              'Algo salió mal',
              'No se pudo eliminar los datos de la mascota, por favor intentar de nuevo',
            );
          },
        });
    }

    //Dialogo de confirmación para eliminar a la mascota
    this.confirmationsService.eliminationConfirmationDialog(
      'Eliminar Mascota',
      '¿Estas seguro de eliminar la mascota?',
      deleteAction,
      event
    );
  }

  //Método encargado de eliminar los filtros de la tabla
  clearFilters(dt: Table): void {
    this.mascotasData = [...this.dataInicialMascota];
    dt.reset();
  }
}
