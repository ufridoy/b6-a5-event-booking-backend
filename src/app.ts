import express,{ Request, Response } from "express";
import { indexRoute } from "./app/routes";

const app = express()

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/v1", indexRoute)

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('My Event Booking App Running!');
});

export default app;