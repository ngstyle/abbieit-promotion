import { MinisoService } from './../../../service/miniso.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  value: any;
  coupon: any;
  discount: any = 100;
  minimumAmount: any = 1199;
  isValid = false;
  errorMsg: any = '';

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
  }

}