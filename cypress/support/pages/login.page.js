export default class LoginPage{

    linkPaginaFilmes = ('a[href="Filmes"]'); // não funciona
    linkPaginaLogin = ('[href="/login"]');
    linkPaginaRegistro = ('[href="/register"]');

    inputEmail = ('[placeholder="E-mail"]');
    inputSenha = ('[placeholder="Senha"]');

    buttonLogin = ('.login-button')

    inputFilmes = ('[placeholder="Buscar filmes"]');
    buttonPesquisarFilme = ('.search-button');


    typeEmail(email){
        cy.get(this.inputEmail).type(email);
    }

    typeSenha(senha){
        cy.get(this.inputSenha).type(senha);
    }

    clickButtonLogin(){
        cy.get(this.buttonLogin).click();
    }


}