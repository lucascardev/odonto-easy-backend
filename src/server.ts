import app from "./app";
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? ".env.test" : ".env"
})

const HOST:string = process.env.HOST
const PORT:number = 3000

app.listen(PORT, '127.0.0.1', (err?: any) => {
  if (err) throw err;
  console.log(`> Ready - environment of ${process.env.NODE_ENV}`);
});
