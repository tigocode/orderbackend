/* Código é usado para conectar ao banco de dados */
const connection = require('../db/connection');

module.exports = {
  
  async Index(request, response) {
    try {
      // Obtenha os filtros do corpo da requisição JSON
      const { filtro, filtro2, qtd, username } = request.body;
    
      // Crie uma consulta base na tabela 'esfericas'
      let query = connection('table_esfericas').select('*');
    
      if (filtro) {
        query = query.where('name', '=', filtro);
      }

      if (filtro2 && Array.isArray(filtro2) && filtro2.length > 0) {
        const results = [];        

        for(let i = 0; i < filtro2.length; i ++) {
          const filtroValor2 = filtro2[i];
            
          const result = await query.clone().where('esferico', '=', filtroValor2);

          if (result == (0)) {
            return response.status(200).json(results);
          }
        
          const result2 = {
            qtd: qtd[i],
            username: username,
          };
          result[0].qtd = result2.qtd;
          result[0].username = result2.username;

          // Essa seção realizar a inserçao na table_temp_esperico apos obter o objeto
          await connection('temp_esferico')
          .insert(result)
          await connection('order_esferico')
          .insert(result)
          /* .then(() => {
            console.log('Inserção bem-sucedida');
          })
          .catch((error) => {
            console.error('Erro ao inserir os dados:', error);
          }); */

          results.push(result);
        }

        return response.status(200).json(results);
      } else {
        // Se filtro2 estiver vazio, retorne uma mensagem apropriada
        return response.json({ message: 'Filtro2 está vazio.' });
      }
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        error: 'Ocorreu um erro ao consultar os dados.'
      });
    }
  }
};
