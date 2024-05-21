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

When('informar a senha {string}', function(senha){
    paginaGerenciarConta.typeSenha(senha);
});


When('confirmar a senha {string}', function(confSenha){
    paginaGerenciarConta.typeConfSenha(confSenha);
});

When('salvar a operação', function(){
    paginaGerenciarConta.clickButtonSalvar();
});

When('visualizar a página', function(){

});

When('alterar seu nome', function(){
    paginaGerenciarConta.typeNome("Ivan Coelho")
});

Then('irei visualizar a mensagem de erro {string}', function(mensagem){
    cy.contains(paginaGerenciarConta.mensagemErro, mensagem).should('be.visible');
});

Then('irei visualizar a mensagem de alerta {string}', function(mensagem){
    cy.contains(paginaGerenciarConta.mensagem, mensagem).should('be.visible');
});

Then('o nome do usuário deverá estar visível', function(){    

    cy.get('@usuario').then( function(user){
        let nome = user.name
        cy.get(paginaGerenciarConta.inputNome).invoke('val').should('be.equal', nome)
    });
    
})

Then('o email do usuário deverá estar visível', function(){
    
    cy.get('@usuario').then( function(user){
        let email = user.email
        cy.get(paginaGerenciarConta.labelEmail).invoke('val').should('be.equal', email)
    });    
})

Then('o tipo de usuário deverá estar visível', function(){
    cy.contains(paginaGerenciarConta.inputTipoUsuario, 'Comum')
});

Then('irei visualizar uma mensagem de sucesso', function(){
    cy.contains(paginaGerenciarConta.mensagemSucesso, "Sucesso")
    cy.contains(paginaGerenciarConta.mensagem, "Informações atualizadas!")
})

Then('o nome do usuário será atualizado', function(){
    cy.get(paginaGerenciarConta.inputNome).invoke('val').should('be.equal', "Ivan Coelho")
});



        
       

    // Cenário: Usuário comum deve ter permissão para alterar sua senha
    //     Quando solicitar alteração de senha
    //     E informar a nova senha
    //     E confimar a senha
    