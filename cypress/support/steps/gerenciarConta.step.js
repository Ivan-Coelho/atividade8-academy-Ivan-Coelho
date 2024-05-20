import {Given, When, Then, Before, After} from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pages/login.page';
import GerenciarContaPage from '../pages/gerenciarConta.page';
import FilmesPage from '../pages/filmes.page';
import PerfilPage from '../pages/perfil.page';

const paginaLogin = new LoginPage ();
const paginaGerenciarConta = new GerenciarContaPage ();
const paginaFilmes = new FilmesPage();
const paginaPerfil = new PerfilPage();

Before({tags: '@cadastrarUsuario'}, function(){
    cy.criarUsuario().then(function(response){        
        cy.wrap(response.body).as('usuario')       
    });
})

After({tags: '@deletarUsuario'}, function(){
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

Given('que possui usuário cadastrado e logado no sistema',function(){
    cy.visit('/login')

    cy.get('@usuario').then(function(user){

        paginaLogin.typeEmail(user.email);
        paginaLogin.typeSenha('123456');
        paginaLogin.clickButtonLogin();
    });

})

Given('acessei a página de gerenciamento de conta do usuário', function(){
paginaFilmes.clickPaginaPerfil();
paginaPerfil.clickButtonGerenciarConta();
});

When('solicitar alteração de senha', function(){
    paginaGerenciarConta.clickButtonAlterarSenha();
})

When('informar a senha {string}', function(){
    paginaGerenciarConta.typeSenha('123456');
});


When('confirmar uma senha diferente {string}', function(){
    paginaGerenciarConta.typeConfSenha('987456');
});

When('salvar a operação', function(){
    paginaGerenciarConta.clickButtonSalvar();
});

When('visualizar a página', function(){

});

Then('irei visualizar a mensagem de erro {string}', function(mensagem){
    cy.contains(paginaGerenciarConta.mensagemErro, mensagem).should('be.visible');
});

Then('o nome do usuário deverá estar visível', function(){
    cy.contains(paginaGerenciarConta.inputlNome).should('be.visible');

    cy.get('@usuario').then( function(user){

        let nome = user.name
        cy.get(paginaGerenciarConta.inputlNome).invoke('val').should('be.equal', nome)

    });
    
})

Then('o email do usuário deverá estar visível', function(){
    cy.contains(paginaGerenciarConta.labelEmail).should('be.visible');

    cy.get('@usuario').then( function(user){

        let nome = user.email
        cy.get(paginaGerenciarConta.labelEmail).invoke('val').should('be.equal', email)

    });
    
})

Then('o tipo de usuário deverá estar visível', function(){
    cy.contains(paginaGerenciarConta.)
});
// E o tipo de usuário deverá estar visível