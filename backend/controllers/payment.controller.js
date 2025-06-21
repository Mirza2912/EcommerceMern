import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const processPayment = async (req, res) => {
  // console.log("Payment processing started");
  // console.log(req.body.amount);

  const myPayment = await stripe.paymentIntents.create({
    amount: req.body?.amount,
    currency: "pkr",
    metadata: {
      company: "Book Store",
    },
  });
  // console.log(myPayment);

  res
    .status(200)
    .json({ success: true, client_secret: myPayment?.client_secret });
};

const sendStripeApiKey = async (req, res) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
};
export { processPayment, sendStripeApiKey };
