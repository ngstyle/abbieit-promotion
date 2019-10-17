import { PermissionService } from 'src/app/service/permission.service';
import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/service/signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor(private signinService: SigninService,
              private router: Router,
              public permissionService: PermissionService) { }

  ngOnInit() {
  }

  logout() {
    this.signinService.doLogout();
    this.router.navigate(['signin']);
  }

}