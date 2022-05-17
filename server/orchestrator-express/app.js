if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const port = process.env.PORT || 6000;
const routes = require('./routes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Currently listening on http://localhost:${port}`);
})

app.use(errorHandler)