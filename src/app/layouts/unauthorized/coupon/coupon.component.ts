import { BehaviorSubject, Observable } from 'rxjs';
import { MinisoService } from './../../../service/miniso.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  value: any;
  coupon: any;
  discount: any;
  minimumAmount: any;
  isValid = false;
  errorMsg: any = '';
  couponImage: any;

  private screenSize$ = new BehaviorSubject<number>(window.innerWidth);
  public imgWidth: number;
  public imgHeight: number;
  public confirmHeight: number;
  public confirmWidth: number;

  constructor(private route: ActivatedRoute,
              private minisoService: MinisoService) {
    this.route.paramMap.subscribe(params => {
      this.coupon = params.get('coupon');
    });
  }

  ngOnInit() {
    if (this.coupon) {
      this.minisoService.coupon(this.coupon).subscribe(data => {
        const result: any = data;
        if (result.msg === '') {
          this.value = this.coupon;
          this.isValid = true;
          this.discount = result.data.discount;
          this.minimumAmount = result.data.minimumAmount;
          this.errorMsg = '';
          this.couponImage = 'assets/images/svg/' + (result.data.discount === 200 ? 'coupon_200.svg' : result.data.discount === 100 
                                ? 'coupon_100.svg' : result.data.discount === 50 ? 'coupon_50.svg' : '');
        } else if (result.msg === 'invalid') {
          this.errorMsg = 'Invalid Coupon.';
          this.isValid = false;
        } else if (result.msg === 'used') {
          this.value = '';
          this.errorMsg = 'Coupon already used.';
          this.isValid = false;
        }
      });
    }
    this.getScreenSize().subscribe(width => {

      // if (window.innerWidth >= 500) {
      //   this.imgWidth = 500;
      //   this.imgHeight = 1107;
      //   this.confirmHeight = 40;
      //   this.confirmWidth = 20;
      // } else {
      //   this.imgWidth = window.innerWidth;
      //   this.imgHeight = 1107 * window.innerWidth / 500;
      // }

      if (window.innerWidth >= 500) {
        this.imgWidth = 500;

        if (window.innerHeight > 900) {
          this.imgHeight = 900;
        } else {
          this.imgHeight = window.innerHeight;
        }
      } else {
        this.imgWidth = window.innerWidth;
        this.imgHeight = 900 * window.innerWidth / 500;
        if (this.imgHeight > window.innerHeight) {
          this.imgHeight = window.innerHeight;
        }
      }

    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenSize$.next(event.target.innerWidth);
  }

  getScreenSize(): Observable<number> {
    return this.screenSize$.asObservable();
  }

}