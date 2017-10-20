'use strict'

const api = require('./api-contacts.js')
const ui = require('./ui-contacts.js')
// const store = require('../store')

const onGetContacts = (event) => {
  event.preventDefault()
  api.getContacts()
    .then(ui.getContactsSuccess)
    .catch(ui.failure)
}

const onClearContacts = (event) => {
  event.preventDefault()
  ui.clearContacts()
}

// const onSaveContact = (event) => {
//   console.log('Saved')
//   ui.clearContacts()
//   ui.displayContacts(store.contacts)
// }
//
// const onCancelContact = (event) => {
//   console.log('Cancelled')
//   ui.clearContacts()
//   ui.displayContacts(store.contacts)
// }

const addHandlers = () => {
  $('#getContactsButton').on('click', onGetContacts)
  $('#clearContactsButton').on('click', onClearContacts)
}

module.exports = {
  addHandlers
  // onSaveContact,
  // onCancelContact
}
