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
import { DeleteMascotaComponent } from '../components/delete-mascota-modal/delete-mascota/delete-mascota.component';

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
    DeleteMascotaComponent,
    CommonModule
  ],
  templateUrl: './mascotas-page.component.html',
})
export class MascotasPageComponent implements OnInit, OnDestroy {
  mascotasData: Mascota[] = [];
  dataInicialMascota: Mascota[] = [];
  globalFilterValue: string = '';
  showDetailsMascota: boolean = false;
  showDeleteModal: boolean = false;
  selectedMascota: Mascota | null = null;
  selectedMascotaId: number | null = null;

  constructor(
    private mascotaService: MascotasService,
    private messagesService: MessagesService,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.getTableData();
  }

  ngOnDestroy(): void {
    this.subscriptionService.clear();
  }

  getTableData(): void {
    const sub = this.mascotaService.getDataMascota()
      .subscribe({
        next: (resp: any) => {
          this.mascotasData = resp.content;
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

  getDetailsMascota(id: string) {
    const sub = this.mascotaService.getDataDetailsMascota(id)
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

  deleteMascota(id: number): void{
    this.selectedMascotaId = id;
    this.showDeleteModal = true;
  }

  handleDeleteSuccess(): void {
    this.showDeleteModal = false;
    this.selectedMascotaId = null;
    this.getTableData();
  }

  clearFilters(dt: Table): void {
    this.mascotasData = [...this.dataInicialMascota];
    dt.reset();
  }
}
