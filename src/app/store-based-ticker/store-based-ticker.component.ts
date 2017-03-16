import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TickerQuotes, TickerActions } from "./store-based-ticker.store";
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-store-based-ticker',
  templateUrl: './store-based-ticker.component.html',
  styleUrls: ['./store-based-ticker.component.css']
})
export class StoreBasedTickerComponent implements OnDestroy, OnInit {
  ticker: Observable<TickerQuotes>;
  constructor(private store: Store<TickerQuotes>) {
    this.ticker = store.select('ticker');
  }

  ngOnInit() {
    this.store.dispatch({
      type: TickerActions.SUBSCRIBE,
      /**
       * Pass the component instance as the payload
       */
      payload: this
    });
  }

  ngOnDestroy() {
    this.store.dispatch({
      type: TickerActions.UNSUBSCRIBE,
      payload: this
    })
  }
}
