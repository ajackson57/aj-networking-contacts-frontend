'use strict'

const config = require('../config')
// const store = require('../store')

const getContacts = function () {
  return $.ajax({
    url: config.apiOrigin + '/contacts', // "http://book-json.herokuapp.com/books"
    method: 'GET'
  })
}

module.exports = {
  getContacts
}
