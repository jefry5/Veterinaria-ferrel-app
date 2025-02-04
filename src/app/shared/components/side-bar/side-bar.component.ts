import { Component } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { SideBarService } from '@core/services/side-bar/side-bar.service';
import { RolesService } from '@core/services/roles/roles.service';

@Component({
  selector: 'app-side-bar',
  imports: [
    DrawerModule,
    ButtonModule,
    Tooltip,
    CommonModule,
    ToastModule,
    ConfirmPopupModule,
    RippleModule,
    DividerModule,
  ],
  templateUrl: './side-bar.component.html',
  providers: [ConfirmationService, MessageService],
})
export class SideBarComponent {
  sideBarItems: any[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private sidebarService: SideBarService,
    private rolesService: RolesService,
  ) {
    this.sideBarItems = this.sidebarService.items;
  }

  routeNavigate(route : string){
    this.router.navigate([`/${route}`]);
  }

  Logout(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estas seguro de cerrar sesión?',
      icon: 'fa fa-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sí',
      },
      accept: () => {
        this.sidebarService.clearItems();
        this.rolesService.clearRole();
        this.router.navigate(['/auth']);
      },
      reject: () => {},
    });
  }

  visible: boolean = false;
}
