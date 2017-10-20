'use strict'

const showContactsTemplate = require('../templates/contact-listing.handlebars')

const getContactsSuccess = (data) => {
  console.log(data)
  const showContactsHtml = showContactsTemplate({ contacts: data.contacts })
  $('.content').append(showContactsHtml)
  $('.remove-button').on('click', onRemoveContact)
  // $('.remove-button').on('click', (e) => $(e.target).parent().parent().remove())
  // $('button').on('click', function (e) {
  //   e.preventDefault()
  //   $(e.target).parent().parent().remove()
  // })
}

const onRemoveContact = (event) => {
  event.preventDefault()
  console.log('Remove Contact')
  // $(event.target).parent().parent().remove()
  // #content > ul:nth-child(3)
  // #content > ul:nth-child(6)
}

const clearContacts = () => {
  $('.content').empty()
}

const failure = (error) => {
  console.error(error)
}

module.exports = {
  getContactsSuccess,
  clearContacts,
  failure
}
