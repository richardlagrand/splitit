import Stripe from "stripe";
const stripe = Stripe(process.env.TEST_KEY);
const CONNECTED_ACCOUNT_ID = process.env.CONNECTED_ACCOUNT_ID;
const endpointSecret = process.env.WEBHOOK_SECRET;

export async function webhookController(request, response) {
  console.log("Raw Body (Buffer):", req.body);
  const signature = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      requestBody,
      signature,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("PaymentIntent was successful!");
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      console.log("PaymentMethod was attached to a Customer!");
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
}
