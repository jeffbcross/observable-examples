import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { publishReplay } from 'rxjs/operator/publishReplay';

@Injectable()
export class TickerService {
  /**
   * There will only be one instance
   * of the producer with an active WebSocket connection as long as there
   * is at least one subscriber. When everyone unsubscribes, the WebSocket
   * connection will be closed until someone subscribes again. The values
   * will be preserved (cached) until next time the service is subscribed to.
   *
   * publishReplay tells the observable to share the observable, and buffer its
   * values to "replay" them for each additional subscription.
   *
   * refCount() causes the subscription to be disposed when no one is listening.
   */
  prices: Observable<number> = publishReplay.call(Observable.create((observer) => {
    console.log('creating ws connection!');
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
      console.log('closing socket connection');
      socket.close();
    };
  })).refCount();
}
