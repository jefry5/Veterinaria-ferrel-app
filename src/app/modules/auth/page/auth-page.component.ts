import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { RolesService } from '@core/services/roles/roles.service';
import { LoadingService } from '@core/services/loading-page/loading.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import { MessagesService } from '@core/services/message/messages.service';
import { ErrorInterceptor } from '@core/interceptors/error/error.interceptor';
import { SideBarService } from '@core/services/side-bar/side-bar.service';
import { TokenService } from '@core/services/JWT/token.service';
import { finalize } from 'rxjs';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule, ToastModule, RippleModule, FormsModule, ReactiveFormsModule, Tooltip],
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  //Variables de control de la pantalla de carga y formulario
  isLoading: boolean = false;
  showPassword: boolean = false;
  user: string = '';
  pass: string = '';

  constructor(
    private router: Router,
    private rolesService: RolesService,
    private sidebarService: SideBarService,
    private loadingService: LoadingService,
    private messagesService: MessagesService,
    private authService: AuthService,
    private tokenService: TokenService,
  ) { }

  loginForm = new FormGroup({
    usuario: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  onSignIn(): void {
    //Verifica que el Login cumpla con el formato de validación
    if (this.loginForm.valid) {
      this.user = this.loginForm.controls['usuario'].value!.trim();
      this.pass = this.loginForm.controls['password'].value!.trim();

      //Muestra la pantalla de carga
      this.loadingService.show();

      //Se suscribe a la petición realizada en el servicio de login
      //Oculta la pantalla de carga cuando termina la petición
      this.authService.login(this.user, this.pass)
        .pipe(
          finalize(() => {
            this.loadingService.hide();
          }))
        .subscribe({
          next: (resp: any) => {
            this.initialConfigurationToken(resp.jwTtoken);
            this.router.navigate(['/home']);
          },
          error: () => {
            //Verifica que no sea un error de conexión y Muestra un mensaje de error cuando se hace un bad request.
            if (!ErrorInterceptor.isConnectionError) {
              this.messagesService.errorMessage(
                'Credenciales incorrectas',
                'El usuario y/o contraseña que ingresaste son incorrectos. Por favor, verifica tus datos e inténtalo de nuevo'
              );
            }
          }
        });
    } else {
      this.messagesService.warningMessage(
        'Campos requeridos',
        'Por favor, completa todos los campos obligatorios antes de continuar',
      );
    }
  }

  //Método que configura lo necesario para ir al menú principal
  private initialConfigurationToken(tokenAuth: string): void {
    //Se guarda el token recibido del servidor
    this.tokenService.saveToken(tokenAuth);

    //Se valida la autenticidad del token
    if (this.tokenService.isTokenValid()) {
      //Se guarda el role del token en el servicio de roles
      const tokenRole = this.tokenService.getRole() ?? '';
      this.rolesService.setRole(tokenRole);

      //Se utiliza el role guardado del servicio para establecerlo en el servicio del sidebar
      const role = this.rolesService.getRole() ?? '';
      this.sidebarService.setItems(role);
    }
  }
}
