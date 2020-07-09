import express from 'express'

const app = express()

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World new' })
})

app.listen(3333)
