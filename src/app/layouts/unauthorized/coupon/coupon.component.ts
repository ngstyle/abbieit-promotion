import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      alert(params.get('coupon'));
    });
  }

  ngOnInit() {
  }

}