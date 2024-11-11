require('dotenv').config() // initializing dotenv file to use enviroment varibables 
const express = require('express') //importing express
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY) //using secret key (private owner key) in env file

const app = express() // intializing express in constant app

app.set('view engine', 'ejs') //setting ejs template engine inside express

app.get('/', async (req, res) => { //creating a basic route to access it 
    res.render('Stripe.ejs')//renders the Stripe.ejs file 
})

app.get('/commission', async (req, res) => {
    
    const priceId = 'price_1QGt1XP8wOPU9A5AKlJ8AE0y'


    const session = await stripe.checkout.sessions.create({
        mode: 'payment', // 'commission' is not a valid mode; use 'payment' or 'subscription'
        line_items: [ // changed to line_items (plural)
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/cancel`
    })

    res.redirect(session.url)
})

app.get('/success',async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent'] })
    console.log(JSON.stringify(session))

    res.send('Payment Successful')
})

app.get('/cancel', (req, res) => {
    // Provide feedback for the user after cancellation
    res.redirect('/')
    res.send('Payment was canceled. You have been redirected back to the home page.')
})

app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
  
    let event;
  
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET_KEY);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    // Handle the event
    switch (event.type) {
        // Event for a successful payment intent
        case 'payment_intent.succeeded':
        console.log('Payment was successful!');
        console.log(event.data.object);
        break;
    
        // Event for a failed payment intent
        case 'payment_intent.payment_failed':
        console.log('Payment failed!');
        console.log(event.data.object);
        break;
    
        // Event for a completed checkout session (applicable if using Stripe Checkout)
        case 'checkout.session.completed':
        console.log('Checkout session completed successfully!');
        console.log(event.data.object);
        break;
    
        default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
  });
  
app.listen(3000, () => console.log('Server started on port 3000')) //Express listen to port 3000
//video at 36:00