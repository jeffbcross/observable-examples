import * as express from 'express';
import * as cors from 'cors';
import * as expressWs from 'express-ws';

const app = express();
const expressWsApp = expressWs(app);

app.use(cors());
// app.options('/quote', cors())

app.get('/quote', (req, res) => {
  console.log('getting quote');
  // Roughly 50% chance of erroring
  if (Math.random() > 0.5) {
    res.status(500).send('Server failure');
  } else {
    res.json({
      price: 100
    });
  }
});

app.listen(3000, (err) => {
  if (err) console.error(err);
  console.log('App listening on 3000');
});

app.ws('/', function(ws, req) {
  let interval: NodeJS.Timer;

  ws.on('message', function(msg) {
    switch (msg) {
      case 'SendMePrices':
      interval = setInterval(() => {
        // Send a random price
        ws.send(Math.random());
      }, 1000);
    }
  });
  ws.on('close', () => {
    console.log('disconnected');
    clearInterval(interval);
  })
  console.log('socket', req.testing);
});
