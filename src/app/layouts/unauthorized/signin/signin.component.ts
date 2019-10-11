import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as $ from 'jquery';
import { SigninService } from 'src/app/service/signin.service';
import { StorageService } from 'src/app/service/storage.service';
import { PermissionService } from 'src/app/service/permission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilding: FormBuilder,
              private singinService: SigninService,
              private storageServie: StorageService,
              private permissionService: PermissionService,
              private router: Router) { }

  ngOnInit() {

    this.loginForm = this.formBuilding.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    ($('.js-tilt') as any).tilt({
      scale: 1.1
    });

    const input = $('.validate-input .input100');
    $('.login-form').on('submit', () => {
      let check = true;

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < input.length; i++) {
        if (!this.validate(input[i])) {
          this.showValidate(input[i]);
          check = false;
        }
      }

      return check;
    });

    $('.login-form .input100').each(function() {
      $(this).focus(() => {
        $(this).parent().removeClass('alert-validate');
      });
    });

  }

  validate(input) {
    if ($(input).attr('type') === 'userName' || $(input).attr('name') === 'userName') {
      if (($(input).val() as string).trim() === '') {
        return false;
      }
    }
    if ($(input).attr('type') === 'password' || $(input).attr('password') === 'password') {
      if (($(input).val() as string).trim() === '') {
        return false;
      }
    }

    return true;
  }

  showValidate(input) {
    const thisAlert = $(input).parent();
    $(thisAlert).addClass('alert-validate');
  }

  signin() {
    if (this.loginForm.valid) {
      this.singinService.doLogin(this.loginForm.value).subscribe(data => {
        this.storageServie.setIdentity(data);
        if (this.permissionService.isAdmin()) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['marchant']);
        }
      }, error => {
        alert('Invalid Username/password');
        this.loginForm.reset();
      });
    }
  }

}
