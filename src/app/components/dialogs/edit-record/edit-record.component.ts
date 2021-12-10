import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { contentFill } from 'src/app/shared/helper';
import { Record } from 'src/app/shared/models';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css'],
})
export class EditRecordComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Record
  ) {}

  add!: boolean;
  expenceRecordTypes = ['Merchandise', 'Restock', 'Payment', 'Other'];
  incomeRecordTypes = ['Product Sale', 'Financing', 'Other'];

  editForm!: FormGroup;
  ngOnInit(): void {
    this.add = this.data.add;
    this.editForm = this.fb.group({
      type: [this.data.type, Validators.required],
      amount: [this.data.value, Validators.required],
      description: this.data.description,
      date: [this.data.date, Validators.required],
    });
  }

  contentFill = contentFill;
}
