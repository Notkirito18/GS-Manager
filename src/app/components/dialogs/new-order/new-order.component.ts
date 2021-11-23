import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { sizes, sweatColors, tshirtColors } from 'src/app/shared/constants';
import { Order } from 'src/app/shared/models';
import { capitalCase } from 'src/app/shared/helper';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {}

  chosenProduct!: 'sweat' | 'tshirt' | 'mug';

  newOrderForm!: FormGroup;

  ngOnInit(): void {
    this.newOrderForm = this.fb.group({
      color: '',
    });
  }

  sweatColors = sweatColors;
  tshirtColors = tshirtColors;
  sizes = sizes;
  capitalCase = capitalCase;
}
