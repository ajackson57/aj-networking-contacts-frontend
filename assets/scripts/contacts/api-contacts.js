'use strict'

const config = require('../config')
const store = require('../store')

// const getContacts = function () {
//   return $.ajax({
//     url: config.apiOrigin + '/contacts', // "http://book-json.herokuapp.com/books"
//     method: 'GET'
//   })
// }

const getContacts = function () {
  return $.ajax({
    url: config.apiOrigin + '/contacts', // "http://book-json.herokuapp.com/books"
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }})
}

const createContact = function (contactData) {
  return $.ajax({
    url: config.apiOrigin + '/contacts',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: contactData
  })
}

// const getContact = function (contactId) {
//   return $.ajax({
//     url: config.apiOrigin + '/contacts/' + contactId,
//     method: 'GET'
//   })
// }

const getContact = function (contactId) {
  return $.ajax({
    url: config.apiOrigin + '/contacts/' + contactId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }})
}

// const updateContact = function (conatctId, data) {
//   return $.ajax({
//     url: config.apiOrigin + '/contacts/' + conatctId,
//     method: 'PATCH',
//     data: data
//   })
// }

const updateContact = function (contactId, data) {
  return $.ajax({
    url: config.apiOrigin + '/contacts/' + contactId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

// const deleteContact = function (contactId) {
//   return $.ajax({
//     url: config.apiOrigin + '/contacts/' + contactId,
//     method: 'DELETE'
//   })
// }

const deleteContact = function (contactId) {
  return $.ajax({
    url: config.apiOrigin + '/contacts/' + contactId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }})
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
}
