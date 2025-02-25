import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Cliente } from '@core/models/cliente.model';
import { Mascota } from '@core/models/mascota.model';
import { MessagesService } from '@core/services/message/messages.service';
import { SubscriptionService } from '@core/services/subscription-manager/subscription.service';
import { HistoriasService } from '@core/services/veterinario-role/historias/historias.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-mascotas-table',
  imports: [TableModule, DialogModule, ButtonModule],
  templateUrl: './mascotas-table.component.html',
})
export class MascotasTableComponent implements OnInit, OnDestroy {
  @Input() visible: boolean = false;
  @Input() clienteSelected: Cliente | null = null;
  @Output() selectedMacotaChange = new EventEmitter<Mascota | null>();
  @Output() visibleChange = new EventEmitter<boolean>();

  mascotasData: Mascota[] = [];
  selectedMascota: Mascota | null = null;

  constructor(private historiasService: HistoriasService, private messagesService: MessagesService, private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.getTableData();
  }

  ngOnDestroy(): void {
    this.subscriptionService.clear();
  }

  //Método encargado de obtener los datos de la tabla
  getTableData(): void {
    if (this.clienteSelected) {
      const sub = this.historiasService.getDataMascotasByCliente(this.clienteSelected.dni!)
        .subscribe({
          next: (resp: any) => {
            this.mascotasData = resp.mascotas;
          },
          error: () => {
            this.messagesService.errorMessage(
              'Algo salió mal',
              'No se pudo cargar los datos de mascotas, por favor intentar de nuevo',
            );
          }
        })
      this.subscriptionService.add(sub);
    } else {
      this.messagesService.errorMessage(
        'Algo salió mal',
        'No se pudo cargar al cliente seleccionado, por favor intentar de nuevo',
      );
    }
  }

  confirmarAction() {
    if (this.selectedMascota){
      this.selectedMacotaChange.emit(this.selectedMascota);
      this.closeDialog();
    }else{
      this.selectedMacotaChange.emit(null);
      this.messagesService.warningMessage(
        'Selección incompleta',
        'Por favor, seleccionar una mascota antes de continuar',
      );
    }
  }

  closeDialog(): void {
    this.visibleChange.emit(false);
  }
}
