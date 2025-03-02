import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'primeng/message';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cliente } from '@core/models/cliente.model';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ClientesService } from '@core/services/recepcionista-role/clientes/clientes.service';
import { CommonModule } from '@angular/common';
import { MessagesService } from '@core/services/message/messages.service';
import { InputTextModule } from 'primeng/inputtext';
import { EmailService } from '@core/services/email/email.service';
@Component({
  selector: 'app-registrar-cliente',
  imports: [ButtonModule, Dialog, ReactiveFormsModule, CommonModule, InputTextModule, Message],
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.css',
})
export class RegistrarClienteComponent implements OnInit {
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() clienteRegistrado = new EventEmitter<void>();
  @Input() visible: boolean = false;
  public clienteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private messagesService: MessagesService, // Usar para errores
    private emailService: EmailService,
  ) { }
  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  closeDialog() {
    this.visibleChange.emit(false);
    this.clienteForm.reset();
  }

  registrarCliente() {
    if (this.clienteForm.invalid) {
      // Marcar todos los controles para mostrar errores
      this.clienteForm.markAllAsTouched();
      return;
    }

    const formValue = this.clienteForm.value;
    // Transformar los datos al formato que requiere el servicio
    const nuevoCliente: Cliente = {
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      dni: formValue.dni, // convertir a número
      telefono: formValue.telefono.toString(), // asegurarse de que sea string
      direccion: formValue.direccion,
      email: formValue.correo, // renombrar "correo" a "email"
    };

    this.clientesService.postRegistrarCliente(nuevoCliente).subscribe({
      next: (response) => {
        // Manejar la respuesta exitosa
        this.messagesService.successMessage(
          'Cliente registrado',
          'El cliente se registró exitosamente',
        );
        this.clienteRegistrado.emit();
        const emailData = {
          user_email: nuevoCliente.email!,
          to_name: nuevoCliente.nombre! + ' ' + nuevoCliente.apellido!,
        }
        this.emailService.sendEmail(emailData).then(response => {
          this.messagesService.successMessage(
            'Correo enviado',
            'Se envío correo de bienvenida al cliente',
          );
        })
        .catch(error => {
          this.messagesService.errorMessage(
            'Error de envío de correo',
            'No se pudo envíar el correo de bienvenida, por favor intentar de nuevo',
          );
        })
        this.closeDialog();
      },
      error: (err) => {
        // Manejar el error
        this.messagesService.errorMessage(
          'Error al registrar cliente',
          'No se pudo registrar el cliente, por favor intentar de nuevo',
        );
      },
    });
  }
}
