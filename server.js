const express = require('express');

const app = express();

app.use(express.static('./dist/movie-logger'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('*', (req, res) => {
  res.sendFile('index.html', {root: 'dist/movie-logger/'}
  );
});

app.listen(process.env.PORT || 8080,() =>{console.log('now listening on Port')});
