import * as express from 'express';
import * as cors from 'cors';

const app = express();
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
