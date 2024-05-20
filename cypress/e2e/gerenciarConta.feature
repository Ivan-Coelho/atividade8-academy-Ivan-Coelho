# language: pt

@cadastrarUsuario @deletarUsuario
Funcionalidade: Gerenciamento de conta
#mocar usuário admin e crítico para tentar alterar os dados

Contexto: Usuário deve acessar a página
    Dado que possui usuário cadastrado e logado no sistema
    E acessei a página de gerenciamento de conta do usuário

    # é necessário um teste para cada campo?
Cenário: Usuário deve ter visibilidade a todos os seus dados relevantes quanto estiver editando seu perfil
Quando visualizar a página 
Então o nome do usuário deverá estar visível 
E o email deverá estar visível
E o tipo de usuário deverá estar visível
# E a senha deve estar visível????????


    # Esquema do Cenário: não deve ser possível usuário alterar seus dados ao informar senha e confirmação de senha diferentes
    # Quando solicitar alteração de senha
    # E informar a senha "<senha>"
    # E confirmar uma senha diferente "<condSenha>"
    # E salvar a operação
    # Então irei visualizar a mensagem de erro "As senhas devem ser iguais."
    # Exemplos:
    # |    senha    |  ConfSenha  |
    # | 123456      | 123457      |
    # | abcdefg     | Abcdefg     |
    # | 12345@      | 12345$      |
    # | 123aBc45$   | 123Abc45@   |


    Esquema do Cenário: não deve ser possível usuário alterar seus dados ao informar senha com menos de 6 ou mais de 12 caracteres 
    Quando solicitar alteração de senha
    E informar a senha "<senha>"
    E confirmar uma senha diferente "<confSenha>"
    E salvar a operação
    Então irei visualizar a mensagem de erro "<mensagem>"
    Exemplos:
    |    senha      |  confSenha    | mensagem
    | 12345         | 12345         | A senha deve ter pelo menos 6 dígitos |
    | 0123456789abc | 0123456789abc | Não foi possível atualizar os dados.  |
    #confirmar mensagem senha longa 



# Cenário: Usuário comum deve ter permissão para alterar seu nome
# Quando alterar seu nome
# E salvar a operação
# Então irei visualizar uma mensagem de sucesso
# E o nome do usuário será atualizado

# Cenário: Usuário comum deve ter permissão para alterar sua senha
# Quando solicitar alteração de senha
# E informar a nova senha
# E confimar a senha
# Então irei visualizar uma mensagem de sucesso

