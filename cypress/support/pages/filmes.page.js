export default class FilmesPage{
    linkPaginaRegistro = ('[href="/register"]');
    linkPaginaLogin = ('[href="/login"]');
    linkPerfilPage = ('a[href="/profile"]');

    clickPaginaRegistro(){
        cy.get(this.linkPaginaRegistro).click();
    }

    clickPaginaLogin(){
        cy.get(this.linkPaginaLogin).click();
    }

    clickPaginaPerfil(){
        cy.get(this.linkPerfilPage).click();
    }

}