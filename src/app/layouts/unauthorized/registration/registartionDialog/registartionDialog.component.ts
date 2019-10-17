import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-registartionDialog',
  templateUrl: './registartionDialog.component.html',
  styleUrls: ['./registartionDialog.component.css']
})
export class RegistartionDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RegistartionDialogComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close('close');
  }

}
