import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { CommonModule, formatDate } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { HistoriaClinica } from '@core/models/historia.model';
import { Table } from 'primeng/table';
import { HistoriasService } from '@core/services/veterinario-role/historias/historias.service';
import { MessagesService } from '@core/services/message/messages.service';
import { tipoConsultas } from '@core/constants/tipoConsultas';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-form-historia-modal',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    DividerModule,
    FormsModule,
    Select,
    ReactiveFormsModule,
    TextareaModule,
    CommonModule
  ],
  templateUrl: './form-historia-modal.component.html',
})
export class FormHistoriaModalComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() isEditMode: boolean = false;
  @Input() historia: HistoriaClinica | null = null;
  @Input() mascotaId: number | null = null;
  @Input() listHistoria: HistoriaClinica[] = [];
  @Input() listHistoriaInicial: HistoriaClinica[] = [];
  @Input() table: Table | undefined;
  @Output() visibleChange = new EventEmitter<boolean>();

  historiaForm: FormGroup;
  fechaToday: Date = new Date();
  pselectTipoConsultas: { nombre: string }[] = [];

  constructor(
    private messagesService: MessagesService,
    private historiaService: HistoriasService,
  ) {
    this.historiaForm = new FormGroup({
      tipoConsulta: new FormControl(null, [Validators.required]),
      motivo: new FormControl('', [Validators.required]),
      temperatura: new FormControl(null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
      resumen: new FormControl('', [Validators.required]),
      receta: new FormControl(''),
      fecha: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.historiaForm.get('fecha')?.disable();
    const fechaFormateada = formatDate(this.fechaToday, 'dd/MM/yyyy', 'en-US');
    this.historiaForm.get('fecha')?.setValue(fechaFormateada);

    if (this.historia && this.isEditMode) {
      this.cargarDatosFormulario();
    }

    this.pselectTipoConsultas = tipoConsultas.consulta.map(tipoConsultas => ({ nombre: tipoConsultas }));
  }

  private formatoFecha(fechaISO: string): string {
    if (!fechaISO) return '';

    const [year, month, day] = fechaISO.split('-');
    return `${day}/${month}/${year}`;
  }

  private convertirFecha(fechastr: string) {
    const [dia, mes, año] = fechastr.split('/').map(Number);
    return new Date(año, mes - 1, dia);
  }


  private cargarDatosFormulario() {
    const fechaFormateada = this.formatoFecha(this.historia?.fecha?.split('T')[0] ?? '');

    this.historiaForm.patchValue({
      tipoConsulta: this.historia?.tipoconsulta,
      motivo: this.historia?.motivo,
      temperatura: this.historia?.temperatura,
      resumen: this.historia?.resumen,
      receta: this.historia?.receta,
      fecha: fechaFormateada,
    })
  }

  agregarHistoria() {
    if (this.historiaForm.valid) {
      const transformarFechaToIso = this.convertirFecha(this.historiaForm.get('fecha')?.value ?? '').toISOString();

      const agregarHistoria: HistoriaClinica = {
        tipoconsulta: this.historiaForm.controls['tipoConsulta'].value.nombre,
        motivo: this.historiaForm.get('motivo')?.value,
        temperatura: this.historiaForm.get('temperatura')?.value,
        resumen: this.historiaForm.get('resumen')?.value,
        receta: this.historiaForm.get('receta')?.value,
        fecha: transformarFechaToIso,
      }

      console.log(agregarHistoria);

      this.historiaService.registerDataHistoriaMedica(this.mascotaId!, agregarHistoria).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.messagesService.successMessage(
            'Historia Registrada',
            'La historia se registró exitosamente'
          );

          const historiaRegistrada: HistoriaClinica = resp;
          this.listHistoria.push(historiaRegistrada);
          this.listHistoriaInicial.push(historiaRegistrada);
          this.table?.reset();
        },
        error: () => {
          this.messagesService.errorMessage(
            'Algo salió mal',
            'No se pudo registrar los datos de la historia, por favor intentar de nuevo'
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

  editarHistoria() {
    if (this.historiaForm.valid) {
      const transformarFechaToIso = this.convertirFecha(this.historiaForm.get('fecha')?.value ?? '').toISOString();

      const editarMascota: HistoriaClinica = {
        tipoconsulta: this.historiaForm.get('tipoConsulta')?.value,
        motivo: this.historiaForm.get('motivo')?.value,
        temperatura: this.historiaForm.get('temperatura')?.value,
        resumen: this.historiaForm.get('resumen')?.value,
        receta: this.historiaForm.get('receta')?.value,
        fecha: transformarFechaToIso, 
      }

      this.historiaService.putDataHistoriaMedicaById(this.historia?.idhistorial!, editarMascota)
        .subscribe({
          next: (resp: any) => {
            this.messagesService.successMessage(
              'Historia Actualizada',
              'La historia se editó exitosamente'
            );
            const historiaEditada: HistoriaClinica = resp;
            const index = this.listHistoria.findIndex(m => m.idhistorial === historiaEditada.idhistorial);
            if (index !== -1) {
              this.listHistoria[index] = historiaEditada;
              this.listHistoriaInicial[index] = historiaEditada;
            }
            this.table?.reset();
          },
          error: (error) => {
            console.log(error);
            this.messagesService.errorMessage(
              'Algo salió mal',
              'No se pudo editar los datos de la historia, por favor intentar de nuevo'
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
    this.historiaForm.reset();
    this.visibleChange.emit(false);
  }
}