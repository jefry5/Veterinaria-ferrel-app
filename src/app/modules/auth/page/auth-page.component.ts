import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingPageComponent } from '../../../shared/components/loading-page/loading-page.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SideBarService } from '@core/services/side-bar/side-bar.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { RolesService } from '@core/services/roles/roles.service';
import { LoadingService } from '@core/services/loading-page/loading.service';

@Component({
  selector: 'app-auth-page',
  imports: [LoadingPageComponent, CommonModule, ToastModule, RippleModule],
  templateUrl: './auth-page.component.html',
  providers: [MessageService],
})
export class AuthPageComponent {
  isLoading: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sidebarService: SideBarService,
    private messageService: MessageService,
    private rolesService: RolesService,
    private loadingService: LoadingService,
  ) {}

  //Muestra un mensaje emergente en en lado inferior-derecho
  showBottomRight() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Message Content',
      key: 'br',
      life: 3000,
    });
  }

  onSignIn(): void {
    //Se almacena el rol del usuario
    const userRole: string = 'recepcionista';
    this.rolesService.setRole(userRole);

    //Verifica que el rol sea valido
    if (this.rolesService.isValidRole(userRole)) {
      //Entrega las opciones de menu según el rol
      this.sidebarService.setItems(userRole);

      //Activa la pantalla de carga y el cdr actualiza la IU
      this.isLoading = true;
      this.cdr.detectChanges();

      //Espera a que la API haya brindado los datos (por ahora es una simulación)
      setTimeout(() => {
        this.isLoading = false;
        this.cdr.detectChanges();

        this.router.navigate(['/home']);
      }, 1500);
    } else {
      //Por ahora no esta funcional debido a la forma que se maneja el form
      this.showBottomRight();
    }
  }
}
