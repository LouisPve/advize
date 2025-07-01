import express, { Request, Response } from "express";
import { setRoutes } from "./routes/index";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());
const PORT = process.env["PORT"] || 3000;

// Set up CORS headers
app.use((_: Request, res: Response, next: () => void) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// Middleware
app.use(express.json());

// Set up routes
setRoutes(app);

// expressV5 syntax for handling 404 errors
app.all("/*splat", (_: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
