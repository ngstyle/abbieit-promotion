import { Component, OnInit, ViewChild } from '@angular/core';
import { PermissionService } from 'src/app/service/permission.service';
import { Router } from '@angular/router';
import { MinisoService } from 'src/app/service/miniso.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  displayedColumns: string[] = ['name', 'mobile', 'store', 'isShop', 'shopTime', 'city', 'state', 'address'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;

  constructor(private permissionService: PermissionService,
              private router: Router,
              private minisoService: MinisoService) {
    if (!this.permissionService.isAdmin()) {
      this.router.navigate(['marchant']);
    }
  }

  ngOnInit() {
    this.minisoService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource<any>(data as any);
      this.dataSource.paginator = this.paginator;
    });
  }

}