import express, { Application } from "express";
import routes from "./routes";

const app: Application = express();
app.use(express.json())
app.use(routes);

app.get("/", (request, response) => {
  return response.json({ message: "Hello World new" });
});

app.listen(process.env.PORT || 3000, (err?: any) => {
  if (err) throw err;
  console.log(`> Ready - environment of ${process.env.NODE_ENV}`);
});
