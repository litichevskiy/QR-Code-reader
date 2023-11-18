const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');

app.use( compression({ filter: shouldCompress }));

app.use('/sw.js', express.static( __dirname + '/dist/js/sw.js'));
app.use('/manifest.json', express.static(__dirname + '/manifest.json'));
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/images', express.static(__dirname + '/src/images'));
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen( PORT, () => console.log(`server listening http://localhost:${PORT}`));

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) return false;
  else return compression.filter(req, res);
};