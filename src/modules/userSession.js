const crypto = require('crypto');
const connection = require('../db/connection');

module.exports = {
  async Create(request, response) {
    const { id, password } = request.body;

    const hash = crypto.createHash('md5').update(password).digest('hex');
    const passwordHash = hash;

    const user = await connection('users')
      .where('id', id)
      .where('passwordHash', passwordHash)
      .select('*')
      .first();
    
      if (!user) {
        return response.status(400).json({
          error: "No USER found with this ID"
        });
      }

      return response.status(200).json(user);
  }
};
