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
  noOfDays = 7;
  echartsIntance: any;

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

  onChartInit(ec) {
    this.echartsIntance = ec;
  }

  createChart(result: any) {

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
      toolbox: {
        show: true,
        feature: {
          myTool1: {
            show: true,
            title: '7 Days',
            icon: 'path://m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0',
            onclick: () => {
              this.noOfDays = 7;
              this.minisoDashboard();
            }
          },
          myTool2: {
            show: true,
            title: '15 Days',
            icon: 'path://m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0',
            onclick: () => {
              this.noOfDays = 15;
              this.minisoDashboard();
            }
          },
          myTool3: {
            show: true,
            title: '30 Days',
            icon: 'path://m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0"/><path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0',
            onclick: () => {
              this.noOfDays = 30;
              this.minisoDashboard();
            }
          },
        },
        tooltip: { // 和 option.tooltip 的配置项相同
          show: true,
          formatter: function (param) {
            return '<div>' + param.title + '</div>'; // 自定义的 DOM 结构
          },
          backgroundColor: '#222',
          textStyle: {
            fontSize: 12,
          },
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);' // 自定义的 CSS 样式
        }
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

    this.echartsIntance.setOption(this.options);
  }

  minisoDashboard() {

    this.options = {};

    this.minisoService.minisoDashboard(this.noOfDays).subscribe(data => {
      const result: any = data;
      this.scanTotal = result.scanTotal;
      this.registerTotal = result.registerTotal;
      this.usedCouponTotal = result.usedCouponTotal;
      this.pendingCouponTotal = result.totalPending;
      this.scanPercentage = this.getPercent(this.registerTotal, this.scanTotal);
      this.registartiontPercentage = this.getPercent(this.usedCouponTotal, this.registerTotal);

      this.createChart(result);
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