## Introduction
This project provides the frontend for a basic networking contact list managment
application. The backend web wervice repository can be found in the link listed
below.
- [Backend Repository](https://github.com/ajackson57/aj-networking-contacts-backend)

## Instructions
- [Get Started](https://ajackson57.github.io/aj-networking-contacts-frontend/)
- As a user you must register for an account. Once an account is created you
  login and you can display, create, edit, and delete contacts. Once an initial
  contact has been added by a user with the create contact button, all operations can be performed by selecting a row in the contacts table and using the right-click context menu. A communication log entry is automatically created
  when email is selected from the context menu for a contact.
- [Backend Server hosted on Heroku](https://gentle-crag-17128.herokuapp.com/)

## Technologies used.
- **Styling** - The Boostrap NAV bar and basic styling were used.
- **HTML** - A table is used to display the list of contacts.
- **JavaScript** - Events from the table, butons, and the navigation bar drive
  the application
- **Handlebars** - The contact table and entry form were done with html in
  handlebar tamplates.
- **Ruby on Rails** - The backend server was developed with Ruby's Rails
  framework. Ajax used on the frontend to make requests of the Rails server.
- [ERD for backend DB](https://github.com/ajackson57/aj-networking-contacts-frontend/blob/master/GA-WDI-Project2-ERD.pdf)

## The Devlopment Story
[Initial Schedule](https://github.com/ajackson57/aj-networking-contacts-frontend/blob/master/Schedule.pdf)
 - **The Development Process**
 - The development process started with some rough wireframes, some user
   stories, and a quick planning outline. I divided development into feature
   groups and created a branch in Git for each group. The branches for this
   repository (frontend) were as follows:
      - frontend - Initial frontend functionality as coped from another projet.
      - contactHandlebar - Creation of contact form.
      - addUserAuthentication - Swithch contact controller to protectedcontroller
      - saveContact - Create contact
      - addUserReference - Add 1-to-Many relationship between user and conatcts
      - addDelete - Provide delete contact functionality
      - updateDocuments - Update project documentation
      - addLog - add communications tracking log

 - **Problem-Solving Strategy**
 - I used the debugging facilities in the DevTools. I analyized error messages,
   setup breakpoints, and stepped through the code examining values of objects as
   I stepped through.

## Current Issues to be resolved in the future
- **Future Enhancements**
- Managment of companies was part of the original vision but this got scaled
  back and conatct user logs were created.
- Future enhancements may include the managment of companies, job applications,
  resume version control, additional contact communication logging, and other
  career managment functionality.

## Wireframes and User Stories.
- [Wire Frames](https://github.com/ajackson57/aj-networking-contacts-frontend/blob/master/wireframes/network-wireframe.pdf)
- [User Stories](https://github.com/ajackson57/aj-networking-contacts-frontend/blob/master/user-stories.md)
