import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  mugTypes,
  sizes,
  sweatColors,
  tshirtColors,
} from 'src/app/shared/constants';
import { Order } from 'src/app/shared/models';
import { capitalCase, colorer } from 'src/app/shared/helper';

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
  mugOrderForm!: FormGroup;
  withLogo = false;

  ngOnInit(): void {
    this.newOrderForm = this.fb.group({
      color: ['', Validators.required],
      size: ['', Validators.required],
      price: ['', Validators.required],
      withLogo: false,
      logoDes: '',
      logoImage: '',
    });
    this.mugOrderForm = this.fb.group({
      mugType: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      description: '',
    });
  }
  chooseProduct(product: 'sweat' | 'tshirt' | 'mug') {
    this.chosenProduct = product;
    this.newOrderForm.reset();
  }

  sweatColors = sweatColors;
  tshirtColors = tshirtColors;
  sizes = sizes;
  mugTypes = mugTypes;
  capitalCase = capitalCase;
  colorer = colorer;
}
