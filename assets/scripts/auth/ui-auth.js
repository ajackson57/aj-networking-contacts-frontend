'use strict'

const store = require('../store')
// const gameEvents = require('../games/events-games')

const signUpSuccess = function (data) {
  $('#content-feedback').text('Sign up was succesfull')
  $('#sign-up').hide()
}

const signUpFailure = function (error) {
  $('#content-feedback').text('Eror on sign up: ', error)
}
const signInSuccess = function (data) {
  store.user = data.user
  $('#content-feedback').text('Signed in succesfully')
  $('#sign-in').hide()
  $('#sign-out-menu').show()
  $('#change-password-menu').show()
  $('#sign-in-menu').hide()
  $('#sign-up-menu').hide()
  $('#get-contacts-button').show()
  // $('#clear-contacts-button').show()
  $('#create-contact-button').show()
  $('#get-contacts-button').trigger('click')
}

const signInFailure = function (error) {
  $('#content-feedback').text('Error on sign-in: ', error)
}
const changePasswordSuccess = function (data) {
  ('Data from CPW :', data)
  $('#content-feedback').text('Password changed succesfully')
  $('#change-password').hide()
  $('#sign-out-menu').show()
  $('#change-password-menu').show()
  $('#get-contacts-button').show()
  // $('#clear-contacts-button').show()
  $('#create-contact-button').show()
  $('#get-contacts-button').trigger('click')
}

const cancelChangePassword = function () {
  $('#content-feedback').text('Cancelled password change')
  $('#change-password').hide()
  $('#sign-out-menu').show()
  $('#change-password-menu').show()
  $('#get-contacts-button').show()
  // $('#clear-contacts-button').show()
  $('#create-contact-button').show()
  $('#get-contacts-button').trigger('click')
}

const changePasswordFailure = function (error) {
  $('#content-feedback').text('Error on password change: ', error)
}
const signOutSuccess = function (data) {
  store.user = {}
  $('#content-feedback').text('Signed out succesfully')
  hideAuthContent()
  $('#sign-in-menu').show()
  $('#sign-up-menu').show()
}

const signOutFailure = function (error) {
  $('#content-feedback').text('Error sign out: ', error)
}
const hideAuthContent = function () {
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#sign-out').hide()
  $('#change-password').hide()
  $('#sign-out-menu').hide()
  $('#change-password-menu').hide()
  $('#get-contacts-button').hide()
  // $('#clear-contacts-button').hide()
  $('#create-contact-button').hide()
  $('#content').empty()
}
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  cancelChangePassword,
  signOutSuccess,
  signOutFailure,
  hideAuthContent
}
