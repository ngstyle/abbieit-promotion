import { MinisoService } from 'src/app/service/miniso.service';
import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/service/permission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalRegistartion: any;
  todayRegistartion: any;
  totalShop: any;
  todayShop: any;
  totalNotShop: any;
  todayNotShop: any;
  totalScan: any;
  todayScan: any;
  scanPercentage: any;
  registartiontPercentage: any;
  constructor(private permissionService: PermissionService,
              private router: Router,
              private minisoService: MinisoService) {
    if (!this.permissionService.isAdmin()) {
      this.router.navigate(['marchant']);
    }
  }

  ngOnInit() {
    this.minisoDashboard();
  }

  minisoDashboard() {
    this.minisoService.minisoDashboard().subscribe(data => {
      const result: any = data;
      this.totalRegistartion = result.userDashboard.totalRegistration;
      this.todayRegistartion = result.userDashboard.todayRegistration;
      this.totalShop = result.userDashboard.totalShop;
      this.todayShop = result.userDashboard.todayShop;
      this.totalNotShop = result.userDashboard.totalNotShop;
      this.todayNotShop = result.userDashboard.todayNotShop;
      this.totalScan = result.scanDashboard.overallTotal;
      this.todayScan = result.scanDashboard.todayTotal;
      this.scanPercentage = (parseFloat((this.totalScan / this.totalRegistartion).toString()).toFixed(2));
      this.registartiontPercentage = (parseFloat((this.totalRegistartion / this.totalShop).toString()).toFixed(2));
    });
  }

}