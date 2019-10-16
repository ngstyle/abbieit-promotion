import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MinisoService } from 'src/app/service/miniso.service';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  isRegistered = false;
  scanId: any;
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  registration: FormGroup;
  message: any;
  otpMessage: any;
  isMessage = false;
  showOTP = false;
  optButtonLabel = 'Send OTP';
  optCount = 60;
  private geoCoder;
  interval: any;


  constructor(private formBuilder: FormBuilder,
    private minisoService: MinisoService,
    private mapsAPILoader: MapsAPILoader,
    private route: Router,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.showPosition(position);
        }, () => {
          const data: any = {};
          data.phoneDetail = this.deviceService.getDeviceInfo().userAgent;
          this.minisoService.scan(data).subscribe(result => {
            this.scanId = result;
          });
        });
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    });
    this.buildForm();
  }

  showPosition(position: any) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    this.geoCoder.geocode({ 'location': { lat: lat, lng: lng } }, (results, status) => {
      if (status === 'OK') {

        for (var j = 0; j < results.length; j++) {
          if (results[j].types[0] === 'locality') {
            break;
          }
        }
        if (results[0]) {
          const data: any = {};
          for (var i = 0; i < results[j].address_components.length; i++) {
            if (results[j].address_components[i].types[0] === 'locality') {
              data.city = results[j].address_components[i].long_name;
            }
            if (results[j].address_components[i].types[0] === 'administrative_area_level_1') {
              data.state = results[j].address_components[i].long_name;
            }
          }
          data.address = results[0].formatted_address;
          data.phoneDetail = this.deviceService.getDeviceInfo().userAgent;
          this.minisoService.scan(data).subscribe(result => {
            this.scanId = result;
          });
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  buildForm() {
    this.registration = this.formBuilder.group({
      userName: ['', Validators.compose([
        Validators.required, Validators.maxLength(100), Validators.minLength(3)])],
      mobile: ['', Validators.compose([
        Validators.required, Validators.maxLength(10), Validators.minLength(10),
        Validators.pattern(/(\(?[0-9]{3}\)?-?\s?[0-9]{3}-?[0-9]{4})/)])],
      otp: ['', Validators.compose([
        Validators.required, Validators.maxLength(6), Validators.minLength(6)])]
    });
  }

  doRegister() {
    const data = this.registration.value;
    data.phoneDetail = this.deviceService.getDeviceInfo().userAgent;
    data.scanId = this.scanId;
    this.minisoService.registration(this.registration.value).subscribe(d => {
      const result: any = d;
      if (result.msg === 'alreadyExists') {
        this.message = 'Mobile number is already registered.';
        this.registration.get('mobile').setValue('');
        this.otpMessage = '';
        this.isMessage = !this.isMessage;
        this.showOTP = !this.showOTP;
      } else if (result.msg === 'invalid otp') {
        this.otpMessage = '*Invalid OTP';
      } else {
        this.otpMessage = '';
        this.message = '';
        this.isRegistered = true;
        this.videoplayer.nativeElement.play();
      }
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

  sendOTP() {
    const data = this.registration.get('mobile').value;
    this.minisoService.sendOTP(data).subscribe(d => {
      const result: any = d;
      if (result === '') {
        this.showOTP = true;
        this.resendCount();
      } else {
        this.message = 'Mobile number is already registered.';
        this.registration.get('mobile').setValue('');
        this.otpMessage = '';
        this.isMessage = !this.isMessage;
        this.showOTP = false;
      }
    }, error => {
      alert('Error');
    });
  }

  resendCount() {
    this.optCount -= 1;
    if (this.optCount >= 0) {
      setTimeout(() => {
        this.optButtonLabel = this.optCount + ' Sec.';
        this.resendCount();
      }, 1000);
    } else {
      this.optCount = 60;
      this.optButtonLabel = 'Resend OTP';
   }
  }

}