'use strict'

const config = require('../config')
const store = require('../store')

const getLogs = function () {
  return $.ajax({
    url: config.apiOrigin + '/logs', // "http://book-json.herokuapp.com/books"
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }})
}

const createLog = function (logData) {
  return $.ajax({
    url: config.apiOrigin + '/logs',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: logData
  })
}

const getLog = function (contactId) {
  return $.ajax({
    url: config.apiOrigin + '/logs/' + contactId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }})
}

const updateLog = function (logId, data) {
  return $.ajax({
    url: config.apiOrigin + '/logs/' + logId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const deleteLog = function (logId) {
  return $.ajax({
    url: config.apiOrigin + '/logs/' + logId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }})
}

module.exports = {
  getLogs,
  getLog,
  createLog,
  updateLog,
  deleteLog
}
