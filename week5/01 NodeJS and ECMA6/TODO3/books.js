
// w5 01 TODO2
var request = require('request')

var bookList = []

/* The standard pattern for asynchronous callbacks is for the first parameter to be the error, this should be null if no error is thrown with the second parameter being the data. */
exports.search = (query, callback) => {
  if (typeof query !== 'string' || query.length === 0) {
    callback(new Error('missing query parameter'))
  }
  const url = 'https://www.googleapis.com/books/v1/volumes'
  const query_string = {q: query, maxResults: 3, fields: 'items(id,volumeInfo(title,authors))'}
  request.get({url: url, qs: query_string}, (err, res, body) => {
    if (err) {
      callback(new Error('error making google books request'))
    }
    const json = JSON.parse(body)
    const items = json.items
    if (items === undefined) {
      //console.log('found undefined property')
      callback(new Error('no books found matching search'))
      return
    }
    const books = items.map( element => {
      return {id:element.id, title:element.volumeInfo.title, authors:element.volumeInfo.authors}
    })
    /* the first callback parameter is the error, which in this case will be null, the second parameter is the data returned. */
    callback(null, books)
  })
}

exports.info = (query, callback) => {
  if (typeof query != "string" || query.length === 0) {
    callback(new error("Query fails to get parameter"))
  }
  const url2 ="https://www.googleapis.com/books/v1/volumes"
  const query_string = {q: query, maxResults: 10, fields: "items(id,volumeInfo(title,authors))"}
  request.get({url: url2,qs: query_string}, (err, res, body) => {
    if (err) {
      callback(new Error('error in openlibrary request.'))
    }
    const json = JSON.parse(body)
    const items = json.items
    if (itmes === undefined) {
      callback(new Error('no books found matching search'))
      return
    }
    const books = items.map( element => {
      return {id:element.id, title:element.volumeInfo.title, authors:element.volumeInfo.authors}
    })
    callback(null, books)
  })
}

/* a synchronous function will either return data or throw an error */
exports.add = bookId => {     ////////               <----------- EXPORTS.ADD ! ! ! !
  if (bookId.length != 12) {
    /* this throws a user-defined exception. */
    throw('bookId should be 12 character long')
  }
  if (bookList.indexOf(bookId) != -1) {
    throw('book has already been added to the list')
  }
  bookList.push(bookId)
  //console.log(bookList.length)
  return 'book '+bookId+' added'
}

exports.splice = bookId => {
  if (bookId.length != 12) {
    /* this throws a user-defined exception. */
    throw('bookId should be 12 character long')
  }
  if (bookList.indexOf(bookId) == -1) {
    throw('theres no book with this bookId')
  }
  bookList.splice(bookId)
  //console.log(bookList.length)
  return 'book '+bookId+' removed'
}

exports.bookCount = () => {
  return bookList.length
}