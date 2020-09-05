import bodyParser from 'body-parser'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { BookController } from './book.controller'

const app: express.Application = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// TODO re-write swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(require('./swagger.json')),
)

app.get('/', (req, res) => {
  res.json({ ok: true })
})

app.post('/book/create', (req, res) => {
  const bookInput = req.body
  BookController.addBook(bookInput)
  res.json({})
})

app.get('/book/list', (req, res) => {
  const books = BookController.listBooks()
  res.json({ books })
})

app.delete('/book/:id', (req, res) => {
  const bookId = parseInt(req.params.id)
  BookController.deleteBookById(bookId)
  res.json({})
})

app.get('/book/:id', (req, res) => {
  const bookId = parseInt(req.params.id)
  const book = BookController.getBookById(bookId)
  res.json({ book })
})

function startServer() {
  app.listen(8080, () => {
    console.log(`App is listening on port ${8080}!`)
  })
}
startServer()
