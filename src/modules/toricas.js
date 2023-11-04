/* Código é usado para conectar ao banco de dados */
const connection = require('../db/connection');

module.exports = {
  
  async Index(request, response) {
    try {
      const { filtro, filtro2, filtro3, filtro4, qtd, username } = request.body;

      let query = connection('table_toricas').select('*');

      if (filtro) {
        query = query.where('name', '=', filtro);
      }

      if (filtro2 && Array.isArray(filtro2) && filtro2.length > 0) {
        if (filtro3 && Array.isArray(filtro3) && filtro3.length > 0) {
          if (filtro4 && Array.isArray(filtro4) && filtro4.length > 0) {
            const results = [];

            for (let i = 0; i < filtro2.length; i++) {
              const filtroValor2 = filtro2[i];
              const filtroValor3 = filtro3[i];
              const filtroValor4 = filtro4[i];
  
              const result = await query
                .clone()
                .where('esferico', '=', filtroValor2)
                .where('cilindrico', '=', filtroValor3)
                .where('eixo', '=', filtroValor4);
              
              if (result == (0)) {
                return response.status(200).json(results);
              }
              // Essa seção recebe a qtd de produto e o usuario, par em seguida incrementa-los no objeto result
              const result2 = {
                qtd: qtd[i],
                username: username,
              };
              result[0].qtd = result2.qtd;
              result[0].username = result2.username;

              // Essa seção realizar a inserçao na table_temp_esperico apos obter o objeto
              await connection('temp_torica')
              .insert(result)
              await connection('order_torica')
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
          }
        }
      } else {
        return response.json({ message: 'Filtro2 está vazio.' });
      }

      //return response.json([]);
    } catch (error) {
      console.log(error);
      return response.status(500).send();
      error: 'Ocorreu um erro ao consultar os dados!';
    }
  }  
}
