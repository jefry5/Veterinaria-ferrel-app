import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { Cliente } from '@core/models/cliente.model';
import { RadioButton } from 'primeng/radiobutton';
import { Razas } from '@core/constants/razas';
import { MessagesService } from '@core/services/message/messages.service';
import { MascotasService } from '@core/services/veterinario-role/mascotas/mascotas.service';
import { Mascota, FormularioMascota } from '@core/models/mascota.model';
import { Table } from 'primeng/table';
import { ClientesService } from '@core/services/recepcionista-role/clientes/clientes.service';

@Component({
  selector: 'app-form-mascota-modal',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    DividerModule,
    FormsModule,
    Select,
    RadioButton,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './form-mascota-modal.component.html',
})
export class FormMascotaModalComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() isEditMode: boolean = false;
  @Input() mascota: Mascota | null = null;
  @Input() listMascota: Mascota[] = [];
  @Input() listMascotaInicial: Mascota[] = [];
  @Input() table: Table | undefined;
  @Output() visibleChange = new EventEmitter<boolean>();

  clientes: Cliente[] = [];
  raza: { nombre: string }[] = [];

  mascotaForm: FormGroup;

  constructor(
    private messagesService: MessagesService, 
    private mascotaService: MascotasService, 
    private clienteService: ClientesService
  ) {
    this.mascotaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,30}$/)]),
      selectedRaza: new FormControl(null, [Validators.required]),
      edad: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
      sexo: new FormControl(null, [Validators.required]),
      peso: new FormControl(null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
      talla: new FormControl(null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
      selectedCliente: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.clienteService.getClientes()
      .subscribe({
        next: (resp: any) => {
          this.clientes = resp.map((cliente: { dni: string; nombre: string; apellido: string }) => ({
            ...cliente,
            fullName: `${cliente.nombre} ${cliente.apellido} →  ${cliente.dni}`
          }));
          if (this.mascota && this.isEditMode) {
            this.cargarDatosEnFormulario();
          }
        },
        error: () => {
          this.messagesService.errorMessage(
            'Error al cargar datos de clientes',
            'No se pudo cargar los datos de los clientes, por favor intentar de nuevo'
          );
        }
      });

    this.raza = Razas.perros.map(raza => ({ nombre: raza }));

  }

  private cargarDatosEnFormulario() {
    const cliente = this.mascota?.cliente;

    if (cliente) {
      this.clientes = this.clientes.map((cl) => ({
        ...cl,
        fullName: `${cl.nombre} ${cl.apellido} →  ${cl.dni}`
      }));


      //Selecciona el cliente asignado a la mascota
      const clienteSeleccionado = this.clientes.find(
        (cl) => cl.id === cliente.id
      );

      this.mascotaForm.patchValue({
        nombre: this.mascota?.nombre,
        selectedRaza: this.mascota?.raza,
        edad: this.mascota?.edad,
        sexo: this.mascota?.sexo,
        peso: this.mascota?.peso,
        talla: this.mascota?.talla,
        selectedCliente: clienteSeleccionado || null
      });
    }
  }

  agregarMascota(): void {
    if (this.mascotaForm.valid) {
      const registrarMascota: FormularioMascota = {
        nombre: this.mascotaForm.value.nombre,
        raza: this.mascotaForm.value.selectedRaza.nombre,
        edad: this.mascotaForm.value.edad,
        sexo: this.mascotaForm.value.sexo,
        peso: this.mascotaForm.value.peso,
        talla: this.mascotaForm.value.talla,
        clienteId: this.mascotaForm.value.selectedCliente.id,
      }

      this.mascotaService.postRegisterMascota(registrarMascota).subscribe({
        next: (resp: any) => {
          this.messagesService.successMessage(
            'Mascota Registrada',
            'La mascota se registró exitosamente'
          );
          const mascotaRegistrada: Mascota = resp;
          this.listMascota.push(mascotaRegistrada);
          this.listMascotaInicial.push(mascotaRegistrada);
          this.table?.reset();
        },
        error: () => {
          this.messagesService.errorMessage(
            'Algo salió mal',
            'No se pudo registrar los datos de la mascota, por favor intentar de nuevo'
          );
        }
      })
      this.closeDialog();
    } else {
      this.messagesService.warningMessage(
        'Campos inválidos o incompletos',
        'Por favor, completa todos los campos correctamente'
      );
    }
  }

  editarMascota(): void {
    if (this.mascotaForm.valid) {
      const editarMascota: FormularioMascota = {
        nombre: this.mascotaForm.value.nombre,
        raza: this.mascotaForm.value.selectedRaza.nombre,
        edad: this.mascotaForm.value.edad,
        sexo: this.mascotaForm.value.sexo,
        peso: this.mascotaForm.value.peso,
        talla: this.mascotaForm.value.talla,
        clienteId: this.mascotaForm.value.selectedCliente.id,
      }

      this.mascotaService.putEditMascota(this.mascota?.id!, editarMascota).subscribe({
        next: (resp: any) => {
          this.messagesService.successMessage(
            'Mascota Actualizada',
            'La mascota se editó exitosamente'
          );
          const mascotaEditada: Mascota = resp;
          const index = this.listMascota.findIndex(m => m.id === mascotaEditada.id);
          if (index !== -1) {
            this.listMascota[index] = mascotaEditada;
            this.listMascotaInicial[index] = mascotaEditada;
          }
          this.table?.reset();
        },
        error: () => {
          this.messagesService.errorMessage(
            'Algo salió mal',
            'No se pudo editar los datos de la mascota, por favor intentar de nuevo'
          );
        }
      })
      this.closeDialog();
    } else {
      this.messagesService.warningMessage(
        'Campos inválidos o incompletos',
        'Por favor, completa todos los campos correctamente'
      );
    }
  }

  closeDialog(): void {
    this.mascotaForm.reset();
    this.visibleChange.emit(false);
  }
}