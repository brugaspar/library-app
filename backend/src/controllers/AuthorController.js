const moment = require('moment');

const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const authors = await connection('author').distinct();

    return response.status(200).json(authors);
  },

  async store(request, response) {
    const { name } = request.body;

    const author = {
      name,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    const id = await connection('author').insert(author);

    const storedAuthor = await connection('author').where({ id }).first();

    return response.status(201).json(storedAuthor);
  },

  async update(request, response) {
    const id = request.params.id;
    const { name } = request.body;

    const author = {
      name,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    await connection('author').where({ id }).update(author);

    const storedAuthor = await connection('author').where({ id }).first();

    return response.status(200).json(storedAuthor);
  },

  async delete(request, response) {
    const id = request.params.id;

    const deleted = await connection('author').where({ id }).del();

    if (!deleted) {
      return response.sendStatus(400);
    }

    return response.sendStatus(200);
  }
}