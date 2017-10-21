'use strict'

const api = require('./api-contacts.js')
const ui = require('./ui-contacts.js')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

const getContactsSuccess = (data) => {
  console.log(data)
  store.contacts = data.contacts
  ui.displayContacts(store.contacts)
  $('.edit-contact').on('click', editContact)
}

const onGetContacts = (event) => {
  event.preventDefault()
  ui.clearContacts()
  api.getContacts()
    .then(getContactsSuccess)
    .catch(ui.failure)
}

const onClearContacts = (event) => {
  event.preventDefault()
  ui.clearContacts()
}

const onSaveContact = (event) => {
  console.log('Saved')
  event.preventDefault()
  const contactId = store.contactId
  const contactData = getFormFields(event.target.form)
  api.updateContact(contactId, contactData)
    .then(ui.updateContactSuccess)
    .catch(ui.failure)
}

const onCancelContact = (event) => {
  console.log('Cancelled')
  ui.clearContacts()
  ui.displayContacts(store.contacts)
}

const addHandlers = () => {
  $('#getContactsButton').on('click', onGetContacts)
  $('#clearContactsButton').on('click', onClearContacts)
}

const editContact = (event) => {
  const contactId = event.currentTarget.attributes.getNamedItem('row-id').value
  const contact = store.contacts[contactId - 1]
  store.contactId = contactId
  ui.clearContacts()
  ui.displayContact(contact)
  $('button#save-contact').on('click', onSaveContact)
  $('button#cancel-contact').on('click', onCancelContact)
}

module.exports = {
  addHandlers,
  editContact,
  onSaveContact,
  onCancelContact
}
