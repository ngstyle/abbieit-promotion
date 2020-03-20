import { RegistartionDialogComponent } from './registartionDialog/registartionDialog.component';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MinisoService } from 'src/app/service/miniso.service';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  scanId: any;
  @ViewChild('videoPlayer', { static: true }) videoplayer: ElementRef;
  registration: FormGroup;
  message: any;
  otpMessage: any;
  isMessage = false;
  showOTP = false;
  optButtonLabel = 'Send OTP';
  optCount = 60;
  private geoCoder;
  interval: any;
  isSubmit = false;

  addressInfo: string;
  submitted = false;

  private screenSize$ = new BehaviorSubject<number>(window.innerWidth);
  public imgWidth: number;
  public imgHeight: number;
  public imgSrc: string;

  constructor(private formBuilder: FormBuilder,
    private minisoService: MinisoService,
    private mapsAPILoader: MapsAPILoader,
    private route: Router,
    private deviceService: DeviceDetectorService,
    private matDialog: MatDialog,
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
          // this.minisoService.scan(data).subscribe(result => {
          //   this.scanId = result;
          // });
        });
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    });

    $('.ui.radio.checkbox').checkbox();
    $('.ui.selection.dropdown').dropdown({
      onChange: (value, text, $selectedItem) => {
        this.registration.patchValue({
          interested: value
        });
      }
    });
    ($('#date_calendar') as any).calendar({
        type: 'date',
        onSelect: (date,mode) => {
          // console.log(date.toLocaleDateString());
          this.registration.patchValue({
            date: date.toLocaleDateString()
          });
        }
    });

    this.buildForm();

    this.getScreenSize().subscribe(width => {

      // if (window.innerWidth > 500) {
      //   this.imgWidth = 500;
      //   this.imgHeight = 1107;
      // } else {
      //   this.imgWidth = window.innerWidth;
      //   this.imgHeight = 1107 * window.innerWidth / 500;
      // }

      if (window.innerWidth <= 768) {
        // phone 1842*1711
        this.imgSrc = "/assets/images/Hyundai_phone.jpg";
        this.imgWidth = window.innerWidth;
        this.imgHeight = 1711 * this.imgWidth / 1842;
      } else if (window.innerWidth <= 1842) {
        // web 1  1860*540
        // 显示大图，且占据屏宽
        this.imgSrc = "/assets/images/Hyundai_web.jpg";
        this.imgWidth = window.innerWidth;
        this.imgHeight = 540 * this.imgWidth / 1842;
      } else {
        // window.innerWidth > 1842
        // 显示大图，图片居中显示
        this.imgSrc = "/assets/images/Hyundai_web.jpg";
        this.imgWidth = 1842;
        this.imgHeight = 540;
      }


    });

    // this.registration.get('otp').valueChanges.subscribe(data => {
    //   this.otpMessage = '';
    // });
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


          this.addressInfo = results[0].formatted_address;
          // this.minisoService.scan(data).subscribe(result => {
          //   this.scanId = result;
          // });
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
      gender: ['Male', Validators.required],
      userName: ['', Validators.compose([
        Validators.required, Validators.maxLength(100), Validators.minLength(3)])],
      email: ['', Validators.compose(
        [Validators.required,Validators.maxLength(100),
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      mobile: ['', Validators.compose([
        Validators.required, Validators.maxLength(10), Validators.minLength(10),
        Validators.pattern(/(\(?[0-9]{3}\)?-?\s?[0-9]{3}-?[0-9]{4})/)])],
      interested: ['Venue', Validators.required],
      date: ['', Validators.required],
      vehicle: [''],
      comments: [''],
    });
  }

  submitDialog(link: any, amount: any, mobile: any, counter: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    const dialogRef = this.matDialog.open(RegistartionDialogComponent, {
      width: '90vw',
      data: {
        amount,
        mobile,
        counter
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.open(link, '_self');
      } else {
        this.registration.reset();
        this.registration.clearValidators();
        this.optButtonLabel = 'Send OTP';
        this.route.navigate(['/registration']);
      }
    });
  }

  doRegister() {
    const data = this.registration.value;
    data.phoneDetail = this.deviceService.getDeviceInfo().userAgent;
    data.address = this.addressInfo;

    console.log(data);

    // success show successful page, otherwise try again.


    // data.scanId = this.scanId;
    // this.isSubmit = true;
    // this.minisoService.registration(this.registration.value).subscribe(d => {
    //   this.isSubmit = false;
    //   const result: any = d;
    //   if (result.msg === 'alreadyExists') {
    //     this.message = 'Mobile number is already registered.';
    //     this.registration.get('mobile').setValue('');
    //     this.otpMessage = '';
    //     this.submitDialog(null, null,  result.mobile, result.counter);
    //     this.optCount = -1;
    //     this.optButtonLabel = 'Send OTP';
    //   } else if (result.msg === 'invalid otp') {
    //     this.otpMessage = '*Invalid OTP';
    //   } else {
    //     this.otpMessage = '';
    //     this.optCount = -1;
    //     this.optButtonLabel = 'Send OTP';
    //     this.registration.reset();
    //     this.registration.clearValidators();
    //     this.submitDialog(result.link, result.amount, result.mobile, result.counter);
    //     this.optCount = -1;
    //     this.optButtonLabel = 'Send OTP';
    //   }
    // }, error => {
    //   this.isSubmit = false;
    // });
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
    this.optButtonLabel = 'Send OTP';
    this.buildForm();
  }

  sendOTP() {
    this.resendCount();
    const data = this.registration.get('mobile').value;
    this.minisoService.sendOTP(data).subscribe(d => {
      const result: any = d;
      if (result.msg === '') {
        this.showOTP = true;
      } else {
        this.optCount = -1;

        this.optButtonLabel = 'Send OTP';
        this.message = 'Mobile number is already registered.';
        this.registration.get('mobile').setValue('');
        this.submitDialog(null, null, data, result.counter);
        this.otpMessage = '';
        this.isMessage = !this.isMessage;
        this.showOTP = false;
      }
    }, error => {
      alert('Server error.Please try again');
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenSize$.next(event.target.innerWidth);
  }

  getScreenSize(): Observable<number> {
    return this.screenSize$.asObservable();
  }

}
