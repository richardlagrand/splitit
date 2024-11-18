import { getUsers, addUser } from "../models/usersModel.js";
import Stripe from "stripe";
const stripe = Stripe(process.env.TEST_KEY);

export async function gettingUsers(req, res) {
  const users = await getUsers();
  console.log(users);
  res.status(200).json(users);
}

export async function addingUsers(req, res) {
  const users = await getUsers();
  const newUser = req.body;
  if (users.some((user) => user.email === newUser.email)) {
    res.status(400).json({
      error: "Username already in use",
    });
  } else {
    const account = await stripe.accounts.create({
      controller: {
        losses: {
          payments: "application",
        },
        fees: {
          payer: "application",
        },
        stripe_dashboard: {
          type: "express",
        },
      },
      email: newUser.email,
    });
    console.log("The new account.id is:", account.id);
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: "http://localhost:5173/registration/incomplete",
      return_url: "http://localhost:5173/registration/complete",
      type: "account_onboarding",
    });
    console.log("The onboarding link is:", accountLink.url);

    addUser(newUser, account);
    res.status(201).json({
      message: "User created successfully",
      accountLink: accountLink.url,
    });
  }
}
