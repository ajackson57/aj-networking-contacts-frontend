'use strict'
// const api = require('./api-contacts.js')
const store = require('../store')
const showContactsTemplate = require('../templates/contact-listing.handlebars')
const showContactEditTemplate = require('../templates/contact-edit.handlebars')
const showContactNewTemplate = require('../templates/contact-new.handlebars')

// const eve = require('./events-contacts.js')

const displayContacts = (contacts) => {
  store.contacts = contacts
  const showContactsHtml = showContactsTemplate({ contacts: contacts })
  $('.content').append(showContactsHtml)
}

const displayContact = (contact) => {
  const showContactEditHtml = showContactEditTemplate({ contact: contact })
  $('.content').append(showContactEditHtml)
}

const displayNewContact = (contact) => {
  const showContactNewHtml = showContactNewTemplate({ contact: contact })
  $('.content').append(showContactNewHtml)
}

const updateContactSuccess = (data) => {
  $('#content').text('Contact updated successfully.')
  $('#get-contacts-button').trigger('click')
}

const deleteContactSuccess = (data) => {
  $('#content').text('Contact deleted successfully.')
  $('#get-contacts-button').trigger('click')
}

const clearContacts = () => {
  $('.content').empty()
}

const failure = (error) => {
  console.error(error)
}

module.exports = {
  clearContacts,
  deleteContactSuccess,
  displayContacts,
  displayContact,
  displayNewContact,
  failure,
  updateContactSuccess
}
