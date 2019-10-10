import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/service/permission.service';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  radius = 80;
  constructor(private permissionService: PermissionService,
              private router: Router,
              private deviceService: DeviceDetectorService) {
    if (! this.permissionService.hasPermission('miniso_admin')) {
      this.router.navigate(['marchant']);
    }

    if (this.deviceService.isMobile()) {
      this.radius = 40;
    }
  }

  ngOnInit() {
  }

}