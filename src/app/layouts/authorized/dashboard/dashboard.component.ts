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

  scanTotal: any;
  registerTotal: any;
  usedCouponTotal: any;
  pendingCouponTotal: any;
  scanPercentage: any;
  registartiontPercentage: any;
  options: any;

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
      this.scanTotal = result.scanTotal;
      this.registerTotal = result.registerTotal;
      this.usedCouponTotal = result.usedCouponTotal;
      this.pendingCouponTotal = result.totalPending;
      this.scanPercentage = this.getPercent(this.registerTotal, this.scanTotal);
      this.registartiontPercentage = this.getPercent(this.usedCouponTotal, this.registerTotal);


      this.options = {
        xAxis: {
          type: 'category',
          data: result.dayes
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          x: 'center',
          y: 'top',
          data: ['QR Code Scan', 'Registered', 'Coupon Used']
        },
        calculable: true,
        series: [{
          data: result.scanWeek,
          type: 'line',
          name: 'QR Code Scan'
        },
        {
          data: result.registerWeek,
          type: 'line',
          name: 'Registered'
        },
        {
          data: result.mysql,
          type: 'line',
          name: 'Coupon Used'
        }]
      };
    });
  }


  getPercent(num, total) {
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
      return '-';
    }
    return total <= 0 ? '0' : (Math.round(num / total * 10000) / 100.00);
  }

}