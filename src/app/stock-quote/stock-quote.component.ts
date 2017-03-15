import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-stock-quote',
  templateUrl: './stock-quote.component.html',
  styleUrls: ['./stock-quote.component.css']
})
export class StockQuoteComponent implements OnInit {
quote: Observable<{[key: string]: number | string}>;
  constructor(private http: Http) {}

  ngOnInit() {
    this.quote = this.http.get('http://localhost:3000/quote')
      .retry(2)
      .map(res => res.json())
      .catch(e => {
        return Observable.of({error: 'Tried 3 times to load data but could not.'})
      });
  }
}
