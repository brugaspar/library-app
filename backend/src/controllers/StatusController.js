const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const status = await connection('status');

    return response.status(200).json(status);
  }
}