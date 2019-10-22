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

    if ($('#sparklinedash').length > 0) {
      ($('#sparklinedash') as any).sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
        type: 'bar',
        height: '20',
        barWidth: '3',
        resize: true,
        barSpacing: '3',
        barColor: '#4caf50'
      });
    }

    if ($('#sparklinedash2').length > 0) {
      ($('#sparklinedash2') as any).sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
        type: 'bar',
        height: '20',
        barWidth: '3',
        resize: true,
        barSpacing: '3',
        barColor: '#9675ce'
      });
    }

    if ($('#sparklinedash3').length > 0) {
      ($('#sparklinedash3') as any).sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
        type: 'bar',
        height: '20',
        barWidth: '3',
        resize: true,
        barSpacing: '3',
        barColor: '#03a9f3'
      });
    }

    if ($('#sparklinedash4').length > 0) {
      ($('#sparklinedash4') as any).sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
        type: 'bar',
        height: '20',
        barWidth: '3',
        resize: true,
        barSpacing: '3',
        barColor: '#f96262'
      });
    }
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
        // title: {
        //   text: 'Activity'
        // },
        tooltip: {
          trigger: 'axis'
        },
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
          name: 'QR Code Scan',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#4caf50',
              lineStyle: {
                color: '#4caf50'
              }
            }
          }
        },
        {
          data: result.registerWeek,
          type: 'line',
          name: 'Registered',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#9675ce',
              lineStyle: {
                color: '#9675ce'
              }
            }
          }
        },
        {
          data: result.usedCouponWeek,
          type: 'line',
          name: 'Coupon Used',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#03a9f3',
              lineStyle: {
                color: '#03a9f3'
              }
            }
          }
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