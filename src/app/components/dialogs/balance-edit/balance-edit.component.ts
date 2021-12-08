import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { contentFill } from 'src/app/shared/helper';

@Component({
  selector: 'app-balance-edit',
  templateUrl: './balance-edit.component.html',
  styleUrls: ['./balance-edit.component.css'],
})
export class BalanceEditComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BalanceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  editForm!: FormGroup;
  ngOnInit(): void {
    this.editForm = this.fb.group({
      value: ['', Validators.required],
      description: '',
    });
  }

  contentFill = contentFill;
}
