const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const routes = require('./routes/index.js');

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});