import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { nextStatus, productTypeBeautifier } from 'src/app/shared/helper';
import { Order } from 'src/app/shared/models';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css'],
})
export class ChangeStatusComponent {
  constructor(
    public dialogRef: MatDialogRef<ChangeStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {}

  nextStatus = nextStatus;
  productTypeBeautifier = productTypeBeautifier;
}
