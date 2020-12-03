const moment = require('moment');

const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const books = await connection('book')
      .join('author', 'author.id', '=', 'book.author_id')
      .join('status', 'status.id', '=', 'book.status_id')
      .select('book.id', 'book.title', 'book.created_at', 'book.updated_at', 'author.name as author_name', 'status.name as status_name', 'status.id as status_id');

    return response.status(200).json(books);
  },

  async store(request, response) {
    const { title, authorId, statusId } = request.body;

    const book = {
      title,
      author_id: authorId,
      status_id: statusId,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    const id = await connection('book').insert(book);

    const storedBook = await connection('book').where({ id }).first();

    return response.status(201).json(storedBook);
  },

  async update(request, response) {
    const id = request.params.id;
    const { title, authorId, statusId } = request.body;

    const book = {
      title,
      status_id: statusId,
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