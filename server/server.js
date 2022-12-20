const express = require('express')
const app = express()
const port = 3000
const ProducerService = require('./services/ProducerService')

const service = new ProducerService()
app.get('/', (req, res) => {
    service.publishMessageQueue({url: req.query.url})
    console.log(req.query.url)
})

app.listen(port, () => {
  console.log(`Running App  ${port}`)
})