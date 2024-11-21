import { getPayments, addPayments } from "../models/paymentsModel.js";
import Stripe from "stripe";
const stripe = Stripe(process.env.TEST_KEY);
const CONNECTED_ACCOUNT_ID = process.env.CONNECTED_ACCOUNT_ID;
/*
The connected account id should be passed down from the login, and be generated dynamically. 
After generating an acive payment link, this should be redirected to the payments overview with the new 
payment link sorted in the table.
*/

export async function gettingPayments(req, res) {
  const payments = await getPayments();
  console.log(payments);
  res.status(200).json(payments);
}

export async function addingPayments(req, res) {
  const addPayment = req.body;

  //create a price-product combination
  const price = await stripe.prices.create({
    currency: "eur",
    unit_amount: addPayment.amount,
    product_data: {
      name: addPayment.description,
    },
  });

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    transfer_data: {
      destination: CONNECTED_ACCOUNT_ID,
    },
  });

  console.log("The price object is:", { price });

  console.log("The paymentlink object is:", { paymentLink });

  res.status(201).json({
    message: "Payment added successfully",
    paymentLink: paymentLink.url,
  });
}
