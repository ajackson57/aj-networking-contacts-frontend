'use strict'

const config = require('../config')
// const store = require('../store')

const getContacts = function () {
  return $.ajax({
    url: config.apiOrigin + '/contacts', // "http://book-json.herokuapp.com/books"
    method: 'GET'
  })
}

// const getContacts = function () {
//   return $.ajax({
//     url: config.apiOrigin + '/contacts', // "http://book-json.herokuapp.com/books"
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }})
// }

const createContact = function () {
  return $.ajax({
    url: config.apiOrigin + '/contact',
    method: 'POST'
  })
}

// const createContact = function () {
//   return $.ajax({
//     url: config.apiOrigin + '/contact',
//     method: 'POST',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }})
// }

const getContact = function (contactId) {
  return $.ajax({
    url: config.apiOrigin + '/contacts/' + contactId,
    method: 'GET'
  })
}

// const getContact = function (contactId) {
//   return $.ajax({
//     url: config.apiOrigin + '/contacts/' + contactId,
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }})
// }

const updateContact = function (conatctId, data) {
  return $.ajax({
    url: config.apiOrigin + '/contacts/' + conatctId,
    method: 'PATCH',
    data: data
  })
}

// const updateContact = function (gameId, data) {
//   return $.ajax({
//     url: config.apiOrigin + '/games/' + gameId,
//     method: 'PATCH',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     },
//     data: data
//   })
// }

const deleteContact = function (contactId) {
  return $.ajax({
    url: config.apiOrigin + '/contacts/' + contactId,
    method: 'DELETE'
  })
}

// const deleteContact = function (contactId) {
//   return $.ajax({
//     url: config.apiOrigin + '/contacts/' + contactId,
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
}
