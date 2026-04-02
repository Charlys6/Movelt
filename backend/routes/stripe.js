const express = require('express');
const router = express.Router();

const stripe = require('stripe')('your_stripe_secret_key');

// Create Checkout Session
router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items,
        mode: 'payment',
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
    });
    return res.json({ id: session.id });
});

module.exports = router;
