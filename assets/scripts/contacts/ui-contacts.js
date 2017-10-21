'use strict'
// const api = require('./api-contacts.js')
const store = require('../store')
const showContactsTemplate = require('../templates/contact-listing.handlebars')
const showContactEditTemplate = require('../templates/contact-edit.handlebars')
// const eve = require('./events-contacts.js')

const displayContacts = (contacts) => {
  console.log(contacts)
  store.contacts = contacts
  const showContactsHtml = showContactsTemplate({ contacts: contacts })
  $('.content').append(showContactsHtml)
}

const displayContact = (contact) => {
  const showContactEditHtml = showContactEditTemplate({ contact: contact })
  $('.content').append(showContactEditHtml)
}

const updateContactSuccess = (data) => {
  $('#getContactsButton').trigger('click')
}

const clearContacts = () => {
  $('.content').empty()
}

const failure = (error) => {
  console.error(error)
}

module.exports = {
  clearContacts,
  displayContacts,
  displayContact,
  failure,
  updateContactSuccess
}
