import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MinisoService } from 'src/app/service/miniso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registration: FormGroup;
  message: any;
  isMessage = false;

  constructor(private formBuilder: FormBuilder,
              private minisoService: MinisoService,
              private route: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registration = this.formBuilder.group({
      userName: ['', Validators.compose([
                      Validators.required, Validators.maxLength(100), Validators.minLength(3)])],
      mobile: ['', Validators.compose([
                    Validators.required, Validators.maxLength(10), Validators.minLength(10),
                    Validators.pattern(/(\(?[0-9]{3}\)?-?\s?[0-9]{3}-?[0-9]{4})/)])],
    });
  }

  doRegister() {
    this.minisoService.registration(this.registration.value).subscribe(data => {
      const result: any = data;
      if (result.msg === 'alreadyExists') {
        this.message = 'Mobile is already registered.';
        this.registration.get('mobile').setValue('');
      } else {
        this.message = 'You are eligible to claim offer.';
      }
      this.isMessage = !this.isMessage;
    });
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  toggle() {
    this.isMessage = !this.isMessage;
    this.message = '';
    this.buildForm();
  }

}