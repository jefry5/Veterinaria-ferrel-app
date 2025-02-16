import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
@Component({
  selector: 'app-registrar-cliente',
  imports: [ButtonModule, Dialog, ReactiveFormsModule, CommonModule],
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
  ) {}
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
      dni: Number(formValue.dni), // convertir a número
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
