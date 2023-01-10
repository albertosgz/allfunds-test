import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService, QuoteData } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'allfunds-test';

  private subscriptions$: Subscription[] = [];

  quote: QuoteData = {
    Last: {},
    Close: {},
    DayChangePerc: {},
    DayChange: {},
    Volume: {},
    Turnover: {},
    PreviousYearClose: {},
    YTD: {},
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscriptions$.push(
      this.apiService.getQuote().subscribe(quote => {
        this.quote = quote;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub$ => sub$.unsubscribe());
  }
}
