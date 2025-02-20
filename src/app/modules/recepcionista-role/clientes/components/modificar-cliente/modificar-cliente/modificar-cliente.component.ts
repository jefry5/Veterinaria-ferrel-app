import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cliente } from '@core/models/cliente.model';
import { MessagesService } from '@core/services/message/messages.service';
import { ClientesService } from '@core/services/recepcionista-role/clientes/clientes.service';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-modificar-cliente',
  imports: [ButtonModule, Dialog, ReactiveFormsModule, CommonModule],
  templateUrl: './modificar-cliente.component.html',
  styleUrl: './modificar-cliente.component.css',
})
export class ModificarClienteComponent implements OnInit {

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() clienteModificado = new EventEmitter<void>();
  @Input() cliente!: Cliente;
  @Input() visible: boolean = false;
  public clienteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private messagesService: MessagesService,
  ) {
    
  }
  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    if (this.cliente) {
      this.clienteForm.patchValue({
        nombre: this.cliente.nombre,
        apellido: this.cliente.apellido,
        dni: this.cliente.dni,
        telefono: this.cliente.telefono,
        direccion: this.cliente.direccion,
        email: this.cliente.email,
      });
    }
  }

  ngOnChanges(): void {
    if (this.cliente) {
      this.clienteForm.patchValue({
        nombre: this.cliente.nombre,
        apellido: this.cliente.apellido,
        dni: this.cliente.dni,
        telefono: this.cliente.telefono,
        direccion: this.cliente.direccion,
        email: this.cliente.email,
      });
    }
  }

  closeDialog() {
    this.visibleChange.emit(false);
  }

  modificarCliente() {
    if (this.clienteForm.invalid) {
      // Marcar todos los controles para mostrar errores
      this.clienteForm.markAllAsTouched();
      return;
    }

    const formValue = this.clienteForm.value;
    const clienteModificado: Cliente = {
      ...this.cliente,
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      dni:formValue.dni, // convertir a número
      telefono: formValue.telefono.toString(), // asegurarse de que sea string
      direccion: formValue.direccion,
      email: formValue.email,
    };

    if (clienteModificado.id) {
      this.clientesService.updateCliente(clienteModificado, clienteModificado.id).subscribe({
        next: (response) => {
          // Manejar la respuesta exitosa
          this.messagesService.successMessage(
            'Cliente modificado',
            'El cliente se modificó exitosamente'
          );
          this.clienteModificado.emit();
          this.closeDialog();
        },
        error: (err) => {
          // Manejar el error
          this.messagesService.errorMessage(
            'Error al modificar cliente',
            'No se pudo modificar el cliente, por favor intentar de nuevo'
          );
        },
      });
    } else {
      // Manejar el caso en el que no hay id
      this.messagesService.errorMessage(
        'Error al modificar cliente',
        'No se pudo modificar el cliente, por favor intentar de nuevo'
      );
    }

  }
}