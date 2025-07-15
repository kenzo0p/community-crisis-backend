import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const SERVER_PORT = process.env.PORT;
const app = express();
app.get('/', (req, res) => {
  res.send('Server is started');
});
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port - http://localhost:${SERVER_PORT}`);
});
