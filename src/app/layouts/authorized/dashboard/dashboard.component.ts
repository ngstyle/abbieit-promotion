import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/service/permission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private permissionService: PermissionService,
              private router: Router) {
    if (! this.permissionService.hasPermission('miniso_admin')) {
      this.router.navigate(['marchant']);
    }
  }

  ngOnInit() {
  }

}