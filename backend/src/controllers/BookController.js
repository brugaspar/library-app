const moment = require('moment');

const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const books = await connection('book').distinct();

    return response.status(200).json(books);
  },

  async store(request, response) {
    const { title, authorId } = request.body;

    const book = {
      title,
      author_id: authorId,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    const id = await connection('book').insert(book);

    const storedBook = await connection('book').where({ id }).first();

    return response.status(201).json(storedBook);
  },

  async update(request, response) {
    const id = request.params.id;
    const { title, authorId } = request.body;

    const book = {
      title,
      author_id: authorId,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    await connection('book').where({ id }).update(book);

    const storedBook = await connection('book').where({ id }).first();

    return response.status(200).json(storedBook);
  },

  async delete(request, response) {
    const id = request.params.id;

    const deleted = await connection('book').where({ id }).del();

    if (!deleted) {
      return response.sendStatus(400);
    }

    return response.sendStatus(200);
  }
}