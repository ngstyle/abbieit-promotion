import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import * as fs from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
declare const ExcelJS: any;

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  workbook: ExcelJS.Workbook;
  worksheet: any;

  constructor() { }

  export(type: string, fileName: string, header: any, data: any) {
    if (type === 'excel') {
      const workbook: ExcelJS.Workbook = this.createExcelData(header, data, fileName);
      workbook.xlsx.writeBuffer().then((blobData) => {
        const blob = new Blob([blobData], { type:  EXCEL_TYPE});
        fs.saveAs(blob, fileName + EXCEL_EXTENSION);
      });
    }
  }

  createExcelData(headers: any, data: any, fileName: any): ExcelJS.Workbook {

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    worksheet.columns = headers;
    this.setHeaderStyle(worksheet, headers);
    data.forEach(object => {
      worksheet.addRow(object);
    });
    return workbook;
  }

  setHeaderStyle(worksheet: any, headers: any) {

    const row = worksheet.getRow(1);
    let columnIndex = 1;

    headers.forEach(element => {
      const cell = row.getCell(columnIndex);
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '339933' }
      };
      columnIndex = columnIndex + 1;
    });
  }

}