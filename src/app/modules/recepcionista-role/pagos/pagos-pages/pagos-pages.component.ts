import { Component, OnInit } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { PagosService } from '@core/services/recepcionista-role/pagos/pagos.service';
import { MessageService } from 'primeng/api';
import { InputNumber } from 'primeng/inputnumber';
import { AutoComplete } from 'primeng/autocomplete';


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
    DividerModule,
    InputNumber,
    AutoComplete

  ],
  templateUrl: './pagos-pages.component.html',
  styleUrl: './pagos-pages.component.css',
})
export class PagosPagesComponent implements OnInit{
  consulta: number | undefined
  id: number | undefined
  monto: number | undefined
  items: any[] = [];
  products: any[] = [];

  constructor(private pagosService: PagosService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    
  }

  buscar(){
    this.items =[12323]
  }

}
