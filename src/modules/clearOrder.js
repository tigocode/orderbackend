const connection = require('../db/connection');

module.exports = {
  async Delete(request, response) {
    const { username } = request.body; // Use destructuring para obter o nome de usuário

    try {
      // Verifique se existem dados para o nome de usuário
      const esfericas = await connection('temp_esferico').where('username', username).select('*');
      const toricas = await connection('temp_torica').where('username', username).select('*');
      const multifocal = await connection('temp_multifocal').where('username', username).select('*');

      if (esfericas.length === 0 && toricas.length === 0 && multifocal.length === 0) {
        return response.status(401).json({ error: 'User not found.' });
      }

      // Deletar todas as linhas com o nome de usuário
      await connection('temp_esferico').where('username', username).delete();
      await connection('temp_torica').where('username', username).delete();
      await connection('temp_multifocal').where('username', username).delete();

      return response.status(204).send(); // Retorna um status 204 para indicar sucesso
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
