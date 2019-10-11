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
  constructor(private permissionService: PermissionService,
              private router: Router,
              private minisoService: MinisoService) {
    if (!this.permissionService.hasPermission('miniso_admin')) {
        this.router.navigate(['marchant']);
      }
    }

    ngOnInit() {
      this.minisoDashboard();
    }

    minisoDashboard() {
      this.minisoService.minisoDashboard().subscribe(data => {
        const result: any = data;
        this.totalRegistartion = result.userDashboard.todayRegistration + '/' + result.userDashboard.totalRegistration;
        this.todayRegistartion = result.userDashboard.todayRegistration;
        this.totalShop = result.userDashboard.todayShop + '/' + result.userDashboard.totalShop;
        this.todayShop = result.userDashboard.todayShop;
        this.totalNotShop = result.userDashboard.todayNotShop + '/' + result.userDashboard.totalNotShop;
        this.todayNotShop = result.userDashboard.todayNotShop;
        this.totalScan = result.scanDashboard.todayTotal + '/' + result.scanDashboard.overallTotal;
        this.todayScan = result.scanDashboard.todayTotal;
      });
    }

  }