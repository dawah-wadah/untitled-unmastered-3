import getData from '../util/api_util';
import express from 'express';
import cors from 'cors';
import dispatcher from '../util/dispatcher.js';


const app = express();

app.get('', cors(), function(req, res) {
  getData()
  .then( items => res.send(dispatcher(items)))
  .catch(() => res.send('Cannot GET data'));
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
