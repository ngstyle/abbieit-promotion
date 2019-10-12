import { Observable } from 'rxjs';
import { MinisoService } from './../../../service/miniso.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {

  minisoShopForm: FormGroup;
  errorMsg = '';
  isValidMobile = false;
  selectedStore: any;
  stores: any;
  filteredShops: Observable<any[]>;
  public store: FormControl = new FormControl();

  @ViewChild('singleSelect') singleSelect: MatSelect;

  constructor(private formBuilder: FormBuilder,
    private minisoService: MinisoService,
    private router: Router) { }

  ngOnInit() {
    this.store.setValue('');
    this.buildForm();
    this.findAllStore();
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

  selectStore(store: any) {
    this.selectedStore = store;
  }

  displayStore(store: any) {
    return store ? store.shop : undefined;
  }

  findAllStore() {
    this.minisoService.findAllStore().subscribe(data => {
      this.stores = data;
      this.filteredShops = this.minisoShopForm.get('minisoShop').valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.shop),
          map(shop => shop ? this._filterShops(shop) : this.stores));
    });

    this.minisoShopForm.get('minisoShop').valueChanges.subscribe(data => {
      this.selectedStore = null;
    });
  }

  private _filterShops(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.stores.filter(store => store.shop.toLowerCase().indexOf(filterValue) === 0);
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
    const UseData = {
      minisoShop: this.selectedStore.shop,
      mobile: this.minisoShopForm.get('mobile').value,
    };
    this.minisoService.use(UseData).subscribe(data => {
      this.minisoShopForm.get('mobile').setValue('');
      this.minisoShopForm.get('userName').setValue('');
      this.errorMsg = 'Mobile is successfully used';
    }, error => {
      this.errorMsg = 'Not successfully used. Try again';
    });
  }

}
