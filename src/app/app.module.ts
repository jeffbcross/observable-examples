import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StockQuoteComponent } from './stock-quote/stock-quote.component';
import { StockTickerComponent } from './stock-ticker/stock-ticker.component';
import { TickerService } from './ticker.service';

@NgModule({
  declarations: [
    AppComponent,
    StockQuoteComponent,
    StockTickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([{
      path: 'stock-quote',
      component: StockQuoteComponent
    },{
      path: 'stock-ticker',
      component: StockTickerComponent
    }])
  ],
  providers: [
    TickerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
