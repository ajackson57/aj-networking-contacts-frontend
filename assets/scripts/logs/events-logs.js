'use strict'

// const api = require('./api-contacts.js')
// const ui = require('./ui-contacts.js')
const store = require('../store')
// const getFormFields = require('../../../lib/get-form-fields')
// const BootstrapMenu = require('bootstrap-menu')
const api = require('./api-logs')
const ui = require('./ui-logs')

const createLogSuccess = (data) => {
  $('#content').text('Logs succesfully retrieved')
  store.logs = data.logs
  ui.displayLogs(store.logs)
  // $('.edit-contact').on('click', editContact)
  // $('#context').on('contextmenu', contextMenu)
  // $('.context').click(contextMenuResponse)
  // $('#delete').on('click', onDeleteContact)
}

const createEmailLog = function (contact) {
  const logData = {log: { date: new Date().toUTCString(),
    description: 'Email to ' + contact.email,
    contact_id: contact['id'] }}
  api.createLog(logData)
    .then(createLogSuccess)
    .catch(ui.failure)
}

function filtrerLogs (log) {
  if (log.contact_id !== null) {
    return log.contact_id.toString() === store.contactId
  } else {
    return false
  }
}

const getLogsSuccess = (data) => {
  store.logs = data.logs.filter(filtrerLogs)
  if (store.logs.length !== 0) {
    $('#content').text('Logs succesfully retrieved')
    ui.displayLogs(store.logs)
  } else {
    $('#content').text('Currently no logs associatted with this contact')
  }

  // $('.edit-contact').on('click', editContact)
  // $('#context').on('contextmenu', contextMenu)
  // $('.context').click(contextMenuResponse)
  // $('#delete').on('click', onDeleteContact)
}

const displayLogs = function () {
  api.getLogs()
    .then(getLogsSuccess)
    .catch(ui.failure)
}

module.exports = {
  createEmailLog,
  createLogSuccess,
  displayLogs
}
