import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

import { TickerService } from '../ticker.service';

@Component({
  selector: 'app-stock-ticker',
  templateUrl: './stock-ticker.component.html',
  styleUrls: ['./stock-ticker.component.css']
})
export class StockTickerComponent {
  prices: Observable<number[]>;
  constructor(ticker: TickerService) {
    /**
     * Similar to array reduce. Also similar to rxjs reduce,
     * except that reduce doesn't emit accumulated value until
     * the source observable (ticker.prices) completes.
     */
    this.prices = ticker.prices.scan((acc, val) => {
      // Returns the 10 most recent prices
      return [...acc, val].slice(-10);
    }, []);
  }
}
