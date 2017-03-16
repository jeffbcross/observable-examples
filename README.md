Some Observable Examples

Start up server for web socket and http endpoints.

```bash
$ npm run backend
```

Serve the app with Angular CLI

```bash
$ npm start
```

Open http://localhost:4200.

Files to look at (in src/app):

 * stock-quote/stock-quote.component.ts (shows retry plus error handling with http)
 * ticker.service.ts (shows service with a single Observable to connect to web socket)
 * stock-ticker/stock-ticker.component.ts (shows consuming observable service and scanning to get latest 10 values)
 * store-based-ticker/store-based-ticker.component.ts (shows stock ticker integrated with ngrx/store)
 * store-based-ticker/store-based-ticker.store.ts (shows ngrx/store and ngrx/effects implementation with ticker service)