'use strict'

const api = require('./api-contacts.js')
const ui = require('./ui-contacts.js')

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

const addHandlers = () => {
  $('#getContactsButton').on('click', onGetContacts)
  $('#clearContactsButton').on('click', onClearContacts)
}

module.exports = {
  addHandlers
}
