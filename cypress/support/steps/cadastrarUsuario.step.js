import { Given, When, Then, Before, After, But } from '@badeball/cypress-cucumber-preprocessor';
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

// But('o email já estiver em uso', function(){

// });

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

    // cy.request({ // consigo remover esse usuário?
    //     method:'PATCH',
    //     url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/inactivate',
    //     //headers: { Authorization: 'Bearer ' + token }
    // })
})







