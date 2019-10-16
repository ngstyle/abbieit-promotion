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

  constructor(private route: ActivatedRoute,
              private minisoService: MinisoService) {
    this.route.paramMap.subscribe(params => {
      this.coupon = params.get('coupon');
      this.value = this.coupon;
      this.isValid = true;
    });
  }

  ngOnInit() {
    if (this.coupon) {
      this.minisoService.coupon(this.coupon).subscribe(data => {
        const result: any = data;
        if (result.msg === '') {
          this.value = this.coupon;
          this.isValid = true;
        } else if (result.msg === 'invalidCoupon') {

        } else if (result.msg === 'used') {

        }
      });
    }
  }

}