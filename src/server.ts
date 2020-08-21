import app from "./app";


const HOST:string = process.env.HOST
const PORT:number = 3000

app.listen(PORT, (err?: any) => {
  if (err) throw err;
  console.log(`> Ready - environment of ${process.env.NODE_ENV}`);
});
