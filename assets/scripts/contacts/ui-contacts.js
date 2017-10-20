'use strict'
const store = require('../store')
const showContactsTemplate = require('../templates/contact-listing.handlebars')
const showContactEditTemplate = require('../templates/contact-edit.handlebars')


const displayContacts = (contacts) => {
  console.log(contacts)
  store.contacts = contacts
  const showContactsHtml = showContactsTemplate({ contacts: contacts })
  $('.content').append(showContactsHtml)
  $('.edit-contact').on('click', editContact)
}

const getContactsSuccess = (data) => {
  console.log(data)
  displayContacts(data.contacts)
}

const clearContacts = () => {
  $('.content').empty()
}

const failure = (error) => {
  console.error(error)
}

const onSaveContact = (event) => {
  console.log('Saved')
  clearContacts()
  displayContacts(store.contacts)
}

const onCancelContact = (event) => {
  console.log('Cancelled')
  clearContacts()
  displayContacts(store.contacts)
}

const editContact = (event) => {
  const contactId = event.currentTarget.attributes.getNamedItem('row-id').value
  const contact = store.contacts[contactId - 1]
  store.conatctId = contactId
  clearContacts()
  const showContactEditHtml = showContactEditTemplate({ contact: contact })
  $('.content').append(showContactEditHtml)
  $('button#save-contact').on('click', onSaveContact)
  $('button#cancel-contact').on('click', onCancelContact)
}

module.exports = {
  getContactsSuccess,
  clearContacts,
  failure
}
