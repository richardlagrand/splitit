import dotenv from "dotenv";
dotenv.config();
import { gettingUsers, addingUsers } from "./controllers/usersController.js";
import {
  gettingPayments,
  addingPayments,
} from "./controllers/paymentsController.js";
import { webhookController } from "./controllers/webhookController.js";
import morgan from "morgan";
import express from "express";

const app = express();
const port = 8080;
app.use(morgan("dev"));
app.use(cors);
app.use(express.json());

function cors(req, res, next) {
  res.header("Allow", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
}

// users routing
app.get("/api/users", gettingUsers);
app.post("/api/users", addingUsers);
app.put("/api/users", addingUsers);

//login routing
app.post("api/login");

//payments routing
app.get("/api/payments", gettingPayments);
app.post("/api/payments", addingPayments);

//stripe CLI webhook routing
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookController
);

app.listen(port, () => {
  console.log(` 🏖️ Server running and listening at http://localhost:${port}`);
});
