const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Coin = require('./models/coin.js')
const methodOverride = require('method-override');

const coinSeed = require("./models/seed.js")


//Middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));

//Index Route
app.get('/cryptocalculator', (req, res) => {
  Coin.find({}, (err, allCoins) => {
    res.render('index.ejs',
    {
      coins: allCoins
    });
  });
});

//Create Route
app.post('/cryptocalculator', (req, res) => {
  Coin.create(req.body, (err, createdCoin) => {
    res.redirect('/cryptocalculator');
  })
})

//New Route
app.get('/cryptocalculator/new', (req, res) => {
    res.render('new.ejs');
});

//Seed Route
app.get('/cryptocalculator/seed', (req, res) => {
  Coin.create(coinSeed, (err, data) => {
    res.redirect('/cryptocalculator');
  });
});

//Show Route
app.get('/cryptocalculator/:id', (req, res) => {
  Coin.findById(req.params.id, (err, foundCoin) => {
      res.render('show.ejs',
      {
        coins: foundCoin
      });
  });
});

//Listener
app.listen(port, () => {
  console.log("At your command, Captain.");
})

//Mongo
mongoose.connect('mongodb://localhost:27017/coin', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('Mongo up and running');
})
