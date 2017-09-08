import getData from '../util/api_util';
import express from 'express';


const app = express();

app.get('/foo', function(req, res) {
  getData();
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
