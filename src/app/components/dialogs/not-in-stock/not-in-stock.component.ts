import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-not-in-stock',
  templateUrl: './not-in-stock.component.html',
  styleUrls: ['./not-in-stock.component.css'],
})
export class NotInStockComponent {
  constructor(public dialogRef: MatDialogRef<NotInStockComponent>) {}
}
