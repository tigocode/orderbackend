/* Código é usado para conectar ao banco de dados */
const generateUniqueId = require('../Utils/generateUniqueId');
const crypto = require('crypto');
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
      const hash = crypto.createHash('md5').update(password).digest('hex');
      const passwordHash = hash;
      const id = generateUniqueId();

      await connection('users').insert({
        id,
        username,
        passwordHash,
      });
  
      return response.status(201).json({ id });
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error: 'Ocorreu um erro ao inserir os dados.'
      });
    }
  }
}
