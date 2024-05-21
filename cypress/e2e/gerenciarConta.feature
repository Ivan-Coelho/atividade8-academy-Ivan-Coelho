# language: pt

@cadastrarUsuario @deletarUsuario
Funcionalidade: Gerenciamento de conta

Contexto: Usuário deve acessar a página
    Dado que possui usuário cadastrado e logado no sistema
    E acessei a página de gerenciamento de conta do usuário

    Esquema do Cenário: não deve ser possível usuário alterar seus dados ao informar senha e confirmação de senha diferentes
        Quando solicitar alteração de senha
        E informar a senha "<senha>"
        E confirmar a senha "<condSenha>"
        E salvar a operação
        Então irei visualizar a mensagem de erro "As senhas devem ser iguais."
        Exemplos:
        |    senha    |  ConfSenha  |
        | 123456      | 123457      |
        | abcdefg     | Abcdefg     |
        | 12345@      | 12345$      |
        | 123aBc45$   | 123Abc45@   |


    Esquema do Cenário: não deve ser possível usuário alterar seus dados ao informar senha com menos de 6 ou mais de 12 caracteres 
        Quando solicitar alteração de senha
        E informar a senha "<senha>"
        E confirmar a senha "<confSenha>"
        E salvar a operação
        Então irei visualizar a mensagem de erro "<mensagem>"
        Exemplos:
        |    senha      |  confSenha    | mensagem                              |
        | 12345         | 12345         | A senha deve ter pelo menos 6 dígitos |
        #| 0123456789abc | 0123456789abc | A senha deve ter no máximo 12 dígitos.|
        #confirmar: mensagem senha longa fora do padrão

    Cenário: não deve ser possível usuário alterar seus dados ao informar senha com mais de 12 caracteres
        Quando solicitar alteração de senha
        E informar a senha "0123456789abc"
        E confirmar a senha "0123456789abc"
        E salvar a operação
        Então irei visualizar a mensagem de alerta "Não foi possível atualizar os dados."

    Cenário: não deve ser possível usuário alterar sua senha para uma senha em branco
        Quando solicitar alteração de senha
        E informar a senha "        "
        E confirmar a senha "        "
        E salvar a operação
        Então irei visualizar a mensagem de alerta "Não foi possível atualizar os dados."
        #Bug senha talvez não deveria ser aceita assim
        # No campo do Nome vai acontecer a mesma coisa

    # é necessário um teste para cada campo?
    Cenário: Usuário deve ter visibilidade a todos os seus dados relevantes quanto estiver editando seu perfil
        Quando visualizar a página 
        Então o nome do usuário deverá estar visível 
        E o email do usuário deverá estar visível
        E o tipo de usuário deverá estar visível


    Cenário: Usuário comum deve ter permissão para alterar seu nome
        Quando alterar seu nome
        E salvar a operação
        Então irei visualizar uma mensagem de sucesso
        E o nome do usuário será atualizado

    Cenário: Usuário comum deve ter permissão para alterar sua senha
        Quando solicitar alteração de senha
        E informar a senha "987456321"
        E confirmar a senha "987456321"
        E salvar a operação
        Então irei visualizar uma mensagem de sucesso

