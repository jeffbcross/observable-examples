import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TickerService {
  prices: Observable<number> = Observable.create((observer) => {
    /**
     * This function will not be called until the Observable is subscribed.
     * In this case, the async pipe in our template will subscribe,
     * causing the web socket to be opened.
     */
    const socket = new WebSocket('ws://localhost:3000');
    socket.onmessage = (msg) => {
      observer.next(msg.data);
    };
    socket.onopen = () => {
      socket.send('SendMePrices');
    }

    /**
     * This function will be called any time a consumer of the
     * Observable calls unsubscribe(). We use it to tear down
     * the WebSocket connection.
     *
     * The async pipe will automatically call this when the Component
     * is destroyed.
     */
    return () => {
      socket.close();
    };
  });
}
