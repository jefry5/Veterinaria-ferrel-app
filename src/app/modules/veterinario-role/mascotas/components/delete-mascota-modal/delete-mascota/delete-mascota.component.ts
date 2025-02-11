import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessagesService } from '@core/services/message/messages.service';
import { ConfirmationService } from 'primeng/api';
import { MascotasService } from '@core/services/veterinario-role/mascotas/mascotas.service';

@Component({
  selector: 'app-delete-mascota',
  imports: [ConfirmDialog, ButtonModule, ToastModule],
  templateUrl: './delete-mascota.component.html',
})
export class DeleteMascotaComponent{
  @Input() mascotaId!: number;
  @Output() onDeleteSuccess = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private confirmationService: ConfirmationService, 
    private messagesService: MessagesService, 
    private mascotaService: MascotasService
  ) { }

  confirm() {
    if (this.mascotaId === null) return;

    this.confirmationService.confirm({
      header: '¿Estás seguro?',
      message: '¿Quieres eliminar esta mascota?',
      accept: () => {
        this.deleteMascota();
        this.onDeleteSuccess.emit();
      },
      reject: () => {
        setTimeout(() => this.close.emit(), 100);
      },
    });
  }

  deleteMascota(){
    this.mascotaService.deleteDataMascota(this.mascotaId)
    .subscribe({
      next: () => {
        this.messagesService.successMessage(
          'Mascota eliminada',
          'Se elimino la mascota exitosamente',
        );
      },
      error: () => {
        this.messagesService.errorMessage(
          'Algo salió mal',
          'No se pudo eliminar la mascota, por favor intentar de nuevo',
        );
      }
    })
  }
}