require('dotenv').config() // initializing dotenv file to use enviroment varibables 
const express = require('express') //importing express

const app = express() // intializing express in constant app

app.set('view engine', 'ejs') //setting ejs template engine inside express

app.get('/', async (req, res) => { //creating a basic route to access it 
    res.render('Stripe.ejs')//renders the Stripe.ejs file 
})

app.listen(3000, () => console.log('Server started on port 3000')) //Express listen to port 3000