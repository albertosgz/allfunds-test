import { Component, Input, OnInit } from '@angular/core';
import { QuoteData } from '../api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() data!: QuoteData;

  constructor() { }

  ngOnInit(): void {
  }

}
