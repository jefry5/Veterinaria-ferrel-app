import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HistoriaClinica } from '@core/models/historia.model';
import { Mascota } from '@core/models/mascota.model';
import { MessagesService } from '@core/services/message/messages.service';
import { SubscriptionService } from '@core/services/subscription-manager/subscription.service';
import { HistoriasService } from '@core/services/veterinario-role/historias/historias.service';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { DetailsHistoriaModalComponent } from './components/details-historia-modal/details-historia-modal.component';
import { ConfirmationsService } from '@core/services/message/confirmations.service';
import { FormHistoriaModalComponent } from './components/form-historia-modal/form-historia-modal.component';
import { FormMascotaModalComponent } from "../../../mascotas/components/form-mascota-modal/form-mascota-modal.component";

@Component({
  selector: 'app-historias-table',
  imports: [
    TableModule,
    InputTextModule,
    IconField,
    InputIcon,
    ButtonModule,
    Tooltip,
    FormsModule,
    DetailsHistoriaModalComponent,
    FormHistoriaModalComponent,
    CommonModule,
  ],
  templateUrl: './historias-table.component.html',
})
export class HistoriasTableComponent implements OnInit, OnDestroy {
  @Input() mascotaSelected: Mascota | null = null;
  @ViewChild('dt') dt!: Table;

  showDetailsHistory: boolean = false;
  showFormHistoria: boolean = false;
  isEditForm: boolean = false;
  mascotaId: number | null = null;
  selectedHistoria: HistoriaClinica | null = null;
  historiasData: HistoriaClinica[] = [];
  dataInicialHistoria: HistoriaClinica[] = [];
  globalFilterValue: string = '';

  constructor(
    private messagesService: MessagesService,
    private historiasService: HistoriasService,
    private subscriptionService: SubscriptionService,
    private confirmationsService: ConfirmationsService,
  ) { }

  ngOnInit(): void {
    this.getTableData();
  }

  ngOnDestroy(): void {
    this.subscriptionService.clear();
  }

  getTableData() {
    if (this.mascotaSelected && this.mascotaSelected.id !== undefined) {
      const sub = this.historiasService.getDataHistoriasMedicasMascota(this.mascotaSelected.id)
        .subscribe({
          next: (resp: any) => {
            this.historiasData = resp.historiales;
            this.dataInicialHistoria = [...this.historiasData];
          },
          error: () => {
            this.messagesService.errorMessage(
              'Algo salió mal',
              'No se pudo cargar los datos, por favor intentar de nuevo',
            );
          }
        });

      this.subscriptionService.add(sub);
    } else {
      this.messagesService.errorMessage(
        'Algo salió mal',
        'No se pudo cargar los datos de la mascota seleccionada, por favor intentar de nuevo',
      );
    }
  }

  getDetailsHistoria(id: string): void {
    const sub = this.historiasService.getDataHistoriaMedicaById(id)
      .subscribe({
        next: (resp: any) => {
          this.selectedHistoria = resp;
          this.showDetailsHistory = true;
        },
        error: () => {
          this.messagesService.errorMessage(
            'Algo salió mal',
            'No se pudo obtener los datos de la historia clinica, por favor intentar de nuevo',
          );
        }
      })

    this.subscriptionService.add(sub);
  }

  //Método encargado de agregar una historia a la tabla
  agregarHistoria(): void {
    this.mascotaId = this.mascotaSelected?.id ?? null;
    this.isEditForm = false;
    this.showFormHistoria = true;
  }

  //Método enecarga de editar los datos de una historia
  editarHistoria(id: string): void {
    const sub = this.historiasService.getDataHistoriaMedicaById(id)
      .subscribe({
        next: (resp: any) => {
          this.selectedHistoria = resp;
          this.isEditForm = true;
          this.showFormHistoria = true;
        },
        error: () => {
          this.messagesService.errorMessage(
            'Algo salió mal',
            'No se pudo obtener los datos de la historia, por favor intentar de nuevo',
          );
        }
      })

    this.subscriptionService.add(sub);
  }

  //Método encargado de eliminar los datos de una historia
  deleteMascota(id: string, event: Event): void {
    //Acción que procede a eliminar la historia
    const deleteAction = () => {
      this.historiasService.eliminarDataHistoriaMedicaById(id)
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
              'No se pudo eliminar los datos de la historia, por favor intentar de nuevo',
            );
          },
        });
    }

    //Dialogo de confirmación para eliminar a la mascota
    this.confirmationsService.eliminationConfirmationDialog(
      'Eliminar Historia',
      '¿Estas seguro de eliminar la historia médica?',
      deleteAction,
      event
    );
  }

  //Método encargado de eliminar los filtros de la tabla
  clearFilters(): void {
    this.historiasData = [...this.dataInicialHistoria];
    this.dt.reset();
  }
}
