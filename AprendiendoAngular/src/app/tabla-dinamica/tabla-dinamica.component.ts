import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

import { InventarioService } from '../services/inventario.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import * as FileSaver from 'file-saver';
import { ExcelService } from '../services/excel.service';
interface Column {
  field: string;
  header: string;
  type: string;
}

@Component({
  selector: 'app-tabla-dinamica',
  standalone: true,
  imports: [
    TableModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './tabla-dinamica.component.html',
  styleUrl: './tabla-dinamica.component.css',
})
export class TablaDinamicaComponent {
  products: [] = [];
  cols: Column[] = [];
  filterFields: string[] = [];
  loading: boolean = true;
  width: string = '';
  selectedProducts!: [] | null;

  constructor(
    private inventarioService: InventarioService,
    private excelService: ExcelService,
  ) {}

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  ngOnInit() {
    this.inventarioService.getData('resumen').subscribe({
      next: (response) => {
        this.products = response;
        this.loading = false;
        console.log(this.products);
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.cols = [
      { field: 'bodega', header: 'Bodega', type: 'text' },
      { field: 'codigo_barra', header: 'Codigo Barra', type: 'text' },
      { field: 'producto', header: 'Producto', type: 'text' },
      { field: 'categoria', header: 'Categoria', type: 'text' },
      { field: 'stock_actual', header: 'Stock actual', type: 'numeric' },
    ];

    this.width = 100 / this.cols.length + '%';
    this.filterFields = this.cols.map((col) => col.field);
  }

  exportExcel() {
    const dataToExport =
      this.selectedProducts && this.selectedProducts.length > 0
        ? this.selectedProducts
        : this.products;
    this.excelService.exportAsExcelFile(dataToExport, 'Resumen Inventario');
  }
}
