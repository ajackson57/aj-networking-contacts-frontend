'use strict'
const api = require('./api-contacts.js')
const store = require('../store')
const showContactsTemplate = require('../templates/contact-listing.handlebars')
const showContactEditTemplate = require('../templates/contact-edit.handlebars')
const eve = require('./events-contacts.js')

const displayContacts = (contacts) => {
  console.log(contacts)
  store.contacts = contacts
  const showContactsHtml = showContactsTemplate({ contacts: contacts })
  $('.content').append(showContactsHtml)
  $('.edit-contact').on('click', editContact)
}

const getContactsSuccess = (data) => {
  console.log(data)
  store.contacts = data.contacts
  displayContacts(store.contacts)
}

const updateContactSuccess = (data) => {
  clearContacts()
  displayContacts(store.contacts)
}

const clearContacts = () => {
  $('.content').empty()
}

const failure = (error) => {
  console.error(error)
}

const onSaveContact = (event) => {
  console.log('Saved')
  event.preventDefault()
  const contactId = store.contactId
  const contact = store.contacts[contactId - 1]
  api.updateContact(contactId, contact)
    .then(updateContactSuccess)
    .catch(failure)
}

const onCancelContact = (event) => {
  console.log('Cancelled')
  clearContacts()
  displayContacts(store.contacts)
}

const editContact = (event) => {
  const contactId = event.currentTarget.attributes.getNamedItem('row-id').value
  const contact = store.contacts[contactId - 1]
  store.contactId = contactId
  clearContacts()
  const showContactEditHtml = showContactEditTemplate({ contact: contact })
  $('.content').append(showContactEditHtml)
  $('button#save-contact').on('click', onSaveContact)
  $('button#cancel-contact').on('click', onCancelContact)
}

module.exports = {
  getContactsSuccess,
  clearContacts,
  displayContacts,
  failure
}
