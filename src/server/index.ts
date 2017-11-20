import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as leaderboard from './leaderboard';
import * as db from './db';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('docs'));

app.get('/api/score', (req, res) => {
  res.json(leaderboard.getScores());
});

app.post('/api/score', (req: any, res) => {
  leaderboard.addScore(req.body);
  res.send('');
  setDbSavingTimeout();
});

let dbSavingTimeout;

function setDbSavingTimeout() {
  if (dbSavingTimeout != null) {
    clearTimeout(dbSavingTimeout);
  }
  dbSavingTimeout = setTimeout(saveToDb, 60 * 1000);
}

function saveToDb() {
  leaderboard.saveToDb();
  clearTimeout(dbSavingTimeout);
  dbSavingTimeout = null;
}

const listener = app.listen(process.env.PORT, () => {
  db.init().then(() => {
    console.log(`darumatron server ready. port: ${listener.address().port}`);
  });
});
