const express = require('express')
const cors = require('cors')
const router = require('./routers/mainRouters')
const app = express()
const port = 8000
const corsOptions = {
	origin: '*',
	credentials: true,
	optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/', router)

app.listen(port)
