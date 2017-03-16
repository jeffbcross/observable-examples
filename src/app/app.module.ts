import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';
import { StoreModule, combineReducers } from '@ngrx/store';

import { AppComponent } from './app.component';
import { StockQuoteComponent } from './stock-quote/stock-quote.component';
import { StockTickerComponent } from './stock-ticker/stock-ticker.component';
import { TickerService } from './ticker.service';
import { StoreBasedTickerComponent } from './store-based-ticker/store-based-ticker.component';
import { tickerStore, TickerEffects, TickerQuotes, tickerStarterState } from './store-based-ticker/store-based-ticker.store';
import { EffectsModule } from "@ngrx/effects";


export function reducer () {
  return combineReducers({
    ticker: tickerStore
  })
}

@NgModule({
  declarations: [
    AppComponent,
    StockQuoteComponent,
    StockTickerComponent,
    StoreBasedTickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(reducer, { ticker: tickerStarterState }),
    EffectsModule.run(TickerEffects),
    RouterModule.forRoot([{
      path: 'stock-quote',
      component: StockQuoteComponent
    },{
      path: 'stock-ticker',
      component: StockTickerComponent
    },{
      path: 'store-based-ticker',
      component: StoreBasedTickerComponent
    }])
  ],
  providers: [
    TickerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export interface AppState {
  ticker: TickerQuotes
}

