import { MinisoService } from './../../../service/miniso.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {

  minisoShopForm: FormGroup;
  filteredShops: any;
  errorMsg = '';
  isValidMobile = false;
  public store: FormControl = new FormControl();

  @ViewChild('singleSelect') singleSelect: MatSelect;

  constructor(private formBuilder: FormBuilder,
              private minisoService: MinisoService,
              private router: Router) { }

  ngOnInit() {
    this.store.setValue('');
    this.buildForm();
    this.findAllStore();
    this.minisoShopForm.controls['userName'].disable();
  }

  buildForm() {
    this.minisoShopForm = this.formBuilder.group({
      userName: ['', Validators.required],
      minisoShop: ['', Validators.required],
      mobile: ['', Validators.compose([
        Validators.required, Validators.maxLength(10), Validators.minLength(10),
        Validators.pattern(/(\(?[0-9]{3}\)?-?\s?[0-9]{3}-?[0-9]{4})/)])],
    });

    this.minisoShopForm.get('mobile').valueChanges.subscribe(() => {
      this.minisoShopForm.get('userName').setValue('');
      this.errorMsg = '';
      this.isValidMobile = false;
      if (this.minisoShopForm.get('mobile').value.length === 10) {
        this.validateMobile();
      }
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
        this.errorMsg = result.error;
        this.isValidMobile = false;
      } else {
        this.minisoShopForm.get('userName').setValue(result.success);
        this.isValidMobile = true;
      }
    }, error => {
      this.isValidMobile = false;
    });
  }

  use() {
    this.minisoService.use(this.minisoShopForm.value).subscribe(data => {
      this.minisoShopForm.get('mobile').setValue('');
      this.errorMsg = 'Mobile is successfully used.';
    }, error => {
      this.errorMsg = 'Not successfully used. Try again.';
    });
  }

}
