import { MinisoService } from './../../../service/miniso.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {

  minisoShopForm: FormGroup;
  filteredShops: any;

  @ViewChild('singleSelect') singleSelect: MatSelect;

  constructor(private formBuilder: FormBuilder,
    private minisoService: MinisoService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.findAllStore();
    this.minisoShopForm.controls['userName'].disable();
  }


  buildForm() {
    this.minisoShopForm = this.formBuilder.group({
      userName: [''],
      shop: [''],
      mobile: ['', Validators.compose([
        Validators.required, Validators.maxLength(10), Validators.minLength(10),
        Validators.pattern(/(\(?[0-9]{3}\)?-?\s?[0-9]{3}-?[0-9]{4})/)])],
    });
  }

  findAllStore() {
    this.minisoService.findAllStore().subscribe(result => {
      this.filteredShops = result;
    });
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validateMobile() {
    const mobileNo = this.minisoShopForm.get('mobile').value;
    if (mobileNo === '') {
      return;
    }
    this.minisoService.validateMobile(mobileNo).subscribe(data => {
      const result: any = data;
      if (result.error) {
        this.minisoShopForm.get('mobile').setValue('');
      } else {
        this.minisoShopForm.get('userName').setValue(result.success);
      }
    }, error => {
    });
  }
}
