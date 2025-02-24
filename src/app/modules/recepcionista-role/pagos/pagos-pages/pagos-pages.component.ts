import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';


@Component({
  selector: 'app-pagos-pages',
  imports: [
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    ButtonModule,
    ButtonGroupModule,
    TableModule,
    FormsModule,
    DividerModule

  ],
  templateUrl: './pagos-pages.component.html',
  styleUrl: './pagos-pages.component.css',
})
export class PagosPagesComponent {
  dni: number | undefined
  id: number | undefined
  monto: number | undefined

  products: any[] = [];
}
