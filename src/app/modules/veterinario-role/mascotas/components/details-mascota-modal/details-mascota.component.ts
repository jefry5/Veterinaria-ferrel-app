import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { Mascota } from '@core/models/mascota.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-mascota',
  imports: [Dialog, ButtonModule, InputTextModule, AvatarModule, DividerModule, CommonModule],
  templateUrl: './details-mascota.component.html',
})
export class DetailsMascotaComponent {
  @Input() visible: boolean = false;
  @Input() mascota: Mascota | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();

  closeDialog() {
    this.visibleChange.emit(false);
  }
}
