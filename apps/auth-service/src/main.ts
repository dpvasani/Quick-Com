import express from 'express';
import cors from 'cors';



const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.get('/', (req, res) => {
    res.send({ 'message': 'Hello API From Auth Service'});
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Auth Service listening at http://localhost:${port}/api`);
});

server.on('error', (err) => {
    console.error(`Auth Service error: ${err}`);
});