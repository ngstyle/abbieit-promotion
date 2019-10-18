import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-registartionDialog',
  templateUrl: './registartionDialog.component.html',
  styleUrls: ['./registartionDialog.component.css']
})
export class RegistartionDialogComponent implements OnInit {

  amount: any;
  constructor(public dialogRef: MatDialogRef<RegistartionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.amount = data.amount;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close('close');
  }

  close() {
    this.dialogRef.close();
  }
}
