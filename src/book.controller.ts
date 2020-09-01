import { MOCK_BOOKS } from './const'

class _BookController {
  private books: any = []
  constructor() {
    this.books = MOCK_BOOKS
  }
  getBookById(id: number) {
    const book = this.books.find((book: any) => book.id === id)
    if (!book) throw new Error('Book not found')
    return book
  }
  listBooks() {
    return this.books
  }
  addBook(book: any) {
    this.books.push(book)
  }
  deleteBookById(id: number) {
    let deletedIndex = null
    this.books.forEach((book: any, idx: number) => {
      if (book.id === id) {
        deletedIndex = idx
      }
    })
    if (deletedIndex === null) throw new Error('Book not found')
    this.books.splice(deletedIndex, 1)
  }
}

export const BookController = new _BookController()
