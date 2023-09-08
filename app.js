const express = require('express');
const cors = require('cors');
const router = require('./routers/mainRouters');
const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(port);
