import { MarchantDialogComponent } from './../shared/marchant-dialog/marchant-dialog.component';
import { ExportService } from './../../../service/export.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PermissionService } from 'src/app/service/permission.service';
import { Router } from '@angular/router';
import { MinisoService } from 'src/app/service/miniso.service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  filterValue: any;
  displayedColumns: string[] = ['name', 'mobile', 'store', 'isShop', 'shopTime', 'city', 'state', 'address', 'action'];

  exportHeader = [
    { header: 'Name', key: 'userName', checked: true },
    { header: 'Mobile', key: 'mobile', checked: true },
    { header: 'Store', key: 'shop', checked: true },
    { header: 'Coupon Used', key: 'couponUsed', checked: true },
    { header: 'Shop Time', key: 'shopTime', checked: true },
    { header: 'City', key: 'city', checked: true },
    { header: 'State', key: 'state', checked: true },
    { header: 'Address', key: 'address', checked: true },
  ];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;

  constructor(private permissionService: PermissionService,
    private router: Router,
    private minisoService: MinisoService,
    private exportService: ExportService,
    private matDialog: MatDialog) {
    if (!this.permissionService.isAdmin()) {
      this.router.navigate(['marchant']);
    }
  }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.minisoService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data as any);
      this.dataSource.paginator = this.paginator;
    });
  }

  export(type: string) {
    this.dataSource.filteredData.forEach(record => {
      record.couponUsed = record.isShop ? 'Yes' : 'No';
    });
    this.exportService.export(type, 'Report', this.exportHeader, this.dataSource.filteredData);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filteredData.forEach(record => {
      record.couponUsed = record.isShop ? 'Yes' : 'No';
    });
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filterValue = filterValue.trim().toLocaleLowerCase();
  }

  doUse(mobile: any) {
    const selectionExportRef = this.matDialog.open(MarchantDialogComponent, {
      width: '720px',
      data: {
        mobile
      },
      autoFocus: true
    });
    selectionExportRef.afterClosed().subscribe(result => {
      if (result === 'updated') {
        this.findAll();
      }
    });
  }

}