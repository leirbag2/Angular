import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as fs from 'file-saver';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}
  async exportAsExcelFile(data: any[], excelFileName: string): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    worksheet.columns = Object.keys(data[0]).map((key) => ({
      header: key,
      key,
      width: this.getMaxColumnWidth(data, key),
    }));

    data.forEach((row) => {
      worksheet.addRow(row);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    this.saveAsExcelFile(buffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    fs.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  private getMaxColumnWidth(data: any[], column: string): number {
    const maxContentLength = Math.max(
      ...data.map((row) => row[column]?.toString().length || 0),
    );
    const maxHeaderLength = column.length;
    return Math.max(maxContentLength, maxHeaderLength) + 2;
  }
}
