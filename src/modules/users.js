/* Código é usado para conectar ao banco de dados */
const connection = require('../db/connection');

module.exports = {

  /* Código permite consultar todos dados da tabela users */
  async Index(request, response) {
    try {
      const user = await connection('users').select('*');

      return response.json(user);
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error: 'Ocorreu um erro ao inserir os dados.'
      });
    }
  },

  /* Código permite inserir(cadastrar) novos usuarios na tabela users */
  async Create(request, response) {
    try {
      const { username, password } = request.body;

      await connection('users').insert({
        username,
        password,
      });
  
      return response.status(201).send({
        message: 'Dados inseridos com sucesso.'
      });
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error: 'Ocorreu um erro ao inserir os dados.'
      });
    }
  }
}
