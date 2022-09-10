# Cadastro de Carro

**RF**
Deve ser possível cadastrar um carro.

**RN** 
Não deve ser possível cadastrar um carro com uma placa existente;
O carro deve ser cadastrado  como disponível;
Apenas usuários administradores podem cadastrar um carro;

# Listagem de Carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
O usuário não precisa estar logado no sistema;

# Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar uma(s) especificação para um carro.


**RN**
Não deve ser possível cadastrar uma especificação para um carro inexistente;
Não deve ser possível cadastrar uma mesma especificação para um carro;
Apenas usuários administradores podem cadastrar uma especificação;

# Cadastro de imagens do carro para

**RF**
Deve ser possível cadastrar uma imagem para um carro.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
Não deve ser possível cadastrar uma imagem para um carro que não existe.
O usuário pode cadastrar mais de uma imagem para um único carro.
Apenas usuários administradores podem cadastrar uma imagem para um carro;

# Agendamento de um aluguel de carro

**RF**
Deve ser possível agendar um aluguel de carro.

**RN**
O aluguel deve ter duração mínimo de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso o usuário tenha um aluguel aberto.
Não deve ser possível cadastrar um novo aluguel para o mesmo carro.


