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
  editingMode = false;

  ngOnInit(): void {
    if (this.data.productType !== '') {
      this.editingMode = true;
      if (this.data.logoDescription !== 'no-logo') {
        this.withLogo = true;
      }
    }
    if (this.data.productType === '') {
      // new order
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
    } else if (this.data.productType === 'mug') {
      // editing mug
      this.chosenProduct = 'mug';
      this.newOrderForm = this.fb.group({
        color: ['', Validators.required],
        size: ['', Validators.required],
        price: ['', Validators.required],
        withLogo: false,
        logoDes: '',
        logoImage: '',
      });
      this.mugOrderForm = this.fb.group({
        mugType: [this.data.mugType, Validators.required],
        price: [this.data.price, Validators.required],
        image: [this.data.logoImages, Validators.required],
        description: this.data.logoDescription,
      });
    } else {
      // editing sweat/shirt
      this.data.productType === 'sweat'
        ? (this.chosenProduct = 'sweat')
        : (this.chosenProduct = 'tshirt');
      this.newOrderForm = this.fb.group({
        color: [this.data.color, Validators.required],
        size: [this.data.size, Validators.required],
        price: [this.data.price, Validators.required],
        withLogo: this.data.logoDescription !== 'no-logo' ? true : false,
        logoDes: this.data.logoDescription,
        logoImage: this.data.logoImages,
      });
      this.mugOrderForm = this.fb.group({
        mugType: ['', Validators.required],
        price: ['', Validators.required],
        image: ['', Validators.required],
        description: '',
      });
    }
  }
  chooseProduct(product: 'sweat' | 'tshirt' | 'mug') {
    if (!this.editingMode) {
      this.chosenProduct = product;
      this.newOrderForm.reset();
    } else {
      alert("You can't edit product type");
    }
  }

  logoToggle() {
    if (this.withLogo) {
      this.withLogo = false;
      //todo
    } else {
      this.withLogo = true;
    }
  }

  sweatColors = sweatColors;
  tshirtColors = tshirtColors;
  sizes = sizes;
  mugTypes = mugTypes;
  capitalCase = capitalCase;
  colorer = colorer;
}
