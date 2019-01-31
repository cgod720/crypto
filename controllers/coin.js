const express = require('express');
const router = express.Router();
const Coin = require('../models/coin.js');
const coinSeed = require('../models/seed.js');

router.get('/', (req, res) => {
  res.redirect('/cryptocalculator');
});

//Index Route
router.get('/cryptocalculator', (req, res) => {
  Coin.find({}, (err, allCoins) => {
    res.render('index.ejs',
    {
      coins: allCoins
    });
  });
});

//Create Route
router.post('/cryptocalculator', (req, res) => {
  Coin.create(req.body, (err, createdCoin) => {
    res.redirect('/cryptocalculator');
  })
})

//Calculate Route
router.post('/cryptocalculator/calculated', (req, res) => {
  let crypto = req.body.crypto;
  let invested = req.body.invested;
  let numCoins = req.body.numCoins;
  let price = req.body.price;
  // let costBasis = Number(req.body.invested) / Number(req.body.numCoins);
  // let totalValue = price * numCoins;
  // let result = (totalValue - invested) * tax;
  res.render('calculated.ejs', req.body);
})

//New Route
router.get('/cryptocalculator/new', (req, res) => {
    res.render('new.ejs');
});

//Seed Route
router.get('/cryptocalculator/seed', (req, res) => {
  Coin.create(coinSeed, (err, data) => {
    res.redirect('/cryptocalculator');
  });
});

//Edit Route
router.get('/cryptocalculator/:id/edit', (req, res) => {
  Coin.findById(req.params.id, (err, foundCoin) => {
    res.render(
      'edit.ejs',
      {
          coins: foundCoin
      });
  });
});

//Update Route
router.put('/cryptocalculator/:id', (req, res) => {
  Coin.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel) => {
    res.redirect('/cryptocalculator');
  });
});

//Delete Route
router.delete('/cryptocalculator/:id', (req, res) => {
  Coin.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect('/cryptocalculator')
  });
});


//Show Route
router.get('/cryptocalculator/:id', (req, res) => {
  Coin.findById(req.params.id, (err, foundCoin) => {
      res.render('show.ejs',
      {
        coins: foundCoin
      });
  });
});

module.exports = router;
