'use strict'

// const api = require('./api-contacts.js')
// const ui = require('./ui-contacts.js')
const store = require('../store')
// const getFormFields = require('../../../lib/get-form-fields')
// const BootstrapMenu = require('bootstrap-menu')
const api = require('./api-logs')
const ui = require('./ui-logs')

const createLogSuccess = (data) => {
  $('#content-feedback').text('Log succesfully created')
  store.logs = data.logs
  $('#get-contacts-button').trigger('click')
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
    $('#content-feedback').text('Logs succesfully retrieved')
    ui.displayLogs(store.logs)
  } else {
    $('#content-feedback').text('Currently no logs associatted with this contact')
    $('#get-contacts-button').trigger('click')
  }
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
