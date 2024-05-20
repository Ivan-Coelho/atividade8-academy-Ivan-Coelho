# language: pt

Funcionalidade: Registro de usuário
# olhar um maneira de validar o local das mensagens de erro

Contexto: Usuário deve acessar a página
    Dado que acessei o site
    E entrei na página de registro de usuário


Cenário: Não deve ser possível registrar um usuário sem informar o nome
    Quando informar um email válido
    E informar a senha "123456"
    E confirmar a senha "123456"
    E confirmar o Cadastro
    Então irei visualizar uma mensagem de erro "Informe o nome"

Cenário: Não deve ser possível registrar um usuário sem informar o email
    Quando informar um nome "Ivan Coelho"
    E informar a senha "123456"
    E confirmar a senha "123456"
    E confirmar o Cadastro
    Então irei visualizar uma mensagem de erro "Informe o e-mail"

Cenário: Não deve ser possível registrar um usuário sem informar uma senha
    Quando informar um nome "Ivan Coelho"
    E informar um email válido
    E confirmar a senha "123456"
    E confirmar o Cadastro
    Então irei visualizar uma mensagem de erro "Informe a senha"


Cenário: Não deve ser possível registrar um usuário sem informar uma confirmação de senha
    Quando informar um nome "Ivan Coelho"
    E informar um email válido
    E informar a senha "123456"
    E confirmar o Cadastro
    Então irei visualizar uma mensagem de erro "Informe a senha"

Esquema do Cenário: Não deve ser possível registrar um usuário se a senha for diferente da confirmação de senha
Quando informar um nome "Ivan Coelho"
    E informar um email válido
    E informar a senha "<senha>"
    E confirmar a senha "<confSenha>"
    E confirmar o Cadastro
    Então irei visualizar uma mensagem de erro "As senhas devem ser iguais."
    Exemplos:
    |    senha    |  ConfSenha  |
    | 123456      | 123457      |
    | abcdefg     | Abcdefg     |
    | 12345@      | 12345$      |
    | 123aBc45$   | 123Abc45@   |


@cadastrarUsuário @deletarUsuário
Cenário: Não deve ser possível registrar um usuário informando um email já cadastrado
    Quando informar um nome "Ivan Coelho"
    E informar um email já em uso
    E informar a senha "123456"
    E confirmar a senha "123456"
    E confirmar o Cadastro    
    Então irei visualizar uma mensagem de alerta "E-mail já cadastrado. Utilize outro e-mail"

#talvez faça mais sentido apenas no teste de API
@cadastrarUsuário @deletarUsuário 
Cenário: Não deve ser possível registrar um usuário informando um email já cadastrado por não diferenciar case sensitive
    Quando informar um nome "Ivan Coelho"
    E informar um email case sensitive já em uso
    E informar a senha "123456"
    E confirmar a senha "123456"
    E confirmar o Cadastro    
    Então irei visualizar uma mensagem de alerta "E-mail já cadastrado. Utilize outro e-mail"
    #BUG está cadastrando email iguais se informar letras maiúsculas

Esquema do Cenário: Não deve ser possível registrar um usuário informando um email mal formatado
 Quando informar um nome "Ivan Coelho"
 E informar o email "<email>"
 E informar a senha "123456"
 E confirmar a senha "123456"
 E confirmar o Cadastro
 Então irei visualizar uma mensagem de alerta "Não foi possível cadastrar o usuário."
 Exemplos:
 |     email     |
 |@teste.com     |
 |email@teste    |
 |email@.com     |
 |email2teste.com|
 |email@teste,com|
 |email@test'.com|


Cenário: Não deve ser possível registrar um usuário informando uma senha com menos de 6 caracteres
    # É interessante criar outro step de informar a senha para especificar o tamanho da senha?
    Quando informar um nome "Ivan Coelho"
    E informar um email válido
    E informar a senha "12345"
    E confirmar a senha "12345" 
    E confirmar o Cadastro
    Então irei visualizar uma mensagem de erro "A senha deve ter pelo menos 6 dígitos"

Cenário: Não deve ser possível registrar um usuário informando uma senha com mais de 12 caracteres
    Quando informar um nome "Ivan Coelho"
    E informar um email válido
    E informar a senha "0123456789abc"
    E confirmar a senha "0123456789abc"
    E confirmar o Cadastro
    Então irei visualizar uma mensagem de erro "A senha deve ter no máximo 12 dígitos." 

    # Cenário: Não deve ser possível registrar um usuário informando um nome em branco
    # Quando informar um nome "        "
    # E informar um email válido
    # E informar a senha "123456"
    # E confirmar a senha "123456"
    # E confirmar o Cadastro
    # Então irei visualizar uma mensagem de alerta "Não foi possível cadastrar o usuário."
    # # BUG : talvez não deveria ser possível cadastrar dessa forma

    # Cenário: Não deve ser possível registrar um usuário informando uma senha em branco
    # Quando informar um nome "Ivan Coelho"
    # E informar um email válido
    # E informar a senha "       "
    # E confirmar a senha "       "
    # E confirmar o Cadastro
    # Então irei visualizar uma mensagem de alerta "Não foi possível cadastrar o usuário."
    # # BUG : talvez não deveria ser possível cadastrar dessa forma

    #Como deletar esses usuários?
#     Cenário: Registro de usuário de forma válida
#     Quando informar um nome "Ivan Coelho"
#     E informar um email válido
#     E informar a senha "123456"
#     E confirmar a senha "123456"
#     E confirmar o Cadastro
#     Então o usuário deve ser cadastrado com sucesso

# Esquema do Cenário: Registro de usuário de maneira válida com diferentes padrões de senha
#     Quando informar um nome "Ivan Coelho"
#     E informar um email válido
#     E informar a senha "<senha>"
#     E confirmar a senha "<confSenha>"
#     E confirmar o Cadastro
#     Então o usuário deve ser cadastrado com sucesso
#     Exemplos:
#     |    senha   | confSenha  |
#     |123456      |123456      |
#     |1234567     |1234567     |
#     |0123456789  |0123456789  |
#     |0123456789AB|0123456789AB|
#     |1234567@    |1234567@    |
#     |1234abcD    |1234abcD    |
