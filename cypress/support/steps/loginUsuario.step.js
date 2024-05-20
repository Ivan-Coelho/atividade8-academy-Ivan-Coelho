import {Given, When, Then, Before, After} from '@badeball/cypress-cucumber-preprocessor';

import FilmesPage from '../pages/filmes.page';
import LoginPage from '../pages/login.page';



const paginaFilmes = new FilmesPage ();
const paginaLogin = new LoginPage ();

Before({tags: '@criarUsuario'}, function(){
    
    cy.criarUsuario().then(function(response){        
        cy.wrap(response.body).as('usuario')       
    });
});

After({tags: '@delUser'}, function(){
    let id
    let tokenAdmin
    let idAdmin
    cy.get('@usuario').then(function (usuario) {
        id = usuario.id        

        cy.criarUsuarioAdmin().then(function(response){                       
            tokenAdmin = response.token
            idAdmin = response.id

            cy.deletarUsuario(id, tokenAdmin);
            cy.deletarUsuario(idAdmin, tokenAdmin);
        })
    })
});


Given('que acessei o site', function(){
    cy.visit('');
})

Given('entrei na página de Login', function(){
    paginaFilmes.clickPaginaLogin();
});

When('informar um email não cadastrado', function(){
    paginaLogin.typeEmail('emailnaocadastrado@niguemvaicadastrarisso.com.br');
});

When('informar um email cadastrado', function(){
    cy.get('@usuario').then(function(user){        

        paginaLogin.typeEmail(user.email);
    });
});

When('informar uma senha', function(){
    paginaLogin.typeSenha('123456');
});

When('informar uma senha errada', function(){
    paginaLogin.typeSenha('987456');
});

When('tentar logar no sistema', function(){
    paginaLogin.clickButtonLogin();
});

Then('irei visualizar a mensagem de alerta {string}', function(mensagem){
    cy.contains(paginaLogin.mensagemFalhaAuth, "Falha ao autenticar").should('be.visible')
    cy.contains(paginaLogin.mensagemErroLogin, mensagem).should('be.visible')
});

Then('irei visualizar a mensagem de erro {string}', function(mensagem){
    cy.contains(paginaLogin.mensagemErro, mensagem).should('be.visible')

});

Then('irei logar com sucesso', function(){
    cy.intercept('POST', 'https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login').as('login')

    cy.wait('@login')
   
});

Then('serei direcionado para pagina inicial', function(){
    cy.url().should('equal', 'https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/')
})



