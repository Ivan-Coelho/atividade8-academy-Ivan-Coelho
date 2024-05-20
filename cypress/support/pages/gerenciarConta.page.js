export default class GerenciarContaPage{
    linkPaginaFilmes = ('a[href="Filmes"]'); // não funciona
    linkPaginaPerfil = ('a[href="/profile"]');
    
    inputFilmes = ('[placeholder="Buscar filmes"]');
    inputlNome = ('[placeholder="Nome"]');
    inputSenha = ('[placeholder="Senha"]');
    inputConfirmarSenha = ('[placeholder="Confirmar senha"]');
    input   
    
    labelEmail = ('[placeholder="E-mail"]');

    buttonPesquisarFilme = ('.search-button');
    buttonAlterarSenha = ('.account-password-button');    
    buttonSalvar = ('.account-save-button');    
    buttonCancelar = ('.account-password-button-cancel');

    mensagem = ('div.modal-body p');
    mensagemErro = ('.input-error')

    typeNome(nome){
        cy.get(this.inputlNome).clear().type(nome);
    }

    typeSenha(senha){
        cy.get(this.inputSenha).type(senha);
    }

    typeConfSenha(confSenha){
        cy.get(this.inputConfirmarSenha).type(confSenha);
    }

    clickButtonAlterarSenha(){
        cy.get(this.buttonAlterarSenha).click();
    }
    
    clickButtonSalvar(){
        cy.get(this.buttonSalvar).click();
    }

    clickButtonCancelar(){
        cy.get(this.buttonCancelar).click();
    }


}