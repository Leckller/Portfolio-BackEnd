* Simples backend utilizando typescript com POO e TDD para salvar e armazenar uns dados em formato json para o Front-End

* Opitei por não criar uma arquitetura muito robusta pelo fato de ser um backend bem simples, logo só tem uma validação e é na mesma camada onde é feito a leitura/escrita do arquivo json local.

* Utilizei neste projeto as seguintes tecnologias:
  - Para testes: Mocha, Chai, Sinon e Nyc
  - Para o servidor: Express

* Caso queira testar o app é necessário criar um arquivo .env e adicionar a variavel de nome "SUPER_SECRET_PASSWORD_OMG" e passar para ela qualquer string