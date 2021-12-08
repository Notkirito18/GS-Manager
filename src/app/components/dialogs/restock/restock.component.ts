import {
  AfterViewChecked,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  mugTypes,
  sizes,
  sweatColors,
  tshirtColors,
} from 'src/app/shared/constants';
import { capitalCase, colorer } from 'src/app/shared/helper';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.scss'],
})
export class RestockComponent implements OnInit, AfterViewChecked {
  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<RestockComponent>,
    private fb: FormBuilder
  ) {}

  chosenProduct!: 'sweat' | 'tshirt' | 'mug';
  restockForm!: FormGroup;
  restockMugsForm!: FormGroup;
  ngOnInit(): void {
    this.restockForm = this.fb.group({
      color: ['', Validators.required],
      size: ['', Validators.required],
      amount: ['', Validators.required],
      additionalProducts: this.fb.array([]),
      totalPrice: ['', Validators.required],
    });
    this.restockMugsForm = this.fb.group({
      mugType: ['', Validators.required],
      amount: ['', Validators.required],
      additionalProducts: this.fb.array([]),
      totalPrice: ['', Validators.required],
    });
  }

  get formArrayCtrl(): FormArray {
    return this.restockForm.get('additionalProducts') as FormArray;
  }
  get mugFormArrayCtrl(): FormArray {
    return this.restockMugsForm.get('additionalProducts') as FormArray;
  }

  addAnotherProduct(productType: 'sweat' | 'tshirt' | 'mug') {
    if (productType === 'mug') {
      this.mugFormArrayCtrl.push(
        this.fb.group({
          mugType: ['', Validators.required],
          amount: ['', Validators.required],
        })
      );
    } else {
      this.formArrayCtrl.push(
        this.fb.group({
          color: ['', Validators.required],
          size: ['', Validators.required],
          amount: ['', Validators.required],
        })
      );
    }
  }

  chooseProduct(product: 'sweat' | 'tshirt' | 'mug') {
    this.chosenProduct = product;
    this.restockForm.reset();
    this.restockMugsForm.reset();
    this.formArrayCtrl.controls = [];
    this.mugFormArrayCtrl.controls = [];
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  sizes = sizes;
  sweatColors = sweatColors;
  tshirtColors = tshirtColors;
  mugTypes = mugTypes;
  colorer = colorer;
  capitalCase = capitalCase;
}
