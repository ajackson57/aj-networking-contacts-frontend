'use strict'

const api = require('./api-contacts.js')
const ui = require('./ui-contacts.js')
const store = require('../store')
const logEvents = require('../logs/events-logs.js')
const getFormFields = require('../../../lib/get-form-fields')
// const BootstrapMenu = require('bootstrap-menu')

const exampleContact = {
  first_name: 'Wylie',
  last_name: 'Coyote',
  email: 'will@gail.com',
  company: 'Acme',
  position: 'Bird Chaser'
}

const sendEmail = function () {
  document.location.href = 'mailto:' + store.email
}

const contextMenu = (event) => {
  event.preventDefault()
  store.contextMenuFired = true
  store.contactId = event.target.parentElement.getAttribute('row-id')
  store.contact = store.contacts.find(findContact)
  store.email = event.target.innerText
  $('.context')
    .show()
    .css({
      top: event.pageY,
      left: event.pageX
    })
}

const contextMenuResponse = (event) => {
  const menuItem = event.target['id']
  switch (menuItem) {
    case 'new':
      $('#create-contact-button').trigger('click')
      break
    case 'edit':
      $('.edit-contact').trigger('click')
      break
    case 'delete':
      $('button#delete-contact').trigger('click')
      break
    case 'display-logs':
      // $('#get-contacts-button').trigger('click')
      logEvents.displayLogs(store.contactId)
      break
    case 'email-contact':
      logEvents.createEmailLog(store.contact)
      sendEmail()
      break
    default:
      $('#content').text('Context menu error, menu item not available')
  }
  $('.context').fadeOut('fast')
}

const getContactsSuccess = (data) => {
  if (data.contacts === null || data.contacts.length === 0) {
    $('#content').text('Current user doesnt have any contacts.')
    return
  }
  $('#content').text('Contacts succesfully retrieved')
  store.contacts = data.contacts
  ui.displayContacts(store.contacts)
  $('.edit-contact').on('click', editContact)
  $('#context').on('contextmenu', contextMenu)
  $('.context').click(contextMenuResponse)
  $('#delete').on('click', onDeleteContact)
}

const onGetContacts = (event) => {
  event.preventDefault()
  ui.clearContacts()
  api.getContacts()
    .then(getContactsSuccess)
    .catch(ui.failure)
}

const createContactSuccess = (data) => {
  $('#content').text('New contact successfully created.')
  $('#get-contacts-button').trigger('click')
}

const onCreateContact = (event) => {
  event.preventDefault()
  ui.clearContacts()
  ui.displayNewContact(exampleContact)
  $('button#save-contact').on('click', onSaveNewContact)
  $('button#cancel-contact').on('click', onCancelContact)
}

const onClearContacts = (event) => {
  event.preventDefault()
  ui.clearContacts()
}

function findContact (contact) {
  return contact.id.toString() === store.contactId
}

const onSaveNewContact = (event) => {
  event.preventDefault()
  const contactData = getFormFields(event.target.form)
  contactData.contact['user_id'] = store.user.id
  api.createContact(contactData)
    .then(createContactSuccess)
    .catch(ui.failure)
}
const onSaveContact = (event) => {
  event.preventDefault()
  const contactId = store.contactId
  const contactData = getFormFields(event.target.form)
  api.updateContact(contactId, contactData)
    .then(ui.updateContactSuccess)
    .catch(ui.failure)
}

const onCancelContact = (event) => {
  $('#content').text('Cancel selected from contact form.')
  event.preventDefault()
  $('#get-contacts-button').trigger('click')
}

const onDeleteContact = (event) => {
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
  if (store.contextMenuFired !== true) {
    store.contactId = event.currentTarget.parentElement.attributes.getNamedItem('row-id').value
  } else {
    store.contextMenuFired = true
  }
  const contact = store.contacts.find(findContact)
  ui.clearContacts()
  ui.displayContact(contact)
  $('button#save-contact').on('click', onSaveContact)
  $('button#cancel-contact').on('click', onCancelContact)
  $('button#delete-contact').on('click', onDeleteContact)
}

module.exports = {
  addHandlers,
  editContact,
  onSaveContact,
  onCancelContact
}
