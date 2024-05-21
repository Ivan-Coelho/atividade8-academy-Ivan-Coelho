import { Given, When, Then, Before, After} from '@badeball/cypress-cucumber-preprocessor';
import FilmesPage from '../pages/filmes.page';
import RegistroPage from '../pages/registro.page';
import { faker } from '@faker-js/faker';

let email

const paginaFilmes = new FilmesPage();
const paginaRegistro = new RegistroPage();

Before({ tags: '@cadastrarUsuário' }, function () {   

    cy.criarUsuario().then(function (response) {
        cy.wrap(response.body).as('usuario');
    })
})

After({ tags: '@deletarUsuário' }, function () {
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
})


Given('que acessei o site', function () {
    cy.visit('')
});

Given('entrei na página de registro de usuário', function () {
    paginaFilmes.clickPaginaRegistro();
})

When('informar um nome {string}', function (nome) {
    paginaRegistro.typeNome(nome);
});

When('informar um email válido', function () {
    let email = faker.internet.email();
    paginaRegistro.typeEmail(email);
});

When('informar a senha {string}', function (senha) {
    paginaRegistro.typeSenha(senha);
});

When('confirmar a senha {string}', function (confSenha) {
    paginaRegistro.typeConfSenha(confSenha);
});

When('confirmar o Cadastro', function () {
    cy.intercept('POST', 'https://raromdb-3c39614e42d4.herokuapp.com/api/users').as('cadastro')
    paginaRegistro.clickButtonCadastrar();
});


When('confirmar uma senha diferente {string}', function (confSenha) {
    paginaRegistro.typeConfSenha(confSenha);
})

When('informar um email já em uso', function () {
    cy.get('@usuario').then(function (usuario) {
        paginaRegistro.typeEmail(usuario.email);
    })
})

When('informar um email case sensitive já em uso', function () {
    cy.get('@usuario').then(function (usuario) {
        let email = usuario.email.toUpperCase()
        paginaRegistro.typeEmail(email);
    })
})

When('informar o email {string}', function(email){
    paginaRegistro.typeEmail(email);
});

Then('irei visualizar uma mensagem de erro {string}', function (mensagem) {
    cy.contains(paginaRegistro.mensagemErro, mensagem).should('be.visible');
});

Then('irei visualizar uma mensagem de alerta {string}', function (mensagem) {
    cy.contains(paginaRegistro.mensagemEmailjaCadastrado, mensagem).should('be.visible');
});

Then('o usuário deve ser cadastrado com sucesso', function(){
    cy.contains(paginaRegistro.mensagemSucesso, 'Cadastro realizado!').should('be.visible');
    cy.contains(paginaRegistro.mensagemSucessoCadastro, 'Sucesso').should('be.visible');

    cy.wait('@cadastro').then(function(usuario){
        let id = usuario.response.body.id
        cy.criarUsuarioAdmin().then(function(response){                       
            let tokenAdmin = response.token
            let idAdmin = response.id

            cy.deletarUsuario(id, tokenAdmin);
            cy.deletarUsuario(idAdmin, tokenAdmin);
        })        
    })    
})

Then('ser do tipo comum', function(){
    cy.wait('@cadastro').then(function(usuario){        
        expect(usuario.response.body.type).to.equal(0);        
        let id = usuario.response.body.id

        cy.criarUsuarioAdmin().then(function(response){                       
            let tokenAdmin = response.token
            let idAdmin = response.id

            cy.deletarUsuario(id, tokenAdmin);
            cy.deletarUsuario(idAdmin, tokenAdmin);
        })
    })
});

Then('o usuário deve ser cadastrado', function(){
    cy.contains(paginaRegistro.mensagemSucesso, 'Cadastro realizado!').should('be.visible');
    cy.contains(paginaRegistro.mensagemSucessoCadastro, 'Sucesso').should('be.visible');      
})



// esses teste são necessários?

import GerenciarContaPage from '../pages/login.page';
import LoginPage from '../pages/login.page';
import PerfilPage from '../pages/perfil.page'

const paginaLogin = new LoginPage();
const paginaGerenciarConta = new GerenciarContaPage();
const paginaPerfil = new PerfilPage();

Before({ tags: '@criarUsuarioComum' }, function () {   

    cy.criarUsuario().then(function (response) {
        cy.wrap(response.body).as('usuario');
    })
})

Before({ tags: '@criarUsuarioCritico' }, function () {   
    let userCritico 
    cy.criarUsuarioCritico().then(function(response){                       
        
        let tokenCritico = response.token
        let idCritico = response.id
        let email = response.email

        userCritico = {
            tokenCritico : tokenCritico,
            id : idCritico,
            email: email
        }
        cy.wrap(userCritico).as('usuario');
    })    
})

Before({ tags: '@criarUsuarioAdmin' }, function () {   
    let userAdmin 
    cy.criarUsuarioAdmin().then(function(response){                       
        
        let tokenAdmin = response.token
        let idAdmin = response.id
        let email = response.email

        userAdmin = {
            tokenAdmin : tokenAdmin,
            id : idAdmin,
            email: email
        }
        cy.wrap(userAdmin).as('usuario');
    })    
})


After({tags: '@deletarUsuarios'}, function(){
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



When('usuario do tipo {string} logar no site', function(){
    cy.visit('/login')

    cy.get('@usuario').then(function(user){        

        paginaLogin.typeEmail(user.email);
        paginaLogin.typeSenha('123456')
        paginaLogin.clickButtonLogin();
    });
});

When('acessar a página de gerenciamento de conta', function(){
    paginaFilmes.clickPaginaPerfil();
    paginaPerfil.clickButtonGerenciarConta();
});

Then('irei visualizar que é do tipo {string}', function(tipoUsuario){
    cy.contains(paginaGerenciarConta.inputTipoUsuario, tipoUsuario).and('be.visible')
});










