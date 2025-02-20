import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationsService {
  constructor(private confirmationService: ConfirmationService) { }

  //Método que muestra un confirm dialog para guardar un objeto
  guardarConfirmationDialog(titulo: string, mensaje: string, acceptAction: () => void, event: Event) {
    const icon: string = 'fa fa-check-circle';
    const acceptLabelButton: string = 'Guardar';
    const severityAcceptButton: string = 'success';

    this.confirmationDialogFormat(
      titulo,
      mensaje,
      icon,
      acceptLabelButton,
      severityAcceptButton,
      acceptAction,
      event
    )
  }

  //Método que muestra una confirm dialog para eliminar un objeto
  eliminationConfirmationDialog(titulo: string, mensaje: string, acceptAction: () => void, event: Event) {
    const icon: string = 'fa fa-exclamation-triangle';
    const acceptLabelButton: string = 'Eliminar';
    const severityAcceptButton: string = 'danger';

    this.confirmationDialogFormat(
      titulo,
      mensaje,
      icon,
      acceptLabelButton,
      severityAcceptButton,
      acceptAction,
      event
    )
  }

  //Método que presenta el formato de un confirm dialog para los diversos casos
  private confirmationDialogFormat(
    titulo: string,
    mensaje: string,
    icon: string,
    acceptButtonLabel: string,
    severityAcceptButton: string,
    acceptAction: () => void,
    event: Event
  ) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: titulo,
      message: mensaje,
      icon: icon,
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: acceptButtonLabel,
        severity: severityAcceptButton,
      },
      accept: () => {
        acceptAction();
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }
}
