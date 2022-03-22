const express = require('express');
const cors = require('cors');
require('./db/mongoose');

const app = express();

const pollsRouter = require('./routers/pollsRouter');
const { PORT } = require('./configurations/config');

app.use(cors());
app.use(express.json());
app.use(pollsRouter);

app.listen(PORT, () => console.log("Server is running on port:", PORT));