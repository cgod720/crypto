const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Coin = require('./models/coin.js')
const methodOverride = require('method-override');

const coinSeed = require("./models/seed.js")

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/' + 'crypto';



//Middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/', (req, res) => {
  res.redirect('/cryptocalculator');
});
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

// let crypto = "";
// let invested = 0;
// let numCoins = 0;
// let price = 0;
// const tax = .3;

//Calculate Route
app.post('/cryptocalculator/calculated', (req, res) => {
  let crypto = req.body.crypto;
  let invested = req.body.invested;
  let numCoins = req.body.numCoins;
  let price = req.body.price;
  const tax = .3;
  let costBasis = Number(req.body.invested) / Number(req.body.numCoins);
  let totalValue = price * numCoins;
  let result = (totalValue - invested) * tax;
  res.render('calculated.ejs', req.body);
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

//Edit Route
app.get('/cryptocalculator/:id/edit', (req, res) => {
  Coin.findById(req.params.id, (err, foundCoin) => {
    res.render(
      'edit.ejs',
      {
          coins: foundCoin
      });
  });
});

//Update Route
app.put('/cryptocalculator/:id', (req, res) => {
  Coin.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
    res.redirect('/cryptocalculator');
  });
});

//Delete Route
app.delete('/cryptocalculator/:id', (req, res) => {
  Coin.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect('/cryptocalculator')
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
app.listen(PORT, () => {
  console.log("At your command, Captain.");
  console.log(PORT);
})

//Mongo
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('Mongo up and running');
})
