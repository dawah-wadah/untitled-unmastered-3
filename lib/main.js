import getData from '../util/api_util';
import express from 'express';
import cors from 'cors';
import dispatcher from '../util/dispatcher.js';


const app = express();

app.get('/foo', cors(), function(req, res) {
  getData()
  .then( items => res.send(dispatcher(items)))
  .catch(() => res.send('Error da fuq'));
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
