import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MinisoService } from 'src/app/service/miniso.service';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-marchant-dialog',
  templateUrl: './marchant-dialog.component.html',
  styleUrls: ['./marchant-dialog.component.css']
})
export class MarchantDialogComponent implements OnInit {

  minisoShopForm: FormGroup;
  mobile: any;
  errorMsg = '';
  isValidMobile = false;
  selectedStore: any;
  stores: any;
  filteredShops: Observable<any[]>;
  public store: FormControl = new FormControl();
  done = false;

  constructor(
    private formBuilder: FormBuilder,
    private minisoService: MinisoService,
    public dialogRef: MatDialogRef<MarchantDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.mobile = data.mobile;
  }

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

    this.minisoShopForm.get('mobile').setValue(this.mobile);
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
      this.done = true;
      this.minisoShopForm.reset();
      this.minisoShopForm.clearValidators();
      setTimeout(() => {
        this.dialogRef.close('updated');
      }, 1000);
    }, error => {
      this.errorMsg = 'Not successfully used. Try again';
    });
  }

}
