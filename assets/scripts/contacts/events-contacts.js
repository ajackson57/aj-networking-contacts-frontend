'use strict'

const api = require('./api-contacts.js')
const ui = require('./ui-contacts.js')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
// const BootstrapMenu = require('bootstrap-menu')

const exampleContact = {
  first_name: 'Wylie',
  last_name: 'Coyote',
  email: 'will@gail.com',
  company: 'Acme',
  position: 'Bird Chaser'
}

const contextMenu = (event) => {
  event.preventDefault()
  $('.context')
    .show()
    .css({
      top: event.pageY,
      left: event.pageX
    })
}

const contextMenuResponse = (event) => {
  if ($('.context').is(':hover') === false) {
    $('.context').fadeOut('fast')
  }
}

const getContactsSuccess = (data) => {
  // console.log(data)
  store.contacts = data.contacts
  ui.displayContacts(store.contacts)
  $('.edit-contact').on('click', editContact)
  $('#context').on('contextmenu', contextMenu)
  $('.context').click(contextMenuResponse)
}

const onGetContacts = (event) => {
  event.preventDefault()
  ui.clearContacts()
  api.getContacts()
    .then(getContactsSuccess)
    .catch(ui.failure)
}

const createContactSuccess = (data) => {
  $('#get-contacts-button').trigger('click')
}

const onCreateContact = (event) => {
  event.preventDefault()
  ui.clearContacts()
  ui.displayContact(exampleContact)
  $('button#save-contact').on('click', onSaveNewContact)
  $('button#cancel-contact').on('click', onCancelContact)
  $('button#delete-contact').hide
}

const onClearContacts = (event) => {
  event.preventDefault()
  ui.clearContacts()
}

function findContact (contact) {
  return contact.id.toString() === store.contactId
}

const onSaveNewContact = (event) => {
  // console.log('Saved')
  event.preventDefault()
  const contactData = getFormFields(event.target.form)
  contactData.contact['user_id'] = store.user.id
  api.createContact(contactData)
    .then(createContactSuccess)
    .catch(ui.failure)
}
const onSaveContact = (event) => {
  // console.log('Saved')
  event.preventDefault()
  const contactId = store.contactId
  const contactData = getFormFields(event.target.form)
  api.updateContact(contactId, contactData)
    .then(ui.updateContactSuccess)
    .catch(ui.failure)
}

const onCancelContact = (event) => {
  // console.log('Cancelled')
  event.preventDefault()
  ui.clearContacts()
  ui.displayContacts(store.contacts)
  $('.edit-contact').on('click', editContact)
}

const onDeleteContact = (event) => {
  // console.log('Deleted')
  event.preventDefault()
  const contactId = store.contactId
  api.deleteContact(contactId)
    .then(ui.deleteContactSuccess)
    .catch(ui.failure)
}

const addHandlers = () => {
  $('#get-contacts-button').on('click', onGetContacts)
  $('#clear-contacts-button').on('click', onClearContacts)
  $('#create-contact-button').on('click', onCreateContact)
}

const editContact = (event) => {
  const contactId = event.currentTarget.parentElement.attributes.getNamedItem('row-id').value
  store.contactId = contactId
  const contact = store.contacts.find(findContact)
  ui.clearContacts()
  ui.displayContact(contact)
  $('button#save-contact').on('click', onSaveContact)
  $('button#cancel-contact').on('click', onCancelContact)
  $('button#delete-contact').show
  $('button#delete-contact').on('click', onDeleteContact)
}

module.exports = {
  addHandlers,
  editContact,
  onSaveContact,
  onCancelContact
}
