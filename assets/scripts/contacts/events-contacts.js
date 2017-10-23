'use strict'

const api = require('./api-contacts.js')
const ui = require('./ui-contacts.js')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
// const BootstrapMenu = require('bootstrap-menu');

// var menu = new BootstrapMenu('#dropdownButton', {
//   actions: /* ... */
// });

const exampleContact = { first_name: 'Wylie',
  last_name: 'Coyote',
  email: 'will@gail.com',
  company: 'Acme',
  position: 'Bird Chaser'}

const getContactsSuccess = (data) => {
  console.log(data)
  store.contacts = data.contacts
  ui.displayContacts(store.contacts)
  $('.edit-contact').on('click', editContact)
  // console.log($('#grid'))
//   const menu = new BootstrapMenu('#grid', {
//   /* a function to know which row was the context menu opened on,
//    * given the selected DOM element. When this function is defined,
//    * every user-defined action callback receives its return value as
//    * an argument. */
//     fetchElementData: function($rowElem) {
//       const rowId = $rowElem.data('rowId')
//     // return demo3Rows[rowId]
//   },
//   actions: [{
//     name: 'Edit name',
//     onClick: function(row) {
//       toastr.info("'Edit name' clicked on '" + row.name + "'");
//     }
//   }, {
//     name: 'Edit description',
//     onClick: function(row) {
//       toastr.info("'Edit description' clicked on '" + row.name + "'");
//     }
//   }]
// });
}

// $('#grid').bootstrapTable({
//   contextMenu: '#example1-context-menu',
//   onContextMenuItem: function (row, $el) {
//     if ($el.data('item') === 'edit') {
//       alert('Edit: ' + row.itemid + ' ' + row.name + ' ' + row.price)
//     } else if ($el.data('item') === 'delete') {
//       alert('Delete: ' + row.itemid + ' ' + row.name + ' ' + row.price)
//     } else if ($el.data('item') === 'action1') {
//       alert('Action1: ' + row.itemid + ' ' + row.name + ' ' + row.price)
//     } else if ($el.data('item') === 'action2') {
//       alert('Action2: ' + row.itemid + ' ' + row.name + ' ' + row.price)
//     }
//   }
// })

const onGetContacts = (event) => {
  event.preventDefault()
  ui.clearContacts()
  api.getContacts()
    .then(getContactsSuccess)
    .catch(ui.failure)
}

const createContactSuccess = (data) => {
  $('#get-contacts-button').trigger('click')
}

const onCreateContact = (event) => {
  event.preventDefault()
  ui.clearContacts()
  ui.displayContact(exampleContact)
  $('button#save-contact').on('click', onSaveNewContact)
  $('button#cancel-contact').on('click', onCancelContact)
  $('button#delete-contact').hide
}

const onClearContacts = (event) => {
  event.preventDefault()
  ui.clearContacts()
}

function findContact (contact) {
  return contact.id.toString() === store.contactId
}

const onSaveNewContact = (event) => {
  console.log('Saved')
  event.preventDefault()
  const contactData = getFormFields(event.target.form)
  contactData.contact['user_id'] = store.user.id
  api.createContact(contactData)
    .then(createContactSuccess)
    .catch(ui.failure)
}
const onSaveContact = (event) => {
  console.log('Saved')
  event.preventDefault()
  const contactId = store.contactId
  const contactData = getFormFields(event.target.form)
  api.updateContact(contactId, contactData)
    .then(ui.updateContactSuccess)
    .catch(ui.failure)
}

const onCancelContact = (event) => {
  console.log('Cancelled')
  event.preventDefault()
  ui.clearContacts()
  ui.displayContacts(store.contacts)
  $('.edit-contact').on('click', editContact)
}

const onDeleteContact = (event) => {
  console.log('Deleted')
  event.preventDefault()
  const contactId = store.contactId
  api.deleteContact(contactId)
    .then(ui.deleteContactSuccess)
    .catch(ui.failure)
}

const addHandlers = () => {
  $('#get-contacts-button').on('click', onGetContacts)
  $('#clear-contacts-button').on('click', onClearContacts)
  $('#create-contact-button').on('click', onCreateContact)
}

const editContact = (event) => {
  const contactId = event.currentTarget.attributes.getNamedItem('row-id').value
  store.contactId = contactId
  const contact = store.contacts.find(findContact)
  ui.clearContacts()
  ui.displayContact(contact)
  $('button#save-contact').on('click', onSaveContact)
  $('button#cancel-contact').on('click', onCancelContact)
  $('button#delete-contact').show
  $('button#delete-contact').on('click', onDeleteContact)
}

module.exports = {
  addHandlers,
  editContact,
  onSaveContact,
  onCancelContact
}
