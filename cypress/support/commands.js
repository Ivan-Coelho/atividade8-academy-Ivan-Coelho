// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { faker } from "@faker-js/faker"

Cypress.Commands.add('criarUsuario', function () {
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: '123456'
    }
    cy.request({
        method: 'POST',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
        body: user
    }).then(function (response) {
        return response
    })
})


Cypress.Commands.add('criarUsuarioAdmin', function () {
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: '123456'
    }
    let usuario
    let tokenAdmin

    cy.request({
        method: 'POST',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
        body: user
    }).then(function (response) {        
        usuario = response.body

        cy.request({
            method: "POST",
            url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login',
            body: {
                email: usuario.email,
                password: "123456"
            }
        }).then(function (response) {
            
            tokenAdmin = response.body.accessToken


            cy.request({
                method: 'PATCH',
                url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/admin',
                headers: { Authorization: 'Bearer ' + tokenAdmin }
            }).then(function (result) {
                return {
                    id: usuario.id,
                    token: tokenAdmin
                }
            })

        })
    })
})



Cypress.Commands.add('deletarUsuario', function (idUsuario, tokenAdmin) {
    cy.request({
        method: 'DELETE',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/' + idUsuario,
        headers: { Authorization: 'Bearer ' + tokenAdmin }
    })

})