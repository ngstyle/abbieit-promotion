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

  options = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    },
    {
      data: [855, 999, 1111, 1222, 1333, 1356, 1390],
      type: 'line'
    },
    {
      data: [999, 1000, 1345, 1543, 1589, 1688, 1700],
      type: 'line'
    },
    ]
  };

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
      this.pendingCouponTotal = result.pendingCouponTotal;
      this.scanPercentage = (parseFloat((this.scanTotal / this.registerTotal).toString()).toFixed(2));
      this.registartiontPercentage = (parseFloat((this.registerTotal / this.usedCouponTotal).toString()).toFixed(2));
    });
  }

}