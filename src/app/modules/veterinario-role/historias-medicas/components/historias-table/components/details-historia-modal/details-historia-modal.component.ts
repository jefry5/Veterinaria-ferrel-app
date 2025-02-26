import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { HistoriaClinica } from '@core/models/historia.model';
import { Mascota } from '@core/models/mascota.model';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-details-historia-modal',
  imports: [Dialog, ButtonModule, InputTextModule, AvatarModule, DividerModule, CommonModule, ScrollPanelModule],
  templateUrl: './details-historia-modal.component.html',
})
export class DetailsHistoriaModalComponent {
  @Input() visible: boolean = false;
  @Input() historia: HistoriaClinica | null = null;
  @Input() mascota: Mascota | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();

  closeDialog() {
    this.visibleChange.emit(false);
  }
}
