import { MinisoService } from './../../../../service/miniso.service';
import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-registartionDialog',
  templateUrl: './registartionDialog.component.html',
  styleUrls: ['./registartionDialog.component.css']
})
export class RegistartionDialogComponent implements OnInit {

  amount: any;
  mobile: any;
  constructor(public dialogRef: MatDialogRef<RegistartionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private minisoService: MinisoService) {
    this.amount = data.amount;
    this.mobile = data.mobile;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close('close');
  }

  close() {
    this.dialogRef.close();
  }

  resendLink() {
    this.close();
    this.minisoService.resendLink(this.mobile).subscribe(data => {
    });
  }
}
