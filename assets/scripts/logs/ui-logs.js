'use strict'
// const api = require('./api-contacts.js')
const store = require('../store')
const showLogsTemplate = require('../templates/log-listing.handlebars')
// const showContactEditTemplate = require('../templates/contact-edit.handlebars')
// const showContactNewTemplate = require('../templates/contact-new.handlebars')

const displayLogs = (logs) => {
  console.log(logs)
  store.logs = logs
  const showLogsHtml = showLogsTemplate({ logs: logs })
  $('.content').append(showLogsHtml)
}

const failure = (error) => {
  console.error(error)
}

module.exports = {
  failure,
  displayLogs
}
