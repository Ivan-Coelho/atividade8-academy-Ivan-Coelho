# language: pt

Funcionalidade: Login de Usuário
#analisar se é necessário validar os elementos das páginas

Contexto: Usuário deve acessar a página
    Dado que acessei o site
    E entrei na página de Login

Cenário: Não deve ser possível fazer login de usuário com dados não cadastrados
Quando informar um email não cadastrado
E informar uma senha
E tentar logar no sistema
Então irei visualizar a mensagem de alerta "Usuário ou senha inválidos."

@criarUsuario @delUser
Cenário: Não deve ser possível fazer login informando uma senha errada
Quando informar um email cadastrado
E informar uma senha errada
E tentar logar no sistema
Então irei visualizar a mensagem de alerta "Usuário ou senha inválidos."

Cenário: Não deve ser possível fazer login sem informar um email
Quando informar uma senha
E tentar logar no sistema
Então irei visualizar a mensagem de erro "Informe o e-mail"

@criarUsuario @delUser
Cenário: Não deve ser possível fazer login sem informar uma senha
Quando informar um email cadastrado
E tentar logar no sistema
Então irei visualizar a mensagem de erro "Informe a senha"

@criarUsuario @delUser
Cenário: Deve ser possível logar no sistema com dados válidos
Quando informar um email cadastrado
E informar uma senha
E tentar logar no sistema
Então irei logar com sucesso
E serei direcionado para pagina inicial