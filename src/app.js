const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const routes = require('./routes/index.js');
const disc2auth = require('../disc2auth.js');

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", routes);
app.use("/auth/discord", disc2auth);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});