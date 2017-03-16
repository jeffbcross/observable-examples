import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import { TickerService } from "../ticker.service";

export const TickerActions = {
  SUBSCRIBE: 'TickerActionSubscribe',
  ADD: 'TickerActionAdd',
  UNSUBSCRIBE: 'TickerActionUnsubscribe'
};

export const tickerStarterState: TickerQuotes = {
  prices: []
};

export function tickerStore(state, action) {
  console.log('action', action, 'state', state);
  switch(action.type) {
    case TickerActions.ADD:
      return Object.assign({}, state, {
        prices: [...state.prices, action.payload].slice(-10)
      });
    default:
      return state;
  }
}

@Injectable()
export class TickerEffects {
  constructor(
    private actions$: Actions,
    private tickerService: TickerService
  ) { }

  @Effect() subscribe$ = this.actions$
      .ofType(TickerActions.SUBSCRIBE)
      .do(() => {
        console.log('Component Subscribed');
      })
      .switchMap(action => this.tickerService.prices
          /**
           * We'll broadcast an unsubscribe action, with a consumer key as the payload.
           * This effect will automatically unsubscribe from the service when
           * the component who emitted the event is destroyed.
           */
          .takeUntil(this.actions$
            .ofType(TickerActions.UNSUBSCRIBE)
            .filter(unsubAction => {
              console.log('compare', unsubAction.payload === action.payload);
              return unsubAction.payload === action.payload;
            }))
          )
      .map(price => ({
        type: TickerActions.ADD,
        payload: price
      }))
}

export interface TickerQuotes {
  prices: number[];
}
