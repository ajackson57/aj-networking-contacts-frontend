'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api-auth')
const ui = require('./ui-auth')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  if (data.credentials.password === '') {
    $('#content').text('Passwords cannot be blank')
    return
  } else if (data.credentials.password_confirmation === '') {
    data.credentials.password_confirmation = data.credentials.password
  } else if (data.credentials.password_confirmation !== data.credentials.password) {
    $('#content').text('Passwords must match')
    return
  }
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}
const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}
const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}
const onSignOut = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}
const onSignInMenu = function (event) {
  event.preventDefault()
  $('#sign-in').show()
}
const onSignOutMenu = function (event) {
  event.preventDefault()
  $('#sign-out').trigger('submit')
}
const onSignUpMenu = function (event) {
  event.preventDefault()
  $('#sign-up').show()
}
const onChangePasswordMenu = function (event) {
  event.preventDefault()
  $('#change-password').show()
}

const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#sign-in-menu').on('click', onSignInMenu)
  $('#sign-out-menu').on('click', onSignOutMenu)
  $('#sign-up-menu').on('click', onSignUpMenu)
  $('#change-password-menu').on('click', onChangePasswordMenu)
  $('#get-contacts-button').hide()
  $('#clear-contacts-button').hide()
  $('#create-contact-button').hide()
}

module.exports = {
  addHandlers
}
