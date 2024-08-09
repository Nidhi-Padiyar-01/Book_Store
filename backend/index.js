import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from './Routes/bookRoute.js';
const app = express();

//Middleware for parsing request body
app.use(express.json())

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

app.use('/books',bookRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      //we need function to listen this port
      console.log(`App is listening to this port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
