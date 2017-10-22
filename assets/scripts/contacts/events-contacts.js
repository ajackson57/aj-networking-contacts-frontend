'use strict'

const api = require('./api-contacts.js')
const ui = require('./ui-contacts.js')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

const exampleContact = { first_name: 'Wylie',
  last_name: 'Coyote',
  email: 'will@gail.com',
  company: 'Acme',
  position: 'Bird Chaser'}

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

const createContactSuccess = (data) => {
  console.log(data)

  $('.edit-contact').on('click', editContact)
}

const onCreateContact = (event) => {
  event.preventDefault()
  ui.clearContacts()
  ui.displayContact(exampleContact)
  $('button#save-contact').on('click', onSaveNewContact)
  $('button#cancel-contact').on('click', onCancelContact)
}

const onClearContacts = (event) => {
  event.preventDefault()
  ui.clearContacts()
}

const onSaveNewContact = (event) => {
  console.log('Saved')
  event.preventDefault()
  const contactData = getFormFields(event.target.form)
  contactData.contact['user_id'] = store.user.id
  api.createContact(contactData)
    .then(createContactSuccess)
    .catch(ui.failure)
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
  $('#get-contacts-button').on('click', onGetContacts)
  $('#clear-contacts-button').on('click', onClearContacts)
  $('#create-contact-button').on('click', onCreateContact)
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
