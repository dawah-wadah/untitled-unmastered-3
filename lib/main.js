import getData from '../util/api_util';
import express from 'express';
import cors from 'cors';


const app = express();

app.get('/foo', cors(), function(req, res) {
  getData();
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
