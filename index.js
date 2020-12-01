const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
app.use(express.json())

/**
 * Demo Data START
 */
const users = [
    {
        "first_name": "Doe",
        "last_name": "John",
        "mail": "john.doe@studi.fr",
        "books": [ ],
    },
    {
        "first_name": "Doe",
        "last_name": "Jane",
        "mail": "jane.doe@studi.fr",
        "books": [ ],
    },
    {
        "first_name": "Mickaël",
        "last_name": "Andrieu",
        "mail": "mickael.andrieu@exemple.fr",
        "books": ["0-7975-8110-3", "0-7975-8110-4"],
    },
]

const books = [
    {
        "title": "Book 1",
        "author": "Jonathan",
        "isbn": "0-7975-8110-3",
        "availability": true,
        "return_date": null
    },
    {
        "title": "Book 2",
        "author": "Elise",
        "isbn": "0-7975-8110-4",
        "availability": false,
        "return_date": "01/01/2028"
    },
    {
        "title": "Book 3",
        "author": "Zineb",
        "isbn": "0-7975-8110-5",
        "availability": false,
        "return_date": null
    },
]

/**
 * Demo Data END
 */

/**
 * Books CRUD
 */
app.get('/', (req, res) => {
    res.json({'message': "Home, nothing interesting here.")
})

app.get('/books/', (req, res) => {
    res.json(books)
})

app.get('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn
    const book = books.find(book => book.isbn === isbn)

    res.json(book)
})

app.post('/books', (req, res) => {
    books.push(req.body)
    res.status(200).json(books)
})

app.put('/books/:isbn', (req,res) => {
    const isbn = req.params.isbn
    let book = books.find(book => book.isbn === isbn)

    // Book update
    book.title = req.body.title
    book.author = req.body.author
    book.availability = req.body.availability
    book.return_date = req.body.return_date

    res.status(200).json(book)
})

app.delete('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn
    const book = books.find(book => book.isbn === isbn)
    books.splice(books.indexOf(book), 1)

    res.json(books)
})

/**
 * Users CRUD
 */
app.get('/users/', (req, res) => {
    res.json(users)
})

app.get('/users/:mail', (req, res) => {
    const mail = req.params.mail
    const user = users.find(user => user.mail === mail)
 
    res.json(user)
})

app.post('/users', (req, res) => {
    users.push(req.body)
    res.json(users)
})

app.put('/users/:mail', (req,res) => {
    const mail = req.params.mail
    const user = users.find(user => user.mail === mail)

   // Update of the user
   utilisateur.first_name = req.body.first_name
   utilisateur.last_name = req.body.last_name
   utilisateur.mail = req.body.mail
   utilisateur.books = req.body.books

   res.json(user)
})

app.delete('/users/:mail', (req, res) => {
    const mail = req.params.mail
    const user = users.find(user => user.mail === mail)
    users.splice(users.indexOf(user), 1)
 
    res.json(users)
})

/**
 * Book Store management
 */

app.post('/borrow/:mail/:isbn', (req, res) => {
    const mail = req.params.mail
    const isbn = req.params.isbn

    const user = users.find(user => user.mail === mail)
    const book = books.find(book => book.isbn === isbn)

    user.books.push(book.isbn)
    book.availability = false
    book.return_date = moment().add(14, 'days');
})

app.post('/borrow/:mail/:isbn', (req, res) => {
    const mail = req.params.mail
    const isbn = req.params.isbn

    const user = users.find(user => user.mail === mail)
    const book = books.find(book => book.isbn === isbn)

    user.books.splice(user.books.indexOf(book), 1)
    book.availability = true
    book.return_date = null;
})

app.listen(port, () => {
  console.log('[Server] Started.')
})